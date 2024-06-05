const jwt =require('jsonwebtoken');
const errorHandler  =require('./error');



const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(403, 'Access denied. No token provided.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (ex) {
    return next(errorHandler(401, 'Invalid token.'));
  }
};



// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_Token, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };


module.exports = verifyToken