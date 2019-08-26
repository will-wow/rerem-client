import * as AccessKey from "./access-key";
import * as Encrypt from "./encrypt";
import * as Hex from "./hex";

export type Hex = Hex.T;
export type Hash = AccessKey.Hash;
export type EncryptedString = Encrypt.EncryptedString;

export { encryptNew, reEncrypt, decrypt } from "./encrypt";
export { toHex, fromHex, objectFromHex, objectToHex } from "./hex";
