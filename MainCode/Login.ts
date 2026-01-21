import{Page,BrowserContext,Locator} from '@playwright/test'
import { Baseclass} from '../Execute/Basefunctions'

export class POC extends Baseclass{

    private listpath!:Locator;
    private url!:string;
    private VPbtn!:Locator;

    constructor(page:Page, context:BrowserContext){
        super(page,context);
        this.intial();
    }

    private intial() {
        this.listpath = this.page.locator('//div[@class="single-products"]/div/p');
        this.url = 'https://automationexercise.com/';
        this.VPbtn = this.page.locator('//a[text()="View Product"]');
    }
    
    public async itemclick() {
        await this.navigatetourl(this.url);
        await this.clickoniteminlist(this.listpath, 'Summer White Top');
        //this.clickbtn(this.VPbtn);
    }

    public async mappingactions(){

    }

    
}