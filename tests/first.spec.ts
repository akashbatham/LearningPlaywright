import {test,expect} from '@playwright/test';

//TEST CREATION
//to create a test, we use the test function from the playwright test library
//the test function takes two arguments:
//1. the test name
//2. a function that contains the test code


/*
test('page  title', async({page}) => {
    await page.goto('http://www.automationpractice.pl/index.php');
    const ptitle:string = await page.title();
    console.log(ptitle);
});
*/

test('check part of page',async ({page})=> {

    await page.goto("http://www.automationpractice.pl/index.php");
    await expect(page).toHaveURL(/automation/);
    console.log(await page.title());

    
});