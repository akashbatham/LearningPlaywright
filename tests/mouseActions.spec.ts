import{test,expect,Page,Locator} from '@playwright/test'

test('mouse hover', async({page})=> {

    await page.goto('https://vinothqaacademy.com/mouse-event/');
    const txtbx = page.locator('#textbox');
    await txtbx.hover(); //used to hover on an element
    await expect(txtbx).toHaveAttribute('title',/enter first name/i);
    await page.waitForTimeout(5000);
    const bvalues = await txtbx.boundingBox();
    console.log(bvalues);
    
})

test('right and double click', async({page})=>{
    await page.goto('https://vinothqaacademy.com/mouse-event/');

    const rcb = page.locator('#rightclick');
    await rcb.click({button:"right"});
    const dblclk = page.locator('#dblclick');
    await dblclk.click({button:"left",clickCount:2});
})

test('drag and drop',async({page})=>{
    await page.goto('https://vinothqaacademy.com/mouse-event/');
    //await page.goto('https://demo.automationtesting.in/Static.html');
    const ele1 = page.locator('#draggableElement');
    const dropar = page.locator('#droppableElement');

//APPROACH ONE
    //  await ele1.hover();
    //  await page.mouse.down();
    //  await dropar.hover();
    //  await page.mouse.up();

//APPROACH TWO
    //await ele1.dragTo(dropar);

//APPROACH THREE
    const ele1loc = await ele1.boundingBox();
    console.log('element location: ',ele1loc);
    const dropzoneloc = await dropar.boundingBox();
    console.log('Dropzone location: ',dropzoneloc);
    if(ele1loc){
        await hoveronitem(ele1loc,page);
    }
    page.mouse.down();
    if(dropzoneloc){
        await hoveronitem(dropzoneloc,page);
    }
    page.mouse.up();
    
    await page.waitForTimeout(7000);
})

async function hoveronitem(boundingBox:{x:number,y:number, height:number, width:number},page:Page){
    await page.mouse.move(
        boundingBox.x + boundingBox.width/2,
        boundingBox.y + boundingBox.height/2
    );
}