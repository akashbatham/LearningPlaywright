//Methods in keyboard - down, press, up, type, insertText
import{test,expect} from '@playwright/test'

test('Keyboard Actions multistatement',async({page})=>{

    await page.goto('https://demo.automationtesting.in/Register.html');

    const firstname = page.getByPlaceholder("First Name");
    //Adding Firstname
    await firstname.focus();
    await page.keyboard.insertText("Akash");

    //Performing Select All
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');
    //Performing Copy all
    await page.keyboard.down('Control');
    await page.keyboard.press('c');
    await page.keyboard.up('Control');

    //Pasting
    const addr = page.locator('[rows="3"]');
    await addr.focus();
    await page.keyboard.down('Control');
    await page.keyboard.press('v');
    await page.keyboard.up('Control');

    await page.waitForTimeout(7000);
})

test.only('keyboard actions single statment', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');
        //Adding Lastname
        const lastname = page.getByPlaceholder("Last Name");
        await lastname.focus();
        await page.keyboard.type("Batham");
        //Copying
        await page.keyboard.press('Control+a');
        await page.keyboard.press('Control+c');
        //Pasting
        const addr = page.locator('[rows="3"]');
        await addr.focus();
        await page.keyboard.press('Control+v');

        await page.waitForTimeout(5000);
})