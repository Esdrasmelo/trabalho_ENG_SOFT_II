import { EmployeeDontExists } from "../../exceptions";
import { UpdateEmployeeIn } from "../../models";
import { EmployeeRepositoryPort, FieldsValidatorPort } from "../../ports";
import {
  HttpResponseOut,
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
  okResponse,
} from "../../protocols";
import { excludeFields } from "../../utils/ExcludeFields";
import { BaseUseCase } from "../base";

export class UpdateEmployeeUseCase implements BaseUseCase<UpdateEmployeeIn> {
  constructor(
    private employeeRepositoryPort: EmployeeRepositoryPort,
    private fieldsValidatorPort: FieldsValidatorPort<UpdateEmployeeIn>
  ) {}

  async execute(data: UpdateEmployeeIn): Promise<HttpResponseOut> {
    try {
      const fieldsValidationErrors = await this.fieldsValidatorPort.validate(
        data
      );

      if (fieldsValidationErrors.length)
        return badRequestResponse(fieldsValidationErrors);

      const { id, ...fields } = data;

      const employeeExists = await this.employeeRepositoryPort.getById(id!);

      if (!employeeExists)
        return notFoundResponse(new EmployeeDontExists().message);

      const updatedEmployee = await this.employeeRepositoryPort.update(
        id!,
        fields
      );

      const dataExcludedFields = excludeFields(["password"], updatedEmployee);

      return okResponse(dataExcludedFields);
    } catch (error: any) {
      return internalServerErrorResponse(error.message);
    }
  }
}
