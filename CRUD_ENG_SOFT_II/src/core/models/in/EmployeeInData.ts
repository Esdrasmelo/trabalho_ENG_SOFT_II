import { EmployeeModel } from "../Employee";

export interface CreateEmployeeIn extends EmployeeModel {}

export interface UpdateEmployeeIn extends Omit<Partial<CreateEmployeeIn>, "password"> {}
