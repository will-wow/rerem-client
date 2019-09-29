import forge from "node-forge";

import * as Encoded from "./encoded";

export type Hash = string;

export const createKey = (count = 16): Promise<Encoded.T> =>
  new Promise(resolve => {
    const encodeBytes: any = (_error: any, bytes: string): void => {
      resolve(Encoded.encode(bytes));
    };

    forge.random.getBytes(count, encodeBytes);
  });
