


        function pyramide(chaine,longueur) {
            if (chaine.length < longueur) {
               if (chaine.length === 1) console.log(chaine)
                console.log(chaine += chaine[0])
                pyramide(chaine,longueur)
            }
           
       }

       function  fizzBuzz(end){
          for(n=1;n<=end;n++){
               if(!(n%3)) console.log('Fizz')
               else if(!(n%5)) console.log('Buzz')
               else console.log(n)    
           
           }
          
          

       }

       function  fizzAndBuzz(end){
          for(n=1;n<=end;n++){
               if(!(n%3)) {
                   if(!(n%5)) console.log('FizzBuzz')
                   else console.log('Fizz')
               } else if (!(n%5)) console.log('Buzz')
                 else console.log(n)    
           
           }
          
          

       }

       function chessBoard(length) {
           const white = ' '
           const black = '#'
           
           let ligneImpaire = creerLigne(white,black,length)
           let lignePaire  = creerLigne(black,white,length)
       
           const result = document.getElementById('result');
           
           for (i=1;i<=length;i++){
           if(i%2) addP(result,ligneImpaire)
           else addP(result,lignePaire)
           }
       }

       function creerLigne(coul1,coul2,length) {
           let res = '|'
           for(i=1;i<=length;i++) {
               if((i%2)) res += coul1
               else res += coul2 
           }
           return res + '|'
       }
      
       function addP(parent,text){
           let para = document.createElement('p')
           if (text){
               para.appendChild(document.createTextNode(text))
               if (parent){
                   parent.appendChild(para)
               }
           }
   
       }

       function multiplier(factor) {
           return number => number * factor;
       }

       function findSolution(target) {
           function find(current, history) {
               if (current == target) {
                   return history;
               } else if (current > target) {
                   return null;
               } else {
                   return find(current + 5, `(${history} + 5)`) ||
                           find(current * 3, `(${history} * 3)`);
               }
           }
           return find(1, "1");
       }

       console.log(findSolution(24))

       //pyramide('#',7)
       //console.log(`***************************************\nSPACE\n***************************************`)
       //fizzBuzz(100)
       //fizzAndBuzz(100)
       //console.log(`***************************************\nSPACE\n***************************************`)
       //chessBoard(12)
