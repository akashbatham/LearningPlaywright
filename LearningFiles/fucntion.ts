//Understanding Functions
//Functions are of two types
//Normal Functions, Arrow Functions and Functions with parameters

//Normal Fucntions
//We can use these fucntions and similar to these in Basecamp to get a screenshot
function sumNumbers(a: number, b:number){
    return a+b;
}

//Arrow Functions
//Format One
const addOne = (a: number, b: number) => {
    return a + b;
  };
//Format Two
const addTwo = (a:number, b:number) => a+b;

//now why to use arrow functions
//Arrow functions are more concise and easier to read than normal functions
//In arrow functions, this keyword refers to the object that the function is a property of class
// 👉 Arrow functions do NOT create their own this
// 👉 They inherit this from the surrounding class



//====================================k45re===========================================

//Simple function - no parameters, no return value

function displayMessage(){
  console.log('Hye');
}
displayMessage();

//Function with parameters and return type

function addNumbers(a:number, b:number):number{
  return a+b;
}
addNumbers(10, 20);
console.log(addNumbers(30, 20));

//Fucntion with N number of parameters and return type is not needed

function anything(...nums:number[]){
  //Now since here we have an array, we will use the array functions or use loops
  let sum:number = 0;
  for(let i=0; i<nums.length;i++){
    //let sum = 0;
    sum = sum+nums[i];
  }
  console.log(sum);
}

anything(1,23,3,5,7,6,4,4,67);

//Function for N parametes including string and numbers

function anynfuns(...para:any[]){
  for(let i=0; i<para.length;i++){
    console.log(para[i]);
  }
}
anynfuns(34,53,462,'Akash','Batham','Alien','Mars',null,undefined,true,false,1,2,3,4,5,6,7,8,9,10);

function findelements(...elements:(number|string)[]):number{
  //this will accept only string and numbers
  return elements.length;
}
console.log('the lenght is: ',findelements(1,2,3,4,5,6,7,8,9,10,"Akash",));


//Function with optional parameters

function optional(nam:string, phone:number, email?:string){
  console.log('Name: ',nam);
  console.log('Phone: ',phone);
  if(email){
    console.log('Email: ',email);
  }
}
optional('Akash',9876543210,'akash@gmail.com');
optional('Batham',9876543210);

//Function with default parameters
function discountprice(price:number, discount:number=0.5):void{
  console.log('Discount price: ',price*discount);
}
discountprice(100);
discountprice(100, 2);


//Anonymous Function or Unnamed Function
//let/const variablename = function(parameters){}

let greet = function(nam:string):void{
  console.log('Hello ', nam);
}
greet('Akash');