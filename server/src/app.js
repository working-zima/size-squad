const cors = require("cors");
const express = require("express");

const productRouter = require("./routers/productRouter");
const sessionRouter = require("./routers/sessionRouter");
const userRouter = require("./routers/userRouter");

const { errorMiddleware } = require("./middlewares/errorMiddleware");

/* 앱을 만듦 */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우터 */
app.use('/products', productRouter);
app.use('/session', sessionRouter);
app.use('/users', userRouter);

/* 에러 처리 미들웨어 */
app.use(errorMiddleware);

exports.app = app;