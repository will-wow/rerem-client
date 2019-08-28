import bcrypt from "bcryptjs";
import forge from "node-forge";

import * as Encoded from "./encoded";

export type Hash = string;

export const createKey = (): Promise<Encoded.T> =>
  new Promise(resolve => {
    const encodeBytes: any = (_error: any, bytes: string): void => {
      resolve(Encoded.encode(bytes));
    };

    forge.random.getBytes(32, encodeBytes);
  });

export const hashKey = (key: string): Promise<Hash> => bcrypt.hash(key, 10);
