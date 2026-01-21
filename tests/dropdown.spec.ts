import {test,expect,Locator} from '@playwright/test'

test('handling static dropdown', async({page}) => {

    await page.goto('http://testautomationpractice.blogspot.com/');
    const dropcon = page.locator('#country');
    await dropcon.focus();
    await page.waitForTimeout(2000);
    //Select option from the dropdown(4 ways)
    await dropcon.selectOption('India');
    await page.waitForTimeout(2000);
    await dropcon.selectOption({label: 'United Kingdom'});
    await page.waitForTimeout(2000);
    await dropcon.selectOption({value: 'france'});
    await page.waitForTimeout(2000);
    await dropcon.selectOption({index: 1});
    await page.waitForTimeout(2000);

    const options:string[] = (await dropcon.allTextContents()).map(option=> option.trim());
    console.log('these are options:',options);

    //Assertion
    expect(options).toContain('India');
})

test('multiselect dropdown', async({page})=> {

    await page.goto('http://testautomationpractice.blogspot.com/');
    const muldd = page.locator('#colors');
    await muldd.focus();
    await muldd.selectOption(['Red','Yellow','Green']);
    await page.waitForTimeout(3000);

    const dropdowncount = page.locator('#colors>option');
    console.log('dropdowncount:',await dropdowncount.count());
    const txt = await dropdowncount.allTextContents();
    console.log('these are the text contents:',txt);
    txt.sort();
    console.log('these are the text contents:',txt);
    //it follows the same logic as the static dropdown - label, value, index

    const createset = new Set<string>(); //Set will not have duplicate values
    const createarray:string[] = []; //Array will have duplicate values


})

test('handling dynamic/autosuggest dropdown', async({page})=> {

    await page.goto('http://www.flipkart.com/');
    //use sources too get the items in the hidden dropdown
    await page.locator('input.lNPl8b').fill('playstation');
    await page.waitForTimeout(2000);
    const itemlist2 = page.locator('div.URRkKz');
    const items2:string[] = await itemlist2.allTextContents();
    console.log('these are the items2:',items2);
    // you can also use for loop to get all the values

})

test.only('handling hidden/bootstrap dropdown', async({page})=> {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:'login'}).click();
    await page.waitForTimeout(5000);  
    await page.locator('//span[text()="PIM"]').click();
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);
    const joblist:Locator = page.locator('//label[text()="Job Title"]/parent::div/following-sibling::div/div/div/div/span');
    const joblisttext:string[] = await joblist.allTextContents();
    if (joblisttext.includes('Automation Tester')){
        await joblist.nth(joblisttext.indexOf('Automation Tester')).click();
    }else{
        console.log('Automation Tester not found');
    }
    await page.waitForTimeout(5000);

})