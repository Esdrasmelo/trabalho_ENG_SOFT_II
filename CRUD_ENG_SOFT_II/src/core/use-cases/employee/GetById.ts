import { EmployeeRepositoryPort } from "../../ports";
import {
  HttpResponseOut,
  internalServerErrorResponse,
  notFoundResponse,
  okResponse,
} from "../../protocols";
import { excludeFields } from "../../utils/ExcludeFields";
import { BaseUseCase } from "../base";

export class GetEmployeeByIdUseCase implements BaseUseCase<string> {
  constructor(private employeeRepositoryPort: EmployeeRepositoryPort) {}

  async execute(id: string): Promise<HttpResponseOut> {
    try {
      const employee = await this.employeeRepositoryPort.getById(id);

      if (!employee) return notFoundResponse(employee);

      const dataExcludedFields = excludeFields(["password"], employee);

      return okResponse(dataExcludedFields);
    } catch (error: any) {
      return internalServerErrorResponse(error.message);
    }
  }
}
