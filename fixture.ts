import { faker } from '@faker-js/faker';
import 'reflect-metadata';

// Recursive fixture generation function
export function generateFixture<T>(cls: new (...args: any[]) => T): T {
  const isFixtureClass = Reflect.getMetadata('fixture:isFixtureClass', cls);
  if (!isFixtureClass) {
    throw new Error(`Class ${cls.name} is not a fixture class. Did you forget to add the @FixtureClass decorator?`);
  }

  const paramData: any[] = Reflect.getMetadata('fixture:params', cls.prototype.constructor) || [];
  console.log(`Metadata for ${cls.name}:`, paramData);

  const params = new Array(Math.max(...paramData.map(p => p.index)) + 1);
  for (const { index, type } of paramData) {
    if (isPrimitiveType(type)) {
      params[index] = generateRandomValue(type);
    } else {
      params[index] = generateFixture(type);
    }
  }

  return new cls(...params);
}

export function FixtureParam(type: Function): ParameterDecorator {
  return (target, _, parameterIndex) => {
    const existingParams: any[] = Reflect.getMetadata('fixture:params', target) || [];
    existingParams.push({ index: parameterIndex, type });
    Reflect.defineMetadata('fixture:params', existingParams, target);
  };
}


export function FixtureClass(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('fixture:isFixtureClass', true, target);
  };
}

function isPrimitiveType(paramType: any): boolean {
    return paramType === String || paramType === Number || paramType === Boolean;
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
