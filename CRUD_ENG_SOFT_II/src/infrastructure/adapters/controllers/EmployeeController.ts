import { CreateEmployeeIn, UpdateEmployeeIn } from "../../../core/models";
import { HttpResponseOut } from "../../../core/protocols";
import {
  CreateEmployeeUseCase,
  GetAllEmployeesUseCase,
  GetEmployeeByIdUseCase,
  UpdateEmployeeUseCase,
} from "../../../core/use-cases/employee";
import { DeleteEmployeeUseCase } from "../../../core/use-cases/employee/Delete";

export class EmployeeController {
  constructor(
    private createEmployeeUseCase: CreateEmployeeUseCase,
    private getAllEmployeesUseCase: GetAllEmployeesUseCase,
    private updateEmployeeUseCase: UpdateEmployeeUseCase,
    private deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private getEmployeeByIdUseCase: GetEmployeeByIdUseCase
  ) {}

  async createEmployee(
    data: Omit<CreateEmployeeIn, "id">
  ): Promise<HttpResponseOut> {
    return this.createEmployeeUseCase.execute(data);
  }

  async getAllEmployees(): Promise<HttpResponseOut> {
    return this.getAllEmployeesUseCase.execute();
  }

  async getEmployeeById(id: string) {
    return this.getEmployeeByIdUseCase.execute(id);
  }

  async updateEmployee(data: UpdateEmployeeIn) {
    return this.updateEmployeeUseCase.execute(data);
  }

  async deleteEmployee(id: string) {
    return this.deleteEmployeeUseCase.execute(id);
  }
}
