import {test, expect, Locator, Page} from '@playwright/test'

test('handling alert', async({page}) => {
    await page.goto('https://demo.automationtesting.in/Alerts.html');
    dialogHandler(page);
    await page.getByRole('button',{name:/click\s+the\s+button/i}).click();
    await page.getByRole('link',{name:"Alert with OK & Cancel"}).click();
    dialogHandler(page);
    await page.getByRole('button',{name:/click\s+the\s+button/i}).click();
    console.log(await page.locator('#demo').textContent());
    await page.getByRole('link',{name:"Alert with Textbox"}).click();
    dialogHandler(page,'Akash');
    await page.getByRole('button',{name:/click\s+the\s+button/i}).click();
    console.log(await page.locator('#demo1').textContent());

})

async function dialogHandler(page:Page,naam?:string){
    page.once('dialog', async dialog =>{
        console.log('Dialog Type: ',dialog.type()); //return the type of alert
        console.log('Dialog Message: ', dialog.message()); //returns the message in the dialog
        //expect(dialog.message()).toContain("I am an alert box!");
        await page.waitForTimeout(3000);
        //await dialog.accept(); 
        if (naam === 'Akash'){
            await dialog.accept(naam); 
        }else if(naam!== 'Akash'){
            await dialog.dismiss();    
        }
        else{
            await dialog.accept();
        }
    })
}