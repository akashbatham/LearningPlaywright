import {test,expect} from '@playwright/test'

test('builtIn Locators', async ({page})=> {
/*

    //await page.goto('https://demo.nopcommerce.com/');

    //getByAltText
    //await page.getByAltText('nopCommerce demo store').click();
    //Identifies Images (and similar elements) by their alt text
    //we use this locator when the element supports alt text such as img and area elements
    //example: <img src="image.jpg" alt="NopCommerce Logo">
    //example: <area href="https://www.nopcommerce.com" alt="NopCommerce">
    //example: <img src="image.jpg" alt="NopCommerce Logo">

    //getByText
    console.log('Full String'); 
    await expect(page.getByText('Welcome to our store')).toBeVisible();
    console.log('Partial String');
    await expect(page.getByText('Welcome to')).toBeVisible(); //This is case sensitive
    console.log('Case Insensitive String');
    await expect(page.getByText(/WELCOME\s+to\s+OUR\s+store/i)).toBeVisible(); //This is case insensitive
    //this is used to get the element by the visible text
    //elements like <p>, <h2>, <a> which only have visible text will be identified by this locator
    //this is different from the xpath which uses //[text()='Welcome to our store'] since it is used to find elements like button, text fields etc.


    //getByRole
    await page.getByRole('button', { name: 'Click me' }).click();
    //page.getByRole('ROLE', {name:''}); //Returns a locator hence await is not required
    //Role is defined on the base of the element type.
    //you can find the role of the element by right clicking on the element and selecting "Inspect"
    //then look for the role attribute in the HTML code
    //Includes buttons, checkbox, headings, links, lists, tables, tabs, text fields, etc.
    //example: <button role="button">Click me</button>
    //example: <input role="checkbox" checked>
    //example: <h2 role="heading">Welcome to our store</h2>
    //example: <a role="link" href="https://www.nopcommerce.com">NopCommerce</a>
    //example: <ul role="list">
    //example: <table role="table">
    //example: <div role="tablist">
    //example: <input role="textbox" value="Enter your name">

    page.getByLabel('Search'); //await is not required because we are not taking any action
    await expect(page.getByLabel('Search')).toBeVisible(); 
    //await is required because we are taking an action, we are trying to find the visibility
    //Label is mostly used for form fields like text fields, checkboxes, radio buttons, etc. which have a label associated with them.
    //like <label for="search">Your Search</label> <input id="search" type="text" placeholder="Search">
    //await page.getByLabel('Your Search');


    page.getByPlaceholder('Search'); //await is not required because we are not taking any action
    //You can handle the elements using placeholder text available in the input fields

*/

    await page.goto("file:///C:/Users/Softprodigy/User/PlaywrightTypescript/Playwright/app.html");

    //get By Title
   const titletext = await page.getByTitle('Tooltip text').textContent();
   const idtext = await page.getByTestId('profile-email').textContent();
   console.log(titletext, idtext);

   /*
export default defineConfig({
  use: {
    testIdAttribute: 'data-qa' // 👈 change from data-testid
  }
});
   */

});