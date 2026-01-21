//in arrow functions, we don't use the function keyword
//we use the arrow operator => to define the function
//the syntax is: (parameters) => {function body}
//let vairable = (parameters) => {function body}

//Without parameter
let agree = ():void =>{
    console.log("agree");
}
agree();

//with parameter and return value
let add = (a:number, b:number):number =>{
    return a+b;
}
console.log('The sum is: ',add(2,5));

//if we have single return statement then return and curly braces are optional

let mul = (a:number,b:number):number => a*b;
//THIS IS CALLED IMPLICIT RETURN
console.log('The product is: ',mul(2,5));



//aync await code
let thisfunc = async () =>{

}


//waitForResponse callback

  