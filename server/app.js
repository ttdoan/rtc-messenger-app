import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

// Routes
// import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import chatRoomRouter from "./routes/chatRoom";

const { json, urlencoded } = express;

var app = express();

// Middleware
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const limiter = rateLimit({
  max: 100,
  handler: function (req, res, next) {
    return next(
      createError(429, "Too many requests! Please try again at a later time.")
    );
  },
});
app.use(limiter);

// MongoDb
// NOTE: You can add production URL
const url =
  process.env.NODE_ENV === "production"
    ? ""
    : "mongodb://localhost:27017/realTimeMessenger";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

// Connect routers
// app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/chatrooms", chatRoomRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;
