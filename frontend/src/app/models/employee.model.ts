import { Adapter } from './adapter';

export class Employee implements Adapter<Employee> {
  name: string;
  email: string;

  adapt(item: any): Employee {
    Object.assign(this, item);
    return this;
  }
}
