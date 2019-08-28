import forge from "node-forge";
import { ok, error, Result } from "result-async";

import * as Encoded from "./encoded";

export type Encrypted = string;

export interface EncryptedData {
  body: Encrypted;
  key: Encoded.T;
  iv: Encoded.T;
}

const EMPTY_ENCRYPTED_DATA: EncryptedData = {
  body: "",
  key: "",
  iv: ""
};

export const encryptNew = (text: string): EncryptedData => {
  const keyBytes = forge.random.getBytesSync(16);
  const ivBytes = forge.random.getBytesSync(16);

  // console.log({ keyBytes, ivBytes });
  
  return encrypt(text, keyBytes, ivBytes);
};

export const reEncrypt = (
  text: string,
  key: Encoded.T,
  iv: Encoded.T
): EncryptedData => {
  const keyBytes = Encoded.decode(key);
  const ivBytes = Encoded.decode(iv);

  return encrypt(text, keyBytes, ivBytes);
};

const encrypt = (text: string, keyBytes: string, ivBytes: string): EncryptedData => {
  if (!text) return EMPTY_ENCRYPTED_DATA;

  const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
  cipher.start({ iv: ivBytes });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();

  // console.log({ keyBytes, ivBytes, cipherText });

  return {
    body: Encoded.encode(cipherText),
    key: Encoded.encode(keyBytes),
    iv: Encoded.encode(ivBytes)
  };
};

export const decrypt = ({
  body,
  key,
  iv
}: EncryptedData): Result<string, string> => {
  if (!body) return ok("");

  const keyBytes = Encoded.decode(key);
  const ivBytes = Encoded.decode(iv);
  const cipherText = Encoded.decode(body);

  // console.log({ keyBytes, ivBytes, cipherText });

  const input = forge.util.createBuffer(cipherText);
  const decipher = forge.cipher.createDecipher("AES-CBC", keyBytes);
  decipher.start({ iv: ivBytes });
  decipher.update(input);
  const success = decipher.finish();

  if (!success) return error("bad key");

  return ok(decipher.output.toString());
};
