import { HashDataAdapter } from "../../src/infrastructure/adapters";
import { seedEmployeeData } from "./Employee";

async function seedAllData() {
  const hashData = new HashDataAdapter();

  await seedEmployeeData(hashData);
}

seedAllData();
