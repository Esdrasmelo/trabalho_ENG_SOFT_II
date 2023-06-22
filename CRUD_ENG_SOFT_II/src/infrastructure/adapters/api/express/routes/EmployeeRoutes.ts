import { Router } from "express";
import { employeeControllerAssembler } from "../../../controllers";
import { UpdateEmployeeIn } from "../../../../../core/models";

export const employeeRouter = Router();

const employeeController = employeeControllerAssembler();

employeeRouter.get("/users", async (request, response) => {
  const { data, status } = await employeeController.getAllEmployees();

  return response.status(status).json(data);
});

employeeRouter.get("/users/:id", async (request, response) => {
  const { id } = request.params;

  const { data, status } = await employeeController.getEmployeeById(id);

  return response.status(status).json(data);
});

employeeRouter.post("/users", async (request, response) => {
  const bodyData = request.body;

  const { data, status } = await employeeController.createEmployee(bodyData);

  return response.status(status).json(data);
});

employeeRouter.put("/users/:id", async (request, response) => {
  const bodyData = request.body;
  const { id } = request.params;

  const incomingRequestData: UpdateEmployeeIn = {
    ...bodyData,
    id,
  };

  const { data, status } = await employeeController.updateEmployee(
    incomingRequestData
  );

  return response.status(status).json(data);
});

employeeRouter.delete("/users/:id", async (request, response) => {
  const { id } = request.params;

  const { data, status } = await employeeController.deleteEmployee(id);

  return response.status(status).json(data);
});
