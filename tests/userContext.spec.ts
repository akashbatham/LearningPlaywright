//Browser context helps the user to create multiple user specific browser windows which is specific to that user only
//it helps in parallel automation

import{test,expect,Page,chromium, firefox, webkit} from '@playwright/test'

//Browser --> Context --> Multiple Pages
//Browser --> Chrome, firefox, webkit
//Context --> Multiple contexts for multiple users/apps for same browser
//Pages --> Tab, window or popup

test('browser context',async() => {
    //You can avoid this step if write {browser} in async
    const chromer = await chromium.launch(); //To create the chrome browser
    const firefoxer = await firefox.launch(); //To create the firefox browser
    const webkiter = await webkit.launch(); //To create the webkit browser
    //You can avoid this step if write {context} in async
    const Chromecontext =await chromer.newContext(); //Creating the context for browser
    const Firefoxcontext = await firefoxer.newContext();
    const WebkitContext = await webkiter.newContext();
    //You can avoid this step if write {page} in async
    const page1:Page = await Chromecontext.newPage();
    const page2:Page = await Firefoxcontext.newPage();
    const page3:Page = await WebkitContext.newPage();

    await page1.goto('https://demo.automationtesting.in/Windows.html');
    await page1.goto('http://faxmail-dashboard-frontend.s3-website-us-east-1.amazonaws.com/');
    await page2.goto('https://demo.automationtesting.in/Windows.html');
    await page3.goto('https://demo.automationtesting.in/Windows.html');

    const totalNumberOfPages = Chromecontext.pages().length;
    console.log(totalNumberOfPages);
})


test('handling tabs', async()=>{
    const chromer = await chromium.launch();
    const Chromecontext =await chromer.newContext(); 
    const parentpage:Page = await Chromecontext.newPage();

    await parentpage.goto('https://demo.automationtesting.in/Windows.html');
    const buttn = parentpage.getByRole('button', {name: /click/i});
    //To capture the page after clicking the button we need to capture is using the event, but to catch the event we need to put the event before cclicking the button.
    //So we need to make these events/promises to run parallel, we add promise.all  
    //await Chromecontext.waitForEvent('page');
    //await buttn.click();
    //The above code will not work
       
    //Promise.all accepts array of statements returning promises to execute at the same time
    //This is called race conditions where we want 
    const [childpage] = await Promise.all([Chromecontext.waitForEvent('page'),buttn.click()]);
    const childpagetitle = await childpage.title();
    console.log(childpagetitle);      
    
    //If you have multiple pages open in the browser then you can use the .pages() to get the arroy of pages
    const expages = Chromecontext.pages();
    console.log('Number of pages: ',expages.length);
    //NOW YOU CAN TRAVERSE THROUGH PAGES USING THIS ARRAY
    const page2 = expages[1];
    const pageTitle1 = await expages[0].title();
    const pageTitle2 = await page2.title();
    expect(pageTitle2).toBe(childpagetitle);
    const something = await page2.getByRole('heading',{name:"Selenium Webdriver"}).innerText();
    console.log(something);
})

test('handling popup window', async()=>{

    const browse = await chromium.launch();
    const context = await browse.newContext();
    const mainPage:Page = await context.newPage();

    await mainPage.goto('https://demo.automationtesting.in/Windows.html');
    const secondelement = mainPage.getByRole('link',{name: /open new seperate windows/i});
    await secondelement.click();
    const [newpopup] = await Promise.all([context.waitForEvent('page'),mainPage.getByRole('button',{name:/click/i}).click()]);
    //await mainPage.getByRole('button',{name:/click/i}).click();
    console.log(await newpopup.title());

})


test('handling multiple wirndows', async({context})=> {
    const mainPage = await context.newPage();

    await mainPage.goto('https://demo.automationtesting.in/Windows.html');
    const secondelement = mainPage.getByRole('link',{name: /open seperate multiple windows/i});
    await secondelement.click();
    await mainPage.getByRole('button',{name:/click/i}).click();
    await mainPage.waitForTimeout(3000);
    const allPages = context.pages();
    for (const paper of allPages){ //this directly uses the locator in the for loop
        console.log(await paper.title());
    }
    for(let i=0; i<allPages.length;i++){ //this works with the total number of pages
        console.log('Title of page ',i,': ',await allPages[i].title(), ' - ', allPages[i].url());
    }

})

test.only('basic auth',async({browser})=>{
    //const context = await browser.newContext();
    //Approach ONE - version ONE(most preferred) - pass the username and password in context
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });

    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth'); //This will not work as the popup authentication fails
    
    await page.waitForTimeout(5000);
    //Approach TWO - pass the username andf password with the url
    //await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

})