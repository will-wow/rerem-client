import forge from "node-forge";
import { ok, error, Result } from "result-async";

import * as Encoded from "./encoded";
import * as AccessKey from "./access-key";

export type Encrypted = string;

export interface EncryptedData {
  body: Encrypted;
  iv: Encoded.T;
}

export const encrypt = async (
  text: string,
  key: Encoded.T
): Promise<EncryptedData> => {
  if (!text) return { body: "", iv: "" };

  const keyBytes = Encoded.decode(key);
  const iv = await AccessKey.createKey();
  const ivBytes = Encoded.decode(iv);

  const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
  cipher.start({ iv: ivBytes });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();

  return {
    body: Encoded.encode(cipherText),
    iv: Encoded.encode(ivBytes)
  };
};

export const decrypt = (
  { body, iv }: EncryptedData,
  key: Encoded.T
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
