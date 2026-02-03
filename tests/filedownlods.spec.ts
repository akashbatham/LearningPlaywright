import {test,expect} from '@playwright/test'
//import {randomUUID} from 'crypto' //Used to generate ANYTHING randomly
import {faker} from '@faker-js/faker';

test('download files', async({page})=>{
    await page.goto('https://demo.automationtesting.in/FileDownload.html');
    const txtbox = page.locator('#textbox');
    const genbtn = page.locator('#createTxt');
    await expect(genbtn).toBeDisabled();
    await txtbox.focus() ;
    //await txtbox.fill('This is filled using fill'); THIS WILL FAIL BECAUSE THE TEXTBOX NEEDS THE MANUAL INPUT
    //await page.keyboard.insertText('using insertText'); THIS WILL FAIL BECAUSE THE TEXTBOX NEEDS THE MANUAL INPUT
    await page.keyboard.type('This will be a textfile download');
    await expect(genbtn).toBeEnabled();
    await genbtn.click();

    //we are creating an event for download and clicking on the button to download
    const [download] = await Promise.all([page.waitForEvent('download'),page.locator('#link-to-download').click()]);
    //await page.waitForEvent('download'); nbm nbvgh 
    //await page.locator('#link-to-download').click();

    //const filenam = randomUUID();
    //const filenam = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '_'); This will generate random person name replacing spaces with _
    
    //GENERATING A RANDOM FILE NAME
    const filenam = `${faker.system.fileName().split('.')[0]}.txt`;
    //const filnam = `${filenam.split('.')[0]}.txt`;

    //This will create a downloads folder inside the project folder with same file name downloaded everytime
    const dwldpath = 'downloads/txtfileautomation.txt'; 

    //This will create a downloads folder inside project folder but will generate a random file name everytime
    const dwnldpath = 'downloads/'+filenam;

    //This will download the file directly to your mentioned folder in system
    const syspath = 'C:/Users/Softprodigy/Downloads/'+filenam;
    //console.log(syspath);
    
    //downloading the file to downloadpath
    await download.saveAs(dwnldpath);

    await page.waitForTimeout(4000);
})