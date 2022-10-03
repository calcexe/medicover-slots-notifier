import * as functions from "firebase-functions";

const Config = {
  puppeteer: {
    firstPage:
      "https://mol.medicover.pl/Medicover.IdentityAndAccess/PasswordManager",
  },
  medicover: {
    username: functions.config().medicover.username,
    password: functions.config().medicover.password,
  },
  mail: {
    password: functions.config().mail.password,
    user: functions.config().mail.user,
    port: functions.config().mail.port as number,
    host: functions.config().mail.host,
  },
};

export default Config;
