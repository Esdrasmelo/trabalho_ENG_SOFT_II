export interface HashDataPort {
  hash(data: string): string;
  decode(data: string): string;
}
