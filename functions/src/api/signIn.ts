import { Page } from "puppeteer";

export const signIn = async (
  page: Page,
  username: string,
  password: string
) => {
  await page.goto(
    "https://mol.medicover.pl/Users/Account/LogOn?ReturnUrl=%2F",
    { waitUntil: "networkidle2" }
  );

  await page.focus("#UserName");
  await page.keyboard.type(username);

  await page.focus("#Password");
  await page.keyboard.type(password);

  await page.click("#loginBtn");

  await page.waitForSelector(".username");
};
