console.log('DEMO', 'lastIindexOf');

var a = [1, 2, 2, 3];

console.log('case 1');
console.log(indexOf(a, 2));
// 2

var pets = ['cat', 'dino','dog', 'bat', 'dino'];

console.log('case 2');
console.log(indexOf(pets, 'dino'));
// 4

console.log('case 3');
console.log(indexOf(pets, 'dino', 2));
// 4

console.log('case 4');
console.log(indexOf(pets, 'hello', 1));
// -1

console.log('\n');