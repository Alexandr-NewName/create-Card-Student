const array = [
    {name: 'John', age: 25},
    {name: 'Alice', age: 28},
    {name: 'Bob', age: 30}
]

function sortArrayByAge(array) {
    return array.sort((a, b) => a.age - b.age);
}

function sortArrayByName(array) {
    return array.sort((a, b) => a.name.localeCompare(b.name));
}

sortArrayByName(array)
sortArrayByAge(array)
// console.log(sortArrayByAge(array)); // Output: [{name: 'Alice', age: 28}, {name: 'John', age: 25}, {name: 'Bob', age: 30}]
console.log(sortArrayByName(array)); // Output: [{name:
