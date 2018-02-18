console.log('Destructuring');

const person = {
  name: 'Siddharth',
  age: 25,
  location: {
    city: 'Bangalore',
    temp: 32
  }
};

const { name: firstName = "Anonymous", age, location: loc } = person;

console.log(`${firstName} is ${age}, from ${loc.city}`);

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    //name: 'Penguin'
  }
};

const { name = "Self Published" } = book.publisher

console.log(`${name}`);