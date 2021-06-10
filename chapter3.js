
function min(a,b) {
    return Math.min(a,b)
}



console.log("Resultat minimum entre 0 et 10 : "+min(0,10))
console.log("Resultat minimum entre 0 et -10 : "+min(0,-10))


function isEven(a) {
    if (a < 0) return undefined
    else if (a === 0) return true
    else if (a === 1) return false
    else return isEven(a -2)

}

console.log("esPaire? 50 :"+isEven(50))
console.log("esPaire? 75 :"+isEven(75))
console.log("esPaire? -1 :"+isEven(-1))


function countBs(string) {
    let count = 0
    for(i=0;i<string.length;i++){
        if (string[i]==='B') count++
    }
    return count
}

console.log('nombre de B dans BBC :'+countBs('BBC'))
console.log('nombre de B dans BBC :'+countBs('BAC'))
console.log('nombre de B dans BBC :'+countBs('AAC'))


function countChar(string,char){
    let count = 0
    for(i=0;i<string.length;i++){
        if (string[i]===char) count++
    }
    return count
}

console.log('nombre de k dans kakkerlak :'+countChar('kakkerlak','k'))