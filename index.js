const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

app.use(express.json()); // allows you write json objects to body
app.use(express.urlencoded({ extended: false })); //
app.use(cookieParser()); // allows you access cookies and its contents
app.use(cors()); 
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specified HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true // Allow credentials
// }))
dotenv.config();

const db = require("./models");
app.set("view engine", "ejs");

//routers
const authRouter = require("./routes/UserAuth.route")
const userRouter = require("./routes/User.route")



//endpoint routes
app.use("/auth", authRouter)
app.use("/users", userRouter)


// app.get('/registration-success', (req, res) => {
//   res.render('registrationSuccess');
// });



//middleware to handle errors
app.use((err,req, res, next) => {
  const statusCode = err.statusCode || 500  
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,   //after es6 if the variable and key has same name, then no need to write it as-- statusCode: statusCode
    message,
  }) 

})


db.sequelize.sync().then(() => {
  const port = 6000;
  app.listen(port, () => {
    console.log("Server listening on " + port);
  });
});
