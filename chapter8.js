//EXERCISE 1 

class MultiplicatorUnitFailure extends Error{}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
      return a * b;
    } else {
      throw new MultiplicatorUnitFailure("Klunk");
    }
  }
  
  function reliableMultiply(a, b) {

    for(;;) {
        try {
            return primitiveMultiply(a,b)
        } catch(e) {
            if (e instanceof MultiplicatorUnitFailure) console.log("error Klunk")
            else throw e
        }
    }
  }
  
  console.log(reliableMultiply(8, 8));
  // → 64


  //EXERCISE 2 


  const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
    if (!box.locked) return body()

    try {
        box.unlock()
        body()
        box.lock()
    }catch(e){
        console.log("error :" + e)
    }finally {
       box.lock()
    }
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  console.log(box.locked);
  // → true