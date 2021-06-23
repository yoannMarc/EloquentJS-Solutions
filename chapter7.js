(function() {
    "use strict"
  
    let active = null
  
    const places = {
      "Alice's House": {x: 279, y: 100},
      "Bob's House": {x: 295, y: 203},
      "Cabin": {x: 372, y: 67},
      "Daria's House": {x: 183, y: 285},
      "Ernie's House": {x: 50, y: 283},
      "Farm": {x: 36, y: 118},
      "Grete's House": {x: 35, y: 187},
      "Marketplace": {x: 162, y: 110},
      "Post Office": {x: 205, y: 57},
      "Shop": {x: 137, y: 212},
      "Town Hall": {x: 202, y: 213}
    }
    const placeKeys = Object.keys(places)
  
    const speed = 2
  
    class Animation {
      constructor(worldState, robot, robotState) {
        this.worldState = worldState
        this.robot = robot
        this.robotState = robotState
        this.turn = 0
  
        let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument
        this.node = outer.appendChild(doc.createElement("div"))
        this.node.style.cssText = "position: relative; line-height: 0.1; margin-left: 10px"
        this.map = this.node.appendChild(doc.createElement("img"))
        this.map.src = "img/village2x.png"
        this.map.style.cssText = "vertical-align: -8px"
        this.robotElt = this.node.appendChild(doc.createElement("div"))
        this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${0.8 / speed}s;`
        let robotPic = this.robotElt.appendChild(doc.createElement("img"))
        robotPic.src = "img/robot_moving2x.gif"
        this.parcels = []
  
        this.text = this.node.appendChild(doc.createElement("span"))
        this.button = this.node.appendChild(doc.createElement("button"))
        this.button.style.cssText = "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family: sans-serif; font-size: 80%"
        this.button.textContent = "Stop"
  
        this.button.addEventListener("click", () => this.clicked())
        this.schedule()
  
        this.updateView()
        this.updateParcels()
  
        this.robotElt.addEventListener("transitionend", () => this.updateParcels())
      }
  
  
      updateView() {
        let pos = places[this.worldState.place]
        this.robotElt.style.top = (pos.y - 38) + "px"
        this.robotElt.style.left = (pos.x - 16) + "px"
  
        this.text.textContent = ` Turn ${this.turn} `
      }
  
      updateParcels() {
        while (this.parcels.length) this.parcels.pop().remove()
        let heights = {}
        for (let {place, address} of this.worldState.parcels) {
          let height = heights[place] || (heights[place] = 0)
          heights[place] += 14
          let node = document.createElement("div")
          let offset = placeKeys.indexOf(address) * 16
          node.style.cssText = "position: absolute; height: 16px; width: 16px; background-image: url(img/parcel2x.png); background-position: 0 -" + offset + "px";
          if (place == this.worldState.place) {
            node.style.left = "25px"
            node.style.bottom = (20 + height) + "px"
            this.robotElt.appendChild(node)
          } else {
            let pos = places[place]
            node.style.left = (pos.x - 5) + "px"
            node.style.top = (pos.y - 10 - height) + "px"
            this.node.appendChild(node)
          }
          this.parcels.push(node)
        }
      }
  
      tick() {
        let {direction, memory} = this.robot(this.worldState, this.robotState)
        this.worldState = this.worldState.move(direction)
        this.robotState = memory
        this.turn++
        this.updateView()
        if (this.worldState.parcels.length == 0) {
          this.button.remove()
          this.text.textContent = ` Finished after ${this.turn} turns`
          this.robotElt.firstChild.src = "img/robot_idle2x.png"
        } else {
          this.schedule()
        }
      }
  
      schedule() {
        this.timeout = setTimeout(() => this.tick(), 1000 / speed)
      }
  
      clicked() {
        if (this.timeout == null) {
          this.schedule()
          this.button.textContent = "Stop"
          this.robotElt.firstChild.src = "img/robot_moving2x.gif"
        } else {
          clearTimeout(this.timeout)
          this.timeout = null
          this.button.textContent = "Start"
          this.robotElt.firstChild.src = "img/robot_idle2x.png"
        }
      }
    }
  
    window.runRobotAnimation = function(worldState, robot, robotState) {
      if (active && active.timeout != null)
        clearTimeout(active.timeout)
      active = new Animation(worldState, robot, robotState)
    }
  })()



var roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];
  
    function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
        graph[from] = [to];
        } else {
        graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
    }
  
  var roadGraph = buildGraph(roads);
  
  var VillageState = class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p; //la parcel est sur une case non visitée
          return {place: destination, address: p.address}; //la parcel est sur la case en cours
        }).filter(p => p.place != p.address); // Si p.place == p.adress la parcel est livrée
        
        return new VillageState(destination, parcels);
      }
    }
  }
  
  function runRobot(state, robot, memory) {
    let turn
    for (turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        // console.log(`Done in ${turn} turns`);
        break;
      }

      let Robot = robot(state, memory); 
      state = state.move(Robot.direction);
      memory = Robot.memory;

      //console.log(`Moved to ${Robot.direction}`);

    }

    return turn
  }

 

  
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }
  
  VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
  


  var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  


  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }


  
  function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }
  


  function goalOrientedRobot({place, parcels}, route) { //route = memory
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }
  



// runRobotAnimation(VillageState.random(),
//   myRobot, []);



// EXERCISE 1
// Create a comparative function for robots 

function compareRobots(robot1, memory1, robot2, memory2) {
  
  let ROBOTS = {
    robot1 : {
      name: "robot 1",
      resultat : []
    },
    robot2 : {
      name: "robot 2",
      resultat : []
    } 
  }

  for(let i=0;i<100;i++){
    let testState = VillageState.random()
    ROBOTS.robot1.resultat.push(runRobot(testState,robot1,[]))
    ROBOTS.robot2.resultat.push(runRobot(testState,robot2,[]))
  
  }

  function moyenne(robot){
    let res = robot.resultat.reduce((a,b) => { return a+b }) / robot.resultat.length
    console.log(robot.name + " : " + res + "%")
  }

  moyenne(ROBOTS.robot1)
  moyenne(ROBOTS.robot2)
  
}

console.log("robot 1 = routeRobot || robot 2 = goalOrientedRobot")
compareRobots(routeRobot, [], goalOrientedRobot, []);



// EXERCISE 2

function myRobot({place, parcels},route) {

      
  if (route.length == 0) {
    let pickupRoute = []
    let deliveryRoute = []
    
    for (let parcel of parcels) {
        if (parcel.place != place) pickupRoute.push(findRoute(roadGraph,place,parcel.place))
        else deliveryRoute.push(findRoute(roadGraph,place,parcel.address))
    }

    const reducer = (a,b)=> { return ((a.length >= b.length) ? b : a) }
    let bestPickup = ((pickupRoute.length==0) ? [] : pickupRoute.reduce(reducer))
    let bestDelivery = ((deliveryRoute.length==0) ? [] : deliveryRoute.reduce(reducer))

    
    if (bestPickup.length == 0) route = bestDelivery // no parcel to deliver
    else if (bestDelivery.length == 0) route = bestPickup // no parcel has been pickedup
    else route = ((bestPickup.length <= bestDelivery.length) ? bestPickup : bestDelivery)
    

  }

  return {direction: route[0], memory: route.slice(1)};

}


//improvement after eloquentJS solution
// => one variable

 function myRobotv2({place, parcels},route) {

      
   if (route.length == 0) {
     
    
     // SAME AS MAP
     let routes = []
     for (let parcel of parcels) {
         if (parcel.place != place) routes.push({route : findRoute(roadGraph,place,parcel.place), pickUp : true })
         else routes.push({route : findRoute(roadGraph,place,parcel.address), pickUp: false})
     }

     function score({route, pickUp}) {
       return ((pickUp ? -0.5 : 0) + route.length)
     }
    
     route = routes.reduce((a,b)=> { return (score(a) < score(b) ? a : b)}).route

   }

   return {direction: route[0], memory: route.slice(1)};

 }


// ELOQUENT JS SOLUTION

function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}



console.log("Robot 1 = myRobot || robot 2 = goalOrientedRobot")
compareRobots(myRobot,[],goalOrientedRobot,[])

console.log("Robot 1 = myRobot || robot 2 = lazyRobot")
compareRobots(myRobot,[],lazyRobot,[])

console.log("Robot 1 = myRobotv2 || robot 2 = lazyRobot")
compareRobots(myRobotv2,[],lazyRobot,[])


//EXERCISE 3

class PGroup {
  constructor(goup){
    this.group = goup
   
  }
  
  add(value) {
      if (this.has(value)) return this
      return new PGroup(this.group.concat([value]))
  }
  

  delete(value) {
       if (this.has(value)) return new PGroup(this.group.filter(p => p !== value))
       return this
         
       
  }

  has(value){
      return this.group.includes(value)
 
  }


}

PGroup.empty = new PGroup([])

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

 console.log(b.has("b"));
 // → true
 console.log(a.has("b"));
 // → false
 console.log(b.has("a"));
 // → false









































