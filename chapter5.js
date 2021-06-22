import { SCRIPTS } from './src/scripts.js'

//EXERCICE 1 

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


//EXERCICE 2

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        // console.log("item : "+item)
      let name = groupName(item);
    //   console.log("name : " + name)
      let known = counts.findIndex(c => c.name == name);
      if (known == -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }


  function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        // console.log("script : ");
        // console.log(script)
        return script;
        
      }
    }
    return null;
  }
  

//   function textScripts(text) {
//     let scripts = countBy(text, char => {
//       let script = characterScript(char.codePointAt(0));
//       return script ? script.name : "none";
//     }).filter(({name}) => name != "none");
  
//     let total = scripts.reduce((n, {count}) => n + count, 0);
//     if (total == 0) return "No scripts found";
  
//     return scripts.map(({name, count}) => {
//       return `${Math.round(count * 100 / total)}% ${name}`;
//     }).join(", ");
//   }


//   console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

  function dominantDirection(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
    

    if (scripts.length == 0) return 'No scripts found'

    let result = scripts.reduce(
        (a,b) => { return (a.count < b.count) ? b : a })

    return result.name
    // return scripts.reduce((a,b) => { return (a.count < b.count) ? b : a }).name
  
  }


console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl