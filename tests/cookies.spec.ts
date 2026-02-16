import { test, expect, chromium } from '@playwright/test'

test('cookie handling', async () => {
    const browsr = await chromium.launch({ headless: false });
    const contxt = await browsr.newContext();
    const page = await contxt.newPage();
    contxt.addCookies([{ name: 'myCookie', value: '12424', url: 'https://demowebshop.tricentis.com/' },
    { name: 'myCookieTwo', value: '12425', url: 'https://demowebshop.tricentis.com/' }
    ]);
    console.log("cookie added");

    await page.goto('https://demowebshop.tricentis.com/');
    const retrievedcookies = await contxt.cookies();
    const cookiename = retrievedcookies.map(c => c.name);
    //expect(retrievedcookies.find((i)=> i.name===/mycookietwo/i)).toBeTruthy();
    //expect(retrievedcookies.find((i)=> i.name));
    expect(cookiename).toContain('myCookie'); //This is hard assertion
    expect.soft(cookiename).toContain('49767'); //This is soft assertion
    //console.log(retrievedcookies);
})

//What are assertions?
//It is the statement that checks the state of the application and return true or false
/*Assertions is of 2 types
1.Soft Assertions
2.Hard Assertions
-Soft Assertions: It will not stop the execution if it fails, it works on the values of the elements if they matches the correct value or not
-Hard Assertions: It will stop the execution if it fails, it works on the locators or page if they matches the correct value or not
*/