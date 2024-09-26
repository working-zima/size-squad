const cors = require("cors");
const express = require("express");
const helmet = require('helmet');

const sessionRouter = require("./routers/sessionRouter");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const fitRouter = require("./routers/fitRouter");
const genderRouter = require("./routers/genderRouter");
const sizeRouter = require("./routers/sizeRouter");
const measurementRouter = require("./routers/measurementRouter");
const initialDataRouter = require("./routers/initialDataRouter");

const { errorMiddleware } = require("./middlewares/errorMiddleware");

/* 앱을 만듦 */
const app = express();

app.use(helmet());

app.use(cors({
  origin: [
    "https://port-0-size-squad-m1jetsxxbf67a0bc.sel4.cloudtype.app/",
    "프론트주소(ex:https://어쩌구주소.cloudtype.app)",
    "http://localhost:8000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우터 */
app.use('/session', sessionRouter);
app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/fits', fitRouter);
app.use('/genders', genderRouter);
app.use('/sizes', sizeRouter);
app.use('/measurements', measurementRouter);
app.use('/initialData', initialDataRouter)

/* 에러 처리 미들웨어 */
app.use(errorMiddleware);

exports.app = app;