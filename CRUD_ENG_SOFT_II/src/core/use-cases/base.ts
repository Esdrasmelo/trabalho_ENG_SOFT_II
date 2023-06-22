import { HttpResponseOut } from "../protocols";

export interface BaseUseCase<InData> {
  execute(data: InData): Promise<HttpResponseOut>;
}
