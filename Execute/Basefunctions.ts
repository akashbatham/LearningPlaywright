import{Page,BrowserContext,Locator} from '@playwright/test'

export class Baseclass{

    public page:Page;
    public context:BrowserContext;

    constructor(page:Page, context:BrowserContext){
        this.page = page;
        this.context = context;
    }

    async navigatetourl(url:string){
        await this.page.goto(url);
    }

    async clickbtn(element:Locator){
        await element.click();
        console.log('clicked on button');
    }

    async clickoniteminlist(list:Locator, listitem:string){
        const items = await list.all();
        for(const item of items){
            const text = (await item.textContent())?.trim();
            console.log(text);
            if(text === listitem){
                await this.clickbtn(item);
                break;
            }
        }
    }

}