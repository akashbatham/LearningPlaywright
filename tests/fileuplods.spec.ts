import {test, Page, expect} from '@playwright/test'

test('single file upload', async({page})=>{
    await page.goto('https://demo.automationtesting.in/FileUpload.html');
    await page.locator("//input[@type='file']").setInputFiles('C:/Users/Softprodigy/Downloads/6.pdf');
    await page.waitForTimeout(7000);

})

test.only('multiple file upload', async({page})=>{
    await page.goto('https://demo.automationtesting.in/FileUpload.html');
    const multifile = ['C:/Users/Softprodigy/Downloads/6.pdf','C:/Users/Softprodigy/Downloads/12122025_UNM+HOSPITALS.pdf']
    await page.locator("//input[@type='file']").setInputFiles(multifile);
    await page.waitForTimeout(7000);

})