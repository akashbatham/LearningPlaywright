/*Types of CSS Locators
1) Absolute CSS Locators
2) Relative CSS Locators

using tag and attribute, we can create a CSS Selector

tag with id - tag#ID - #ID
tag with class - tag.CLASS - .CLASS
tag and attribute - tag[attribute = value] - [attribute = value]
tag with class and attribute - tag.CLASS[attribute = value] - .CLASS[attribute = value]

page.locator(#ID);
*/

import {test, expect,Locator} from "@playwright/test"

test('test css', async({page}) => {

    await page.goto('http://demowebshop.tricentis.com');
    let name = page.locator('input#small-searchterms'); //css with tag and id attribute
    //let name = page.locator('#small-searchterms'); //css without tag and id attribute
    //let name = page.locator(input.search-box-text'); //css with tag and class attribute
    //let name = page.locator('.search-box-text'); //css without tag and class attribute
    await name.fill('sharp');
    await page.waitForTimeout(5000);


    //Playwright recognizes xpath with // as xpath and / as css selector
    await page.locator("xpath=absolute xpath").click(); //it is taken from root of the page (/html/body...)
    await page.locator("//absolute xpath").click();
    await page.locator("relative xpath").click(); //it is taken from the tag of the element (//div/button[])

    const locatecount:Locator = page.locator("xpath"); //if multiple elements are found, it will return the locator of all the elements in locatecount
    await locatecount.count(); //this will count the number of elements found by the locator, if it is not found, it will return 0
    await locatecount.textContent(); //this will return an Error: strict mode violation because you are trying to get the text content of multiple elements
    //Now if you just want the name of the first/last element, you can use the first()/last() method
    await locatecount.first().textContent(); //this will return the text content of the first element in the locator
    await locatecount.last().textContent(); //this will return the text content of the last element in the locator
    //Now if you know which exact number of the element you want to locate, you can use the nth() method
    await locatecount.nth(2).textContent(); //this will return the text content of the 3rd element in the locator

    //to capture all the text contents for all the elements, you can use the allTextContents() method
    let locatealltext:string[] = await locatecount.allTextContents(); 
    //this will return an array of text contents for all the elements in the locator
 
    // Nowq you can iterate through the array using for loop
    for(let text of locatealltext){
        console.log(text);
    }

})