import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  validate,
} from "class-validator";
import { UpdateEmployeeIn } from "../../../../core/models";
import { FieldsValidatorPort } from "../../../../core/ports";
import { formatFieldsValidationError } from "../../utils";
import { InputErrorValidation } from "../../interfaces";

export class UpdateEmployeeFieldsValidator {
  @IsString()
  @IsOptional()
  employee_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsString()
  @IsMobilePhone("pt-BR")
  @IsOptional()
  phone_number?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  constructor(data: UpdateEmployeeIn) {
    this.email = data.email;
    this.is_active = data.is_active;
    this.email;
  }
}

export class ValidateUpdateUserUseCaseInput
  implements FieldsValidatorPort<UpdateEmployeeIn>
{
  async validate(data: UpdateEmployeeIn): Promise<InputErrorValidation[]> {
    const employeeValidationFields = new UpdateEmployeeFieldsValidator(data);
    const errors = await validate(employeeValidationFields);
    const formattedErrors = formatFieldsValidationError(errors);

    return formattedErrors;
  }
}
