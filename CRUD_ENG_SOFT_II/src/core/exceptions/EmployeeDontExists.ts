export class EmployeeDontExists extends Error {
  constructor() {
    super();
    this.name = "EmployeeDontExists";
    this.message = "O funcionário informado não existe";
  }
}
