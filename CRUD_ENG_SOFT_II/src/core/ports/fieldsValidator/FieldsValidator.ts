export interface FieldsValidatorPort<InputData> {
  validate<ReturnType>(data: InputData): Promise<any>;
}
