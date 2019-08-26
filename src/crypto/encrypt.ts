import forge from "node-forge";
import { ok, error, Result } from "result-async";

import * as Hex from "./hex";

export type EncryptedString = string;

export interface EncryptedData {
  body: EncryptedString;
  key: Hex.T;
  iv: Hex.T;
}

const EMPTY_ENCRYPTED_DATA: EncryptedData = {
  body: "",
  key: "",
  iv: ""
};

export const encryptNew = (text: string): EncryptedData => {
  const keyBytes = forge.random.getBytesSync(16);
  const ivBytes = forge.random.getBytesSync(16);
  return encrypt(text, keyBytes, ivBytes);
};

export const reEncrypt = (
  text: string,
  key: Hex.T,
  iv: Hex.T
): EncryptedData => {
  const keyBytes = Hex.fromHex(key);
  const ivBytes = Hex.fromHex(iv);
  return encrypt(text, keyBytes, ivBytes);
};

const encrypt = (text: string, key: string, iv: string): EncryptedData => {
  if (!text) return EMPTY_ENCRYPTED_DATA;

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();
  const cipherText64 = forge.util.encode64(cipherText);

  return {
    body: cipherText64,
    key: Hex.toHex(key),
    iv: Hex.toHex(iv)
  };
};

export const decrypt = ({
  body,
  key,
  iv
}: EncryptedData): Result<string, string> => {
  if (!body) return ok("");

  const keyBytes = Hex.fromHex(key);
  const ivBytes = Hex.fromHex(iv);

  const cipherText = forge.util.decode64(body);
  const input = forge.util.createBuffer(cipherText);

  const decipher = forge.cipher.createDecipher("AES-CBC", keyBytes);
  decipher.start({ iv: ivBytes });
  decipher.update(input);
  const success = decipher.finish();

  if (!success) return error("bad key");

  return ok(decipher.output.toString());
};
