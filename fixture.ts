import { faker } from '@faker-js/faker';
import 'reflect-metadata';

// Recursive fixture generation function
import 'reflect-metadata';

export function generateFixture<T>(cls: new (...args: any[]) => T): T {
  const instance = new cls();
  const keys = Object.getOwnPropertyNames(instance);

  keys.forEach((key) => {
    const metadataKey = 'design:type';
    const memberType = Reflect.getMetadata(metadataKey, cls.prototype, key);

    if (memberType) {
      (instance as any)[key] = generateRandomValue(memberType);
    }
  });

  return instance;
}


// Generate random values based on member types
function generateRandomValue(memberType: any): any {
  if (memberType === String) {
    return faker.lorem.word();
  } else if (memberType === Number) {
    return faker.number.float({ min: 0, max: 100, precision: 0.01 });
  } else if (memberType === Boolean) {
    return faker.datatype.boolean();
  } else if (memberType === Date) {
    return faker.date.recent();
  } else {
    return generateFixture(memberType);
  }
}
