
const bcrypt = require("bcrypt");
const { Users } = require("../models"); 
const { sign } = require("jsonwebtoken");
const crypto = require('crypto');
const errorHandler = require("../middlewares/error")
const { sendConfirmationEmail, } = require("../utils/mail.utils");
const { isDate } = require("util");


// Register function
const register = async (req, res , next) => {
 
  try {
    const { userName,
      userEmail,
      userPassword,confirmedPassword } = req.body;


      if (userPassword !== confirmedPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10)

     // Generate unique token for password reset using crypto
     const confirmationToken = crypto.randomBytes(20).toString("hex");


     // Set the expiry time for the reset token (e.g., 1 hour from now)
     const confirmationTokenExpire = new Date(Date.now() + 3600000); 
 
    const user = await Users.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
      token: confirmationToken,
      tokenExpire: confirmationTokenExpire
    });

    await sendConfirmationEmail(userEmail, req.headers.host, user.userId, confirmationToken);  

    res.status(200).json({
      success: true,
      result: user,
      message: "Welcome register successfully"
  });

  //res.redirect('/registration-success');
  
    
  } catch (error) {
    next(error);
  }
  
}

// login function
const login = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;

    const userQuery = await Users.findOne({
      where: { userEmail: userEmail},
    });

    if (!userQuery) {
      return next(errorHandler(401, "User not found"));
    }

    // Compare the password from user input and password in the table
    bcrypt.compare(userPassword, userQuery.userPassword)
    .then(async (isMatch) => {
      if (!isMatch) {
        return next(errorHandler(401, "Wrong email and password"));
      }

      // generate web token for user after successful login

      const accessToken = sign(
        { user_id: userQuery.userId },
        process.env.JWT_TOKEN
      ); //using the id of the user to generate web token

      const { userPassword: pass, ...restInfo } = userQuery._previousDataValues;

      // Set the access token as a cookie
      res
        .cookie("jwt_access_token", accessToken, {
          httpOnly: true, // Cookie cannot be accessed via client-side scripts
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'None', // CSRF protection
          maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours (optional)
        })
        .status(200)
        .json({
          result: restInfo,  //send response without password
          success: true,

        }); 
    })
    .catch(err => {
      console.error(err);
      return next(errorHandler(500, "Internal Server Error")); // Handle bcrypt errors
    });
  } catch (error) {
   next(error)
  }
};

const forgotPassword = async (req, res, next) => {

  try {
    const { userEmail } = req.body

    const userQuery = await Users.findOne({
      where: { userEmail: userEmail},
    });

    if(!userQuery) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 
    
    // Generate unique token for password reset using crypto
    const resetToken = crypto.randomBytes(20).toString("hex");


    // Set the expiry time for the reset token (e.g., 1 hour from now)
    const resetPasswordExpire = new Date(Date.now() + 3600000);


    // Save the reset token and its expiry time in the database
    const userPasswordToken = await Users.update({
      token : resetToken,
      tokenExpire: resetPasswordExpire
   },
   {
       where: {
          userId: userQuery.userId,
       }
   });

   // Send password reset email with token
   await forgotPassword(userEmail, req.headers.host, userQuery.userId, resetToken)

   //
   res.status(200).json({
    success: true,
    result: userPasswordToken,
    message: "Password reset email sent successfully"
});

  } catch (error) {
    //next(error) // errorhandling from index.js
    console.log(error.message);
  }
}

const resetPassword =async (req, res, next) => {

  const {id, token} = req.params
  
  try {
    const date = Date.now();

    const oldUser = await Users.findOne({
    where: { userId: id},
  });

    if(!oldUser) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 

    if(token !== oldUser.token || date > oldUser.tokenExpire)  return res.json({message: "Not Verified"})

      console.log(date)
      console.log(oldUser.token)
      console.log(oldUser.tokenExp)
      res.render("resetPassword", { email: oldUser.userEmail, status: " verified"}); //render views- resetPassword.ejs
  } catch (error) {
    //console.log(error)
    next(error);
  }
}

const resetPasswordPost =async (req, res, next) => {

  const {id, token} = req.params
  const {userPassword} = req.body;
  const bcSalt = bcrypt.genSaltSync(10)

  try {
    const date = Date.now();

    const oldUser = await Users.findOne({
    where: { userId: id},
  });

    if(!oldUser) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 

    if(token !== oldUser.token || date > oldUser.tokenExpire)  return res.json({message: "Not Verified"})

      console.log(date)
      console.log(oldUser.tokenExp)

      const savedPassword = bcrypt.hashSync(userPassword, bcSalt)

      await Users.update({
        userPassword: savedPassword
        },{
          where: {
            userId: id
          }
        })

        res.render("resetPassword", { email: oldUser.userEmail, status: "verified"});  //render views- resetPassword.ejs

  } catch (error) {
    //console.log(error)
    next(error);
  }
}

//log out
const logout = async (req, res, next) => {
  try {
    const { userId }= req.body
    const user = Users.findOne({
      where: { userId: userId }
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found ser' });
    }
    //Clear the access token cookie
    res.clearCookie('jwt_access_token');
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    // Handle errors
    console.error('Error logging out:', error.message);
    next(error);
  }
};


module.exports = { login, register , forgotPassword, resetPassword, resetPasswordPost, logout};     

