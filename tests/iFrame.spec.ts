import{test,Page,expect,Frame} from '@playwright/test'

test('frameOne', async({page})=> {
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const myFrames:Frame[] = page.frames(); //will return an array of all the frames attached to the page
    console.log(myFrames.length);
    for(let i=0; i < myFrames.length;i++){
        console.log(myFrames);
    }

    //Approach One: page.frame - it only uses URL or name of the frame
    const frameapproachone = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    //we need to use IF to check if the frame is coming as null or not
    if(frameapproachone){
    await frameapproachone.locator('//input[@name="mytext1"]').fill("Akash");
    }else{
        console.log("this is failure");
    }
})

test.only('inner frame second approach', async({page})=> {
    await page.goto('https://ui.vision/demo/webtest/frames/');

    //Using frameLocator - it can use any attribute of the frame like ID, css

    const frame3 = page.frameLocator('[src="frame_3.html"]');
    await frame3.locator('[name="mytext3"]').fill('Akash');
    const innerframe = frame3.frameLocator('iframe[src="https://docs.google.com/forms/d/1yfUq-GO9BEssafd6TvHhf0D6QLDVG3q5InwNE2FFFFQ/viewform?embedded=true"]');
    console.log(await innerframe.locator('[class="F9yp7e ikZYwf LgNcQe"]').innerText());
    
})