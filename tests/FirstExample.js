const puppeteer=require('puppeteer');
const expect=require('chai').expect;
const config=require('../lib/config');
const helpers=require('../lib/helpers');


// Test Suite
describe('FirstEx Test', () => {
    let browser;
    let page;
    before(async()=>{
        browser=await puppeteer.launch({
            headless:config.isHeadless,
            slowMo:config.slowMo,
            timeout:config.launchTimeout
        });
        page=await browser.newPage();
        await page.setDefaultTimeout(config.waitingTimeout);
        await page.setViewport({
            height:config.viewPortHeight,
            width:config.viewPortWidth
        });
    });
    after(async()=>{
        await  browser.close();
    });
    it('should login as Admin',async()=>{
        await page.goto(config.baseUrl+'/admin');
        await page.type('[name="email"]',"admin@phptravels.com");
        await page.type('[name="password"]','demoadmin');
        // await page.click('[type="submit"]');
        await page.click('[type="submit"]');

        await page.waitForNavigation();
        let userRole=await page.$eval('h5', element => element.textContent);
        
        
        expect(userRole).to.equal('AdministratorConsole');
    });
    it('should login as user',async()=>{
        // await page.goto(config.baseUrl+'/login');
        helpers.loadUrl(page,config.baseUrl+'/login');
        await page.waitForNavigation();
        await page.type('[name="username"]','user@phptravels.com');
        await page.type('[name="password"]','demouser');
        await page.click('[type="submit"]');
        await page.waitForNavigation();
        // await helpers.waitForText(page,'h3','Demo User');
        // await page.waitForSelector('.dropdown dropdown-login dropdown-tab show');
        // await helpers.shouldExist(page,'.bx-user');
        await helpers.click(page,'.bx-user');
        
        // await helpers.pressKey(page,'Enter');
        // await page.$eval('.dropdown dropdown-login dropdown-tab',element=> element.click);
    });
})
