import { HashDataPort } from "../../../core/ports";
import crypto from "crypto";

export class HashDataAdapter implements HashDataPort {
  private key = Buffer.from(String(process.env.KEY), "hex");
  private iv = Buffer.from(String(process.env.IV), "hex");

  constructor() {}

  hash(data: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const saltedData = salt + data;

    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);

    let encrypted = cipher.update(saltedData, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  }

  decode(data: string): string {
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);

    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const salt = decrypted.slice(0, 32);
    const password = decrypted.slice(32);

    return password;
  }
}
