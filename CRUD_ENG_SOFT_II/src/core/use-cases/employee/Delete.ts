import { EmployeeDontExists } from "../../exceptions";
import { EmployeeRepositoryPort } from "../../ports";
import {
  HttpResponseOut,
  internalServerErrorResponse,
  notFoundResponse,
  okResponse,
} from "../../protocols";
import { excludeFields } from "../../utils/ExcludeFields";
import { BaseUseCase } from "../base";

export class DeleteEmployeeUseCase implements BaseUseCase<string> {
  constructor(private employeeRepositoryPort: EmployeeRepositoryPort) {}

  async execute(id: string): Promise<HttpResponseOut> {
    try {
      const employeeExists = await this.employeeRepositoryPort.getById(id);

      if (!employeeExists)
        return notFoundResponse(new EmployeeDontExists().message);

      const deletedEmployee = await this.employeeRepositoryPort.deleteById(id);

      const dataExcludedFields = excludeFields(["password"], deletedEmployee);

      return okResponse(dataExcludedFields);
    } catch (error: any) {
      return internalServerErrorResponse(error.message);
    }
  }
}
