//Shadow Root - 
//Shadow Host - the nodes inside the Host should be encapsulated
//Shadow DOM - these are the nodes inside HOST or is a part of Shadow Tree  

//XPATH cannot be used in the shadow dom

//You can directly interact with the element using CSS only

import{test,expect} from '@playwright/test'

test('shadow DOM', async({page})=>{

    await page.goto('https://selectorshub.com/shadow-dom-in-iframe/');
    const fram = page.frame({url:"https://selectorshub.com/shadow-dom-closed-shadowdom/"});
    if(fram){
        await fram.locator('input[id="pizza"]').fill('lapinozzzz');
    }
    

})