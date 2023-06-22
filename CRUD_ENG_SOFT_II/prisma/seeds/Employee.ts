import { Employee } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { HashDataAdapter } from "../../src/infrastructure/adapters";

const prisma = new PrismaClient();

export const seedEmployeeData = async (hashPassword: HashDataAdapter) => {
  try {
    const employees: Employee[] = [];

    for (let i = 0; i < 30; i++) {
      employees.push({
        employee_name: faker.person.fullName(),
        salary: faker.number.float({ min: 1000, max: 5000, precision: 2 }),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        password: hashPassword.hash("123456789"),
        is_active: faker.datatype.boolean(),
        id: faker.string.uuid(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let index = 0; index < employees.length; index++) {
      await prisma.employee.create({
        data: employees[index],
      });
    }
  } catch (error) {
    console.error("Ocorreu um erro ao inserir os dados:", error);
  } finally {
    await prisma.$disconnect();
  }
};
