// Type JavaScript here and click "Run Code" or press Ctrl + s
// console.log('Hello, world!');


function createFunction() {
	function printHello() {
    console.log("hello");
  }
  
  return printHello;
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const function1 = createFunction();
// function1();



function createFunctionPrinter(input) {
	function printInput() {
    console.log(input);
  };
  
  return printInput;
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const printSample = createFunctionPrinter('sample');
// printSample();
// const printHello = createFunctionPrinter('hello');
// printHello();



function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter () {
    counter ++;
    console.log('counter', counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// willCounter();
// willCounter();
// willCounter();

// jasCounter();
// willCounter();



function addByX(x) {
	function addBy(param) {
    return param + x;
  }
  
  return addBy;
}

const addByTwo = addByX(2);

// console.log(addByTwo(1));
// console.log(addByTwo(2));
// now call addByTwo with an input of 1


// now call addByTwo with an input of 2



//--------------------------------------------------
// Extension
//--------------------------------------------------

function once(func) {
  let executed = false;
  let result;
  
  return function(param) {
    if (!executed) {
      executed = true;
      result = func(param);
      return result;
    }
    else {
      return result;
    }
  }
}

const onceFunc = once(addByTwo);

// UNCOMMENT THESE TO TEST YOUR WORK!
// console.log(onceFunc(4));  //should log 6
// console.log(onceFunc(10));  //should log 6
// console.log(onceFunc(9001));  //should log 6


function after(count, func) {
	let counter = 1;
  function returnedFunction() {
    if (counter < count) {
      counter++;
    } else {
      func();
    }
  }
  return returnedFunction;
}

const called = function() { console.log('hello') };
const afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed


function delay(func, wait) {
  let allowed = false;
	function allowFunc() {
    allowed = true;
  }
  
  function output() {
    if (!allowed) {
      setTimeout(allowFunc, wait);
    } else {
      func();
    }
  }
  
  return output;
}


function rollCall(names) {
	let counter = 0;
  function output() {
    if (counter < names.length) {
      console.log(names[counter]);
      counter++;
    } else {
      console.log("Everyone accounted for");
    }
  }
  
  return output;
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
rollCaller() // -> Should log 'Victoria'
rollCaller() // -> Should log 'Juan'
rollCaller() // -> Should log 'Ruth'
rollCaller() // -> Should log 'Everyone accounted for'