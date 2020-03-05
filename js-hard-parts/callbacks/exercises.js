// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));


// Challenge 2
function addS(word) {
	return word + "s";
}

// uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
  let newArray = [];
	for (let i = 0 ; i < array.length ; i++) {
    newArray[i] = callback(array[i]);
  }
  return newArray;
}

console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
	for (let i = 0 ; i < array.length ; i++) {
    callback(array[i]);
  }
}

// see for yourself if your forEach works!
let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, function(char) {
  alphabet += char;
});
console.log(alphabet);


//--------------------------------------------------
// Extension
//--------------------------------------------------

//Extension 1
function mapWith(array, callback) {
  let newArray = [];
	forEach(array, function(value) {
    newArray.push(callback(value));
  });
  return newArray;
}

console.log(mapWith([1, 2, 3], addTwo));

//Extension 2
function reduce(array, callback, initialValue) {
	let result = initialValue;
  forEach(array, function(value) {
    result = callback(result, value);
  });
  return result;
}

const nums = [4, 1, 3];
const add = function(a, b) { return a + b; }
console.log(reduce(nums, add, 0));   //-> 8

//Extension 3
function intersection(arrays) {
  let result;
  
  function keep(array1, array2) {
    return array1.filter(value => array2.includes(value));
  }
  
  result = reduce(arguments, keep, arguments[0]);
  return result;
}

console.log(intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]));
// should log: [5, 15]


//Extension 4
function union(arrays) {
  let result;
  
  function push(array1, array2) {
    let returnArray = Array.from(array1);
    forEach(array2, function(value) {
      if (!returnArray.includes(value)) {
        returnArray.push(value);
      }
    });
    return returnArray;
  }
  
  result = reduce(arguments, push, arguments[0]);
  return result;
}
console.log("Extension 4 tests:");
console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

//Extension 5
function objOfMatches(array1, array2, callback) {
  let result = {};
	array1.forEach(function(value, index) {
    if (callback(value) == array2[index]) {
      result[value] = array2[index];
    }
  });
  return result;
}

console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

//Extension 6
function multiMap(arrVals, arrCallbacks) {
	let result = {};
  arrVals.forEach(function(value) {
    result[value] = [];
    arrCallbacks.forEach(function(callback) {
      result[value].push(callback(value));
    });
  });
  return result;
}

console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


//Extension 7
function objectFilter(obj, callback) {
	let result = {};
  for (let key in obj) {
    console.log(obj[key]);
    console.log(callback(key));
    if (obj[key] == callback(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

const cities = {
London: 'LONDON',
LA: 'Los Angeles',
Paris: 'PARIS',
};
console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}