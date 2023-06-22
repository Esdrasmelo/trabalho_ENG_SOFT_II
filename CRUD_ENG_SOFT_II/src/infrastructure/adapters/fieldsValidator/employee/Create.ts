import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidationError,
  validate,
} from "class-validator";
import { FieldsValidatorPort } from "../../../../core/ports/fieldsValidator/FieldsValidator";
import { CreateEmployeeIn } from "../../../../core/models";
import { formatFieldsValidationError } from "../../utils";
import { InputErrorValidation } from "../../interfaces";

class CreateEmployeeFieldsValidator {
  @IsString()
  employee_name!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword({
    minLength: 8,
  })
  password!: string;

  @IsNumber()
  salary!: number;

  @IsMobilePhone("pt-BR")
  @IsString()
  phone_number!: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  constructor(data: CreateEmployeeIn) {
    this.email = data.email;
    this.password = data.password;
    this.phone_number = data.phone_number;
    this.salary = data.salary;
    this.is_active = data.is_active;
    this.employee_name = data.employee_name;
  }
}

export class ValidateCreateUserUseCaseInput
  implements FieldsValidatorPort<CreateEmployeeIn>
{
  async validate(data: CreateEmployeeIn): Promise<InputErrorValidation[]> {
    const employeeValidationFields = new CreateEmployeeFieldsValidator(data);
    const errors = await validate(employeeValidationFields);
    const formattedErrors = formatFieldsValidationError(errors);

    return formattedErrors;
  }
}
