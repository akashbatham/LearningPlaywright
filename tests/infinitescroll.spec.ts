import{test,expect} from '@playwright/test'

test.only('infinite scrolling', async({page})=>{

    test.slow(); //this increases the time for execution of the test from 30s to 90s
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=0to100');
    //HOW TO SCROLL THE PAGE
    //WE WILL USE JAVASRIPT TO SCROLL THROUGH PAGE
    // while(true){
    //     await page.evaluate(()=>{
    //         window.scrollTo(0,document.body.scrollHeight); //This code will scroll to the current end of the page
    //     })
    // }


    //APPROACH TWO - where we calculate and compare the heights of the page
    let previousHeight = 0;

    while(true){
        const currentHeight = await page.evaluate(()=>{ //This will return the current height of the webpage
            return document.body.scrollHeight;
        })

        await page.evaluate(()=>{
            window.scrollTo(0,document.body.scrollHeight); 
            //here 0 does not indicate the previousHeight, it indicates the current page dimension
            //Here 0 indicates that the visible page current top is considered as 0 and bottom is considered as new currentHeight
        })
        
        await page.waitForTimeout(2000);

        console.log(previousHeight,' & ',currentHeight);

        // const book = page.getByRole('heading',{name:/i kissed the baby!/i});
        // //await expect(book).toBeVisible();

        // if(await book.isVisible()){
        //     console.log("The book is found");
        //     break;
        // }
        // else 
        if(currentHeight === previousHeight){ break } //if the page reaches the end of webpage then the while loop breaks
        else{
            previousHeight = currentHeight; //if the webpage doesnot reach the end, current height of webpage is assigned to previous height
        }
        
    }
    console.log('Reached End Of Page');
})


test('table infinte scroll',async({page})=> {
    test.slow();
    await page.goto('http://faxmail-dashboard-frontend.s3-website-us-east-1.amazonaws.com/');
    await page.getByRole('radio',{name:/faxmail module/i}).click();
    const table = page.locator('.mdc-data-table__content').nth(0);
    await table.focus();
let previousCount = 0;

while (true) {
  const rows = table.getByRole('row');
  const currentCount = await rows.count();

  if (currentCount === previousCount) break;

  previousCount = currentCount;
  await rows.last().scrollIntoViewIfNeeded();
  //await page.waitForTimeout(5000);

}

console.log('Reached last row of table 1');
//await page.waitForTimeout(10000);
})