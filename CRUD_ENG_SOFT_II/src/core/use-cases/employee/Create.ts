import { BaseUseCase } from "../base";
import { CreateEmployeeIn, EmployeeModel } from "../../models";
import {
  HashDataPort,
  EmployeeRepositoryPort,
  FieldsValidatorPort,
} from "../../ports";
import { randomUUID } from "crypto";
import {
  HttpResponseOut,
  badRequestResponse,
  createdResponse,
  internalServerErrorResponse,
} from "../../protocols";
import { excludeFields } from "../../utils/ExcludeFields";

export class CreateEmployeeUseCase implements BaseUseCase<CreateEmployeeIn> {
  constructor(
    private employeeRepositoryPort: EmployeeRepositoryPort,
    private hashDataPort: HashDataPort,
    private fieldsValidatorPort: FieldsValidatorPort<
      Omit<CreateEmployeeIn, "id">
    >
  ) {}

  async execute(data: Omit<CreateEmployeeIn, "id">): Promise<HttpResponseOut> {
    try {
      const { password, ...fields } = data;

      const fieldsValidationErrors = await this.fieldsValidatorPort.validate(
        data
      );

      if (fieldsValidationErrors.length)
        return badRequestResponse(fieldsValidationErrors);

      const hashedPassword = this.hashDataPort.hash(password);

      const id = randomUUID();

      const assembleEmployeeObject: CreateEmployeeIn = {
        password: hashedPassword,
        ...fields,
        id,
      };

      const createdEmplyee = await this.employeeRepositoryPort.create(
        assembleEmployeeObject
      );

      const dataExcludedFields = excludeFields(["password"], createdEmplyee);

      return createdResponse(dataExcludedFields);
    } catch (error: any) {
      return internalServerErrorResponse(`Error: ${error.message}`);
    }
  }
}
