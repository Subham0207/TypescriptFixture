import { generateFixture } from "./fixture";
import 'reflect-metadata';

class Person {
  @Reflect.metadata('design:type', String)
  name: string;

  @Reflect.metadata('design:type', Number)
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}


const obj = generateFixture(Person);
console.log(obj);