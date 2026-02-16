import{test,expect,Locator} from '@playwright/test'
import { text } from 'node:stream/consumers';

test('textbox actions', async ({page})=>{

    await page.goto('http://testautomationpractice.blogspot.com/');

    const textbox:Locator = page.locator('#name');
    await expect(textbox).toBeVisible();
    const maxl:string|null = await textbox.getAttribute('maxlength');
    expect(Number(maxl)).toBeGreaterThan(10);
    textbox.fill('Give the value here');
    //Now when you have passed the text, now you need to check if the text is visible
    //const texxontent = await textbox.textContent();//this will not work
    const txt = await textbox.inputValue(); //this will return the value of the textbox
    console.log(txt);
    await expect(textbox).toHaveValue('Give the value here'); //this will check if the value of the textbox is equal to the given value
  
})

test('radio actions', async({page})=>{
    await page.goto('http://testautomationpractice.blogspot.com/');
    const radiloc:Locator = page.locator('#male');
    await expect(radiloc).toBeVisible();
    await expect(radiloc).toBeEnabled();
    await radiloc.check();
    expect(radiloc.isChecked()).toBeTruthy();

})

test('mapping the elements', async({page})=>{
    await page.goto('http://testautomationpractice.blogspot.com/');
    //Assigning the days to the locator
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayloc:Locator[] = days.map(day => page.getByLabel(day)); //this will return an array of locators
    console.log(dayloc);

})

test('creating array from label text', async({page})=>{
    await page.goto('http://testautomationpractice.blogspot.com/');
    const days = page.getByLabel(/day|month|year/i); //this will return an array of locators which matches the partial text 'day' or 'month' or 'year'
    const dayss = page.getByLabel(/\day\b|\month\b|\year\b/i);
    //\b is used to match the exact text 'day' or 'month' or 'year'
    //i is used to make the search case insensitive
    console.log(await dayss.count());
})