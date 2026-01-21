import{test,expect,Page,BrowserContext}from '@playwright/test'
import{POC} from '../MainCode/Login'
import{Baseclass} from '../Execute/Basefunctions'

const url = 'https://automationexercise.com/';
let poc:POC;
let bcs:Baseclass;
let context:BrowserContext;
let page:Page;

test.beforeAll('intialize browser',async ({browser})=> {
    context = await browser.newContext();
    page = await context.newPage();
    bcs = new Baseclass(page, context);
    poc = new POC(page, context); 

});

test('tap item in list', async ({}) => {
    await bcs.navigatetourl(url);
    await poc.itemclick();
    await page.waitForTimeout(10000);
});