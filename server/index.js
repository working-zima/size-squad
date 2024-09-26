require("dotenv").config();

/* 데이터 베이스 연결 */
require("./src/db/index");
/* 앱 실행 */
const { app } = require("./src/app");

const PORT = process.env.SERVER_PORT || 3000;

/* 포트 연결, 서버 실행 */
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
