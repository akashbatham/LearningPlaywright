import {test,expect,Locator} from '@playwright/test'

test('handling products', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');
    const products:Locator = page.locator('.product-title');
    await products.count();
    console.log(await products.nth(1).innerText()); //will give you the exact text removing the spaces, new lines, tabs, etc.
    console.log(await products.nth(1).textContent()); //will give you the text content including the spaces, new lines, tabs, etc.

    //now you can iterate through the products and get the text content of each product using for loop
    for(let i = 0; i < await products.count(); i++){
        console.log(await products.nth(i).innerText());
    }
})

test('handling static table', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
/*    const table = page.getByRole('table',{name:'BookTable'});
    const body =table.locator('tbody');
    console.log(body.count());
*/

//CHAINING OF LOCATORS
    const table = page.locator('//table[@name="BookTable"]');
    const body = table.locator('tbody');
    const data = body.locator('tr');
    //now combine all these in one
    const fullrows = page.locator('table[name="BookTable"] tbody tr');
    console.log(await data.count());
    console.log(await fullrows.count());
    //console.log(await data.allInnerTexts());
    // for(let i = 0; i < await data.count(); i++){
    //     let datastring = await data.locator('td').innerText();
    //     //let datastring = (await data.locator('td').nth(i).innerText()).split('\n').map(text => text.trim());
    //     console.log(datastring);
    // }
    const tabledata = fullrows.locator('td');
    console.log(await tabledata.count());
    //If you want to have list of strings use FOR Loop
    // for (let i = 0; i< await tabledata.count(); i++){
    //     let datastring = (await tabledata.nth(i).textContent())?.trim();
    //     console.log(datastring);
    // }

    //If you want to have an array(singloe array of all elements) of string use allTextContents() and Map()
    // const dataarray = await tabledata.allTextContents();
    // //console.log(dataarray);
    // const dtarr = dataarray.map(text=>text.trim());
    // console.log(dtarr);

    //If you want to create array of arrays of strings use allInnerTexts() and Map() within FOR Loop
    // for (let i=0; i <await fullrows.count();i++){
    //     const celldata = fullrows.nth(i).locator('td'); //this will create an array for each row
    //     //const celldata = fullrows.locator('td').nth(i); //this will create an array for each cell
    //     const celltext = await celldata.allInnerTexts();
    //     console.log(celltext.map(text=>text.trim()));
    // }    

    //All row with locator
    const allrow = await data.all();
    //console.log(allrow);

    for(let row of allrow.slice(1)){
        const rowdata = await row.locator('td').allInnerTexts();
        console.log(rowdata.join('\t')); //this will join the array of strings with a tab separator
    }

    //printing the data of a row using row value
    for(let row of allrow){
        const rowdat = await row.locator('td').allInnerTexts();
        const author = rowdat[1];
        const book = rowdat[0];
        if (author === 'Mukesh'){

            console.log(`Author:${author}, Book: ${book}, price: ${rowdat[3]}`);
        }
     }

})

test('handling dynamic table', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    let table:Locator = page.locator('#taskTable');
    let tbody:Locator = table.locator('tbody');
    await expect(table).toBeVisible();
    //Method 1: Using locator
    let rows = tbody.locator('tr');
    console.log(await rows.count());

    //Method 2: Using all()
    let rows2 = await tbody.locator('tr').all();
    console.log(rows2.length); //when we use all(), and wants the count of the rows, we use the length of the array

    for(let row of rows2){
        const rowdata = await row.locator('td').nth(0).innerText();
        //To search a specific row and get the data of that row
        if(rowdata === 'Chrome'){
            const selectrow = await row.locator('td').allInnerTexts();
            console.log("Select row: ",selectrow);
        }
        //To search for a specific data in the table
        if(rowdata === 'Firefox'){
            console.log(await row.locator('td').allInnerTexts());
            const selecteddata = await row.locator('td:has-text("0")').innerText();
            console.log(rowdata,": ",selecteddata);
        }
    }

    // let cols = rows.locator('td');
    // console.log(await cols.count());
    // for(let row in rows){
    //     const rowdata = await rows.locator('td').allInnerTexts();
    //     console.log("Row data: ",rowdata);
    // }
    // for(let i=0; i<await rows.count();i++){
    //     const rowdata = await rows.nth(i).locator('td').allInnerTexts();
    //     console.log("i loop: ",rowdata);
        
    // }

})


test.only('Handling pagination table', async({page})=> {
    testIdAttribute: 'data-td-idx' //this is to change the data-testid attribute to data-qa
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    console.log(await page.title()); //This will get entire page title
    const table = page.locator('#example');
    const tbody = table.locator('tbody');
    const trow = await tbody.locator('tr').all();
    console.log(trow.length);
    while(await page.locator('//nav/button[@data-dt-idx="next"]').isDisabled() === false){
        console.log('Page Number: ',await page.locator('//button[@class = "dt-paging-button current"]').textContent());
        for(let row of trow){
            //const pagedata = await row.locator('td').nth(0).innerText(); //this will return a string of all the text in the cell
            const pagedata = await row.locator('td').allInnerTexts(); //this will return an arrays of strings
            if(pagedata.length === 0) continue;
            console.log(pagedata.map(text=>text.trim())); //use map to trim the strings and join them with a comma
        }
        await nextpage(page);
        await page.waitForLoadState('networkidle');
    }
    await selectingdropdown(page);
    await page.waitForTimeout(25000);
})

async function nextpage(page:any){
    let nextbutton = page.locator('//nav/button[@data-dt-idx="next"]');
    await nextbutton.focus();
    await nextbutton.click();
}

// async function selectingdropdown(page:any){
//     const dropdown = page.getByRole('combobox',{name: /entries per page/i});
//     //await dropdown.focus();
//     // await dropdown.click();
//     const options = await page.locator('//option').all();
//     // await dropdown.selectOption({index: 1});
//     // await dropdown.click();
//     // await dropdown.selectOption({lable: '100'});
//     // await dropdown.click();
//     // await dropdown.selectOption({value: '25'});
//     // await dropdown.click();
//     // await dropdown.selectOption('50');
//     for(let count of options){
//         console.log(await count.innerText());
//         // if (await count.innerText() === '50'){
//         //     //await page.count.click();
//         //     await page.locator('//option[@value="50"]').click();
//         //     break;
//         // }
//     } 
// }


async function selectingdropdown(page:any){
    const dropdown = page.getByRole('combobox',{name: /entries per page/i});
    const options = await dropdown.locator('option').all();
    for(let count of options){
        console.log(await count.innerText());
        if (await count.innerText() === '50'){
            await dropdown.selectOption({label: (await count.innerText())});
            break;
        }
    } 
}