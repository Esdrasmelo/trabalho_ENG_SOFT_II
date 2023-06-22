import {
  CreateEmployeeIn,
  UpdateEmployeeIn,
  EmployeeOutData,
} from "../../../../../core/models";
import { EmployeeRepositoryPort } from "../../../../../core/ports";
import { InternalServerErrorException } from "../../../exceptions";
import { prismaClient } from "../PrismaConnection";

export class EmployeeRepositoryAdapter implements EmployeeRepositoryPort {
  async getByEmail(email: string): Promise<EmployeeOutData> {
    try {
      const getEmployeeByEmail = await prismaClient.employee.findFirst({
        where: {
          email,
        },
      });

      return getEmployeeByEmail!;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getAll(): Promise<EmployeeOutData[]> {
    try {
      const getAllEmployees = await prismaClient.employee.findMany();

      return getAllEmployees;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getById(id: string): Promise<EmployeeOutData> {
    try {
      const getEmployeeById = await prismaClient.employee.findUnique({
        where: {
          id,
        },
      });

      return getEmployeeById!;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async create(data: CreateEmployeeIn): Promise<EmployeeOutData> {
    try {
      const createdEmplyee = await prismaClient.employee.create({
        data,
      });

      return createdEmplyee;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async update(id: string, data: UpdateEmployeeIn): Promise<EmployeeOutData> {
    try {
      console.log(data)

      const updatedEmployee = await prismaClient.employee.update({
        data,
        where: {
          id,
        },
      });

      return updatedEmployee;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteById(id: string): Promise<EmployeeOutData> {
    try {
      const deletedEmployee = await prismaClient.employee.delete({
        where: {
          id,
        },
      });

      return deletedEmployee;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
