import forge from "node-forge";
import { ok, error, Result } from "result-async";

import * as Encoded from "./encoded";

export type Encrypted = string;

export interface EncryptedData {
  body: Encrypted;
  key: Encoded.T;
  iv: Encoded.T;
}

export const createEncryptionKey = () => {
  const keyBytes = forge.random.getBytesSync(16);
  const ivBytes = forge.random.getBytesSync(16);

  return {
    key: Encoded.encode(keyBytes),
    iv: Encoded.encode(ivBytes)
  };
};

export const encrypt = (
  text: string,
  key: Encoded.T,
  iv: Encoded.T
): Encrypted => {
  if (!text) return '';

  const keyBytes = Encoded.decode(key);
  const ivBytes = Encoded.decode(iv);

  const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
  cipher.start({ iv: ivBytes });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();

  return Encoded.encode(cipherText);
};

export const decrypt = (
  body: Encrypted,
  key: Encoded.T,
  iv: Encoded.T
): Result<string, string> => {
  if (!body) return ok("");

  const keyBytes = Encoded.decode(key);
  const ivBytes = Encoded.decode(iv);
  const cipherText = Encoded.decode(body);

  const input = forge.util.createBuffer(cipherText);
  const decipher = forge.cipher.createDecipher("AES-CBC", keyBytes);
  decipher.start({ iv: ivBytes });
  decipher.update(input);
  const success = decipher.finish();

  if (!success) return error("bad key");

  return ok(decipher.output.toString());
};
