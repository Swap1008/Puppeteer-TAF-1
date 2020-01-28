module.exports = {
  click: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      console.error("Error" + error);
    }
  },
  type: async function(page, selector, text) {
    try {
      await page.type(selector, text);
    } catch (error) {
      console.error("Error:" + error);
    }
  },
  loadUrl: async function(page, url) {
    try {
      await page.goto(url, { waitUntil: "networkidle0" });
    } catch (error) {
      console.error(error);
    }
  },
  getText: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, element => element.innerHTML);
    } catch (error) {
      console.log(error);
    }
  },
  getCount: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$$eval(selector, items => items.length);
    } catch (error) {
      console.log(error);
    }
  },
  waitForText: async function(page, selector, text) {
    try {
      await page.waitForSelector(selector);
      await page.waitForFunction(
        (selector, text) =>
          document.querySelector(selector).innerHTML.includes(text),
        {},
        selector,
        text
      );
    } catch (error) {
      console.log(error);
    }
  },
  pressKey: async function(page, key) {
    try {
      await page.keyboard.press(key);
    } catch (error) {
      console.log(error + `Could not press Key ${key}`);
    }
  },
  shouldExist: async function(page, selector) {
    try {
      await page.waitForSelector(selector, { visible: true });
    } catch (error) {
      throw new Error(`Selector does not exists:  ${selector}`);
    }
  },
  shouldNotExist: async function(page, selector) {
    try {
      await page.waitFor(() => !document.querySelector(selector));
    } catch (error) {
      throw new Error(`Error : ${error} `);
    }
  }
};
