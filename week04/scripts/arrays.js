let names = ['Nancy','Blessing','Jorge','Svetlana','Bob'];

// array.filter() method creates a new array with all elements 
// that pass the test implemented by the provided function.
let nameWithLetterB = names.filter(name => name.charAt(0) === 'B');
console.log(nameWithLetterB); // Output: [ 'Blessing', 'Bob' ]

//The array.map() method iterates through each element of the original array using a given function and produces a new array. 
// The original array is not modified
let nameLengths = names.map(name => name.length);
console.log(nameLengths); // Output [ 5, 8, 5, 8, 3]

//The array.reduce() method is used to reduce the array to a single value. It executes a reducer function on each element of the array, 
// resulting in a single output value. 

names.reduce((total, name) => total + name.length, 0) / names.length; // Output: 5.8