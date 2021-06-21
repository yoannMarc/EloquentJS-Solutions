import { SCRIPTS } from './src/scripts.js'

let arrays = [[1, 2, 3], [4, 5], [6]];

let result = arrays.reduce((a,b) => a.concat(b))

console.log(result)


function loop(value, test, update, body){
    for(let i = 0; i < value;i++) {
        if (!(test(i))) {
            body(value)
            loop(update(value),test,update,body)
            break
        }
    }
}

loop(3, n => n > 0, n => n - 1, console.log);


function every(array, test) {
    for(let i = 0;i< array.length; i++){
        if (!(test(array[i]))) return false
    }

    return true

}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true


SCRIPTS.filter(n => n.living)
//filtre
console.log(SCRIPTS.filter(n => !(n.living)))


//compte 

function countBy(array, groupName)