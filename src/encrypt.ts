import forge from "node-forge";
import {ok, error, Result} from 'result-async'

import * as Note from './note'

export const encrypt = (text: string): Note.T => {
  if (!text) return Note.EMPTY_NOTE;

  const key = forge.random.getBytesSync(16);
  const iv = forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();
  const cipherText64 = forge.util.encode64(cipherText);

  return {
    body: cipherText64,
    key,
    iv
  };
};

export const decrypt = ({
  body,
  key,
  iv
}: Note.T): Result<string, string> => {
  if (!body) return ok("");
  const cipherText = forge.util.decode64(body);
  const input = forge.util.createBuffer(cipherText);

  const decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: iv });
  decipher.update(input);
  const success = decipher.finish();

  if (!success) return error('bad key');

  return ok(decipher.output.toString());
};
