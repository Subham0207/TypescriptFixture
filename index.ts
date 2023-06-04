import { generateFixture, FixtureParam } from "./fixture";

class Box{
  size: string;

  constructor(
    @FixtureParam(String)size: string,
  )
  {
    this.size = size
  }
}

class Person {
  name: string;
  age: number;
  m_box: Box;

  constructor(
    @FixtureParam(String) name: string, 
    @FixtureParam(Number) age: number,
    @FixtureParam(Box) box: Box,
  ) {
    this.name = name;
    this.age = age;
    this.m_box = box;
  }
}

//Accessing the FixtureParam metadata
// console.log("metadata for Box: ",Reflect.getMetadata('fixture:params', Box.prototype.constructor))
// console.log("metadata for Person: ",Reflect.getMetadata('fixture:params', Person.prototype.constructor))

const obj = generateFixture(Person);
console.log(obj);