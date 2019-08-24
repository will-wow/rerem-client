import forge from "node-forge";

export const encrypt = (text: string) => {
  if (!text) return {};
  const key = forge.random.getBytesSync(16);
  const iv = forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();

  const cipherText = cipher.output.getBytes();
  console.log("en", { cipherText });
  const cipherText64 = forge.util.encode64(cipherText);

  return {
    encrypted: cipherText64,
    key,
    iv
  };
};

export const decrypt = ({
  encrypted,
  key,
  iv
}: {
  encrypted: string;
  key: string;
  iv: string;
}) => {
  if (!encrypted) return "";
  console.log(encrypted);
  const cipherText = forge.util.decode64(encrypted);
  console.log("de", { cipherText });
  const input = forge.util.createBuffer(cipherText);

  const decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: iv });
  decipher.update(input);
  decipher.finish();
  // const result = decipher.finish(); // check 'result' for true/false
  // outputs decrypted hex
  return decipher.output.toString();
};
