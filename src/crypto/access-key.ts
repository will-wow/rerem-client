import bcrypt from "bcryptjs";
import forge from "node-forge";

import * as Hex from "./hex";

export type Hash = string;

export const createKey = (): Promise<Hex.T> =>
  new Promise(resolve => {
    const bytesToHex: any = (_error: any, bytes: string): void => {
      resolve(Hex.toHex(bytes));
    };

    forge.random.getBytes(32, bytesToHex);
  });

export const hashKey = (key: Hex.T): Promise<Hash> => bcrypt.hash(key, 10);
