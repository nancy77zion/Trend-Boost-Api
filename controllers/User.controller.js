//const bcrypt = require("bcrypt");
const { Users } = require("../models"); //destructure the table name from the model
//const errorHandler = require("../middlewares/error")

const getUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { userId: req.params.id } });
  
    if (!user) {
      return  res.status(404).json({success: false, message: 'User not found'});
    }

    //removed password before sending back data to client
    const { password: pass, comfirmPassword: comfirm, ...rest } = user._previousDataValues;
  
    res.status(200).json({
      data: rest,
      success: true
    });
  } catch (error) {
    next(error);
    //console.log(error)
  }
};

const  updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber}= req.body;
 
    const user = await Users.findOne({ where: { userId: req.params.id } });
  
    if (!user) {
      // return next(errorHandler(401, 'You can only update your own account!'));
      return  res.status(404).json({success: false, message: 'You can only update your own account!'});
    } else {
  
      const updateField = await Users.update({
        firstName: firstName ? firstName : user.firstName,
        lastName: lastName ? lastName : user.lastName,
        phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber
      },
      {
        where: {
          userId : user.userId
        }})
        res.status(201).json({
          success: true,
          data: updateField
      });
    }
  
  } catch (error) {
    next(error)
  }
 
}

const deleteUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await Users.findOne({ where: { userId: req.params.id } });

    // If user not found, return 404 error
    if (!user) {
      //return next(errorHandler(404, 'User not found!'));
      return  res.status(404).json({success: false, message: 'You can only delete your own account!'});
    }

    // Delete the user
    await user.destroy();

    // Respond with success message
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors
    next(error);
  }
};



module.exports = { getUser, updateUser, deleteUser}


/*
  try {
    const userId = req.user.id;
    const requestedUserId = req.params.id;

    if (userId !== requestedUserId) {
      return next(errorHandler(401, 'You can only update your own account!'));
    }

    const updatedFields = {};

    if (req.body.password) {
      updatedFields.password = bcrypt.hash(req.body.password, 10);
    }

    updatedFields.username = req.body.username;
    updatedFields.email = req.body.email;

    const [updatedRowCount] = await Users.update(updatedFields, {
      where: { id: requestedUserId },
    });

    if (updatedRowCount === 0) {
      return next(errorHandler(404, 'User not found'));
    }

    const updatedUser = await Users.findByPk(requestedUserId, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
 */