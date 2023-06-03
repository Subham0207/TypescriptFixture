import { generateFixture, FixtureParam, FixtureClass } from "./fixture";

@FixtureClass()
class Box{
  size: string;

  constructor(
    @FixtureParam(String)size: string,
  )
  {
    this.size = size
  }
}

@FixtureClass()
class Person {
  name: string;
  age: number;
  m_box: Box;

  constructor(
    @FixtureParam(String) name: string, 
    @FixtureParam(Number) age: number,
    @FixtureParam(Box) box: Box
  ) {
    this.name = name;
    this.age = age;
    this.m_box = box;
  }
}


const obj = generateFixture(Person);
console.log(obj);