import { BaseUseCase } from "../base";
import { CreateEmployeeIn } from "../../models";
import { EmployeeRepositoryPort } from "../../ports";
import {
  HttpResponseOut,
  internalServerErrorResponse,
  notFoundResponse,
  okResponse,
} from "../../protocols";
import { excludeFields } from "../../utils/ExcludeFields";

export class GetAllEmployeesUseCase implements BaseUseCase<CreateEmployeeIn> {
  constructor(private employeeRepositoryPort: EmployeeRepositoryPort) {}

  async execute(): Promise<HttpResponseOut> {
    try {
      const getAllEmployees = await this.employeeRepositoryPort.getAll();

      if (!getAllEmployees.length) return notFoundResponse(getAllEmployees);

      const dataExcludedFields = excludeFields(["password"], getAllEmployees);

      return okResponse(dataExcludedFields);
    } catch (error: any) {
      return internalServerErrorResponse(error.message);
    }
  }
}
