
function range(start, end,range=1) {
    let res = []
    let i = start
    
    if (range === 0) return NaN
    if (range > 0) {
        for (;i<=end;i+=range){
            res.push(i)
        }
    } else {
        for(;i>=end;i+=range){
            res.push(i)
        }
    }
    return res

}



function sum(tab) {
    let res = 0
   
    for (let num of tab) {
        res += +num
    }
    return res
}

console.log(range(1,10))
console.log(range(5,1,-1))
console.log(sum(range(1,10)))


function reverseArray(tab) {
    let res = []
    let i = tab.length - 1
    for(; i >= 0;i--) {
        console.log('i = '+i)
        res.push(tab[i])
    }
    return res
}

function reverseArrayInPlace(tab) {
    let test = Math.floor(tab.length/2)
    console.log(tab.length/2 + " floor : "+test)
    let save = 0
    let endId = 0 


    for(let i = 0;i<test;i++){
        endId = tab.length-i-1
        save = tab[endId]

        console.log('i = '+i)

        tab[endId] = tab[i]
        tab[i] = save
        

    }



}
console.log(reverseArray(['A','B','C']))

let tab1 = [1,2,3,4,5]
let tab2 = [1,2,3,4,5,6,7,8,9]

reverseArrayInPlace(tab1)
reverseArrayInPlace(tab2)

console.log('tab1 = '+tab1)
console.log('tab2 = '+tab2)


function arrayToList(tab) {
    let res
   
    for(i=tab.length-1;i>=0;i--) {
         if (res == undefined) res = {value:tab[i], rest: null}
         else res = {value:tab[i], rest: res}
     
    }

    return res

}

function listToArray(list, res=[]){

        if (list.rest === null) return res.push(list.value)     
        else {
            res.push(list.value)
            listToArray(list.rest,res)
        }   
        
        return res
}


function nth(list,n,compteur=1){
    let res = undefined
    if (n==compteur) res = list.value
    else if (list.rest == null) return undefined
    else res = nth(list.rest,n,compteur+1)
    
    return res

}


console.log(JSON.stringify(arrayToList([1,2,3,4,5,6])))
console.log(listToArray(arrayToList([1,2,3,4,5,6])))

console.log(nth(arrayToList([10,20,30]),1))
console.log(nth(arrayToList([10,20,30]),2))
console.log(nth(arrayToList([10,20,30]),3))



function deepEqual(obj1, obj2) { 
       
    if ((typeof obj1 == "object" && obj1 != null) && (typeof obj2 == "object" && obj2 != null)) {
        const obj1_keys = Object.keys(obj1)    
        const obj2_keys = Object.keys(obj2)

        if (obj1_keys.length != obj2_keys.length) return false
        

        for(i=0;i < obj1_keys.length;i++){
            if (obj1_keys[i] != obj2_keys[i]) return false
            if (!deepEqual(obj1[obj2_keys[i]],obj2[obj2_keys[i]])) return false


        }


    } else {
        return (obj1 === obj2)
    } 
    
    
    return true

    

 
}

let object = { here:"here", object:"object", testObject: { test:"test", test2:"test2"} } 


console.log(deepEqual(
    { here:"here", object:"object", testObject: { test:"test", test2:"test2"} } ,
    { here:"here", object:"object", testObject: { test:"test", test2:"test3"} } )
    )
    let obj = {here: {is: "an"}, object: 2};
    console.log(deepEqual(obj, obj));
    // → true
    console.log(deepEqual(obj, {here: 1, object: 2}));
    // → false
    console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
    // → true

