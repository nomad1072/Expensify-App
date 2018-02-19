var obj = {
  name: "Siddharth",
  age: "25",
  loc: "Bangalore"
};

console.log('Object1: ', obj);

var obj1 = {
  ...obj,
  name: "Nithn"
}

console.log('Object2: ', obj1);