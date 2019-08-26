import bcrypt from "bcryptjs";
import forge from "node-forge";

export const createKey = (): Promise<string> =>
  new Promise(resolve => {
    const bytesToHex: any = (_error: any, bytes: string): void => {
      resolve(forge.util.bytesToHex(bytes));
    };

    forge.random.getBytes(32, bytesToHex);
  });

export const hashKey = (key: string): Promise<string> => bcrypt.hash(key, 10);
