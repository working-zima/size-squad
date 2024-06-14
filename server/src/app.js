const cors = require("cors");
const express = require("express");

const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");

const { errorMiddleware } = require("./middlewares/errorMiddleware");

/* 앱을 만듦 */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/products', productRouter);

/* 에러 처리 미들웨어 */
app.use(errorMiddleware);

exports.app = app;