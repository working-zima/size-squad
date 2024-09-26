const mongoose = require("mongoose");

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요.";

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL);
});

db.on("error", (error) => {
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error);
});
db.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  mongoose.connect(DB_URL);
});

exports.db = db;