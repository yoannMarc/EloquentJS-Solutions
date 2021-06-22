// EXERCICE 1

class Vec {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    plus(newVec) {
        this.x += newVec.x
        this.y += newVec.y

        return this

    }

    minus(newVec) {
        this.x -= newVec.x
        this.y -= newVec.y

        return this

    }

    get length() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }

}




console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


// EXERCICE 2

class Group {
    constructor() {
        this.group = []
        this.index = 0;
    }

    add(value) {
        if (!this.has(value)) this.group.push(value)
    }

    delete(value) {
   
        if (this.has(value)) this.group.splice(
                                        this.group.indexOf(value),1)
    }

    has(value){
        return (this.group.indexOf(value) >= 0)
        // return this.members.includes(value);
    }

    static from(items) {
        let newGroup = new Group

        for (const item of items) {
            newGroup.add(item)
        }

        return newGroup
        

    }

    next() {
        if (this.index === this.group.length) return {done: true}
      
        let value = this.group[this.index]
        this.index++
       
        return {value, done:false}
    }
  
    [Symbol.iterator] () {
        return this
    }
}


let group = Group.from([10, 20]);

console.log(group.has(10));
 // → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


//EXERICE 3

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c


//EXERCICE 4

let map = {one: true, two: true, hasOwnProperty: true};


hasOwnProperty.call(map, "one")

// Fix this call
console.log(hasOwnProperty.call(map, "one"));
// → true
 
