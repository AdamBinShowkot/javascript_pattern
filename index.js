// Carrying Function

// Basic Curry

function added(a,b,c){
    return a+b+c;
}
console.log(added(4,5,6));

function curryAdded(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(curryAdded(4)(5)(6));

// Example Curry With E-commerce 

function discount(price,disc){
    return price-price*disc;
}

console.log(discount(500,.1)); // For Person One
console.log(discount(800,.1)); // For Person Two
console.log(discount(500,.1)); // For Person Three

// We can see discount amount is common here..but we are always pass discount value .
// So how to we can pass discount amount one time and use that many time?
// Let's see bellow...


function curriedDiscount(disc){
    return function(price){
        return price-price*disc;
    }
}

const tenPercentDiscount=curriedDiscount(.1); // Partial Function
const twentyPercentDiscount=curriedDiscount(.2); // Partial Function

console.log(tenPercentDiscount(600)) // For person one
console.log(tenPercentDiscount(700)) // For person two
console.log(tenPercentDiscount(800)) // For person three

console.log(twentyPercentDiscount(1100)) // For person four
console.log(twentyPercentDiscount(1200)) // For person five



// Curry converter function

function curry(func){
    return function curried(...args){
        if(args.length>=func.length){
            return func.apply(this,args);
        }else{
            return function(...args2){
                return curried.apply(this,args.concat(args2));
            }
        }
    }
}

function sum(a,b,c){
    return a+b+c;
}

let curriedSum=curry(sum);

console.log(curriedSum(1,2,3));
console.log(curriedSum(1)(2,5));
console.log(curriedSum(1)(2)(9));

// Curry with loadash
const _=require('lodash');

// Basic Example

let lodashCurry=_.curry(sum);
console.log(lodashCurry(5,6,3));
console.log(lodashCurry(4)(8,6));

// More Example
function log(date,importance,message){
    console.log(`
    ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} :
    ${importance} : ${message}
    `)
}


let curriedLog=_.curry(log);

curriedLog(new Date(),'DEBUG','some debug');
curriedLog(new Date())("DEBUG")("Some Debug");
setTimeout(()=>{
    let logNow=curriedLog(new Date());
    logNow("INFO","info message");
},1000);

