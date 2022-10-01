import * as puppeteer from "puppeteer";

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: ["--no-sandbox"],
  });
  return browser;
};
