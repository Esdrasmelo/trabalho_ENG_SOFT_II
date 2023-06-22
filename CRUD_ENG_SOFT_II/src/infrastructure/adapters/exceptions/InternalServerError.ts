export class InternalServerErrorException extends Error {
  constructor(errorMessage: string) {
    super();
    this.name = "InternalServerErrorException";
    this.message = errorMessage;
  }
}
