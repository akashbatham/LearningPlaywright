//A callback function is a function that is passed as an argument to another 
// function and is executed after the main function has completed.


/*function ac(a:number, b:number, callback:any):void{
    console.log(a+b);
    callback();
}
function display(){
    console.log('Hello');
}
ac(10, 20, display);
//like API calls, file handling or event handling
*/

let messag = (nam:string, lnam:string, msg:(message:string)=>void,num:(message:number)=>void):void => {
    msg('Hello ');
    num(53568);
    console.log(nam,lnam);
}
let showmessage = (message:string)=>{
    console.log(message);
}
let thirdfun = (message:number)=>{
    console.log(message);
}
messag('Akash', 'Batham', showmessage,thirdfun);