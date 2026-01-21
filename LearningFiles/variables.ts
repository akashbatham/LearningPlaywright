//This is a global variable and can be used in all the files 
export var a = 10;
export let username = 'Akash'; //Export is used to make the variable accessible outside the file.
export let userage = 32; //let is block-scoped → it only exists inside the { } where you created it.  So, it is not accessible outside the { } where you created it.
export const baseurl = 'https://www.google.com'; //this is a constant variable and cannot be changed.

console.log('Name: ', username);
console.log('Age: ', userage);

username = 'Batham';
userage = 33;

//if const holds an object/array, you can change its contents, just not reassign the variable itself
export const arr = ['Akash', 'Batham', 'Alien'];
arr.push('Mars');
//arr = ['Akash', 'Batham', 'Alien', 'Mars']; //this will give an error because const cannot be reassigned.

// Use const for:
// baseURL
// selectors
// fixed test data

// Use let for:
// values that change during test
// flags, counters, temporary results

//=====================================================

//String - anything inside "",'',`` is termed as string.
//uname: string = 'Akash'; //if you don't use let it will be treated as a global variable.
let usname: string = 'Akash'; //if you use let it will be treated as a local variable.
let password: string = "Bakash12";
export let message: string = `Hello ${usname}, your password is ${password}`;

//👉 Used for:
//URLs
//usernames / passwords
//visible text you assert in UI

//const loginHeader: string = "Login to your account";
//await expect(page.getByText(loginHeader)).toBeVisible();

//=====================================================

//Number - int/float everything is termed as a number.
let n:number = 10;
let m:number = 10.5;

/*
DATA TYPES
let username: string = "admin";
let age: number = 30;
let isLoggedIn: boolean = false;

Type	Used For
string	text, URLs, messages
number	timeouts, counts
boolean	true/false checks
*/