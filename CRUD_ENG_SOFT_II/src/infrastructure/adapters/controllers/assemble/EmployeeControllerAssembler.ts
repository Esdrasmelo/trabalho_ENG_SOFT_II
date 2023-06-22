import {
  CreateEmployeeUseCase,
  GetAllEmployeesUseCase,
  GetEmployeeByIdUseCase,
  UpdateEmployeeUseCase,
} from "../../../../core/use-cases/employee";
import { DeleteEmployeeUseCase } from "../../../../core/use-cases/employee/Delete";
import { EmployeeRepositoryAdapter } from "../../database/prisma/repository/EmployeeRepositoryAdapter";
import { ValidateUpdateUserUseCaseInput } from "../../fieldsValidator";
import { ValidateCreateUserUseCaseInput } from "../../fieldsValidator/employee/Create";
import { HashDataAdapter } from "../../hashData";
import { EmployeeController } from "../EmployeeController";

export const employeeControllerAssembler = (): EmployeeController => {
  const employeeRepositoryImplementation = new EmployeeRepositoryAdapter();
  const hashData = new HashDataAdapter();
  const validateInputCreateUseCase = new ValidateCreateUserUseCaseInput();
  const validateInputUpdateUseCase = new ValidateUpdateUserUseCaseInput();

  const createEmployeeUseCase = new CreateEmployeeUseCase(
    employeeRepositoryImplementation,
    hashData,
    validateInputCreateUseCase
  );
  const getAllEmployeesUseCase = new GetAllEmployeesUseCase(
    employeeRepositoryImplementation
  );
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(
    employeeRepositoryImplementation,
    validateInputUpdateUseCase
  );
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(
    employeeRepositoryImplementation
  );
  const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase(
    employeeRepositoryImplementation
  );

  const employeeController = new EmployeeController(
    createEmployeeUseCase,
    getAllEmployeesUseCase,
    updateEmployeeUseCase,
    deleteEmployeeUseCase,
    getEmployeeByIdUseCase
  );

  return employeeController;
};
