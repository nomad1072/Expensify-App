const address = ['1062/1', "Bangalore", "Karnataka", "560097"];
// const address = []
const [, city, state = "New York"] = address

console.log(`You are in ${state} ${city}.`);