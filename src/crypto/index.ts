import * as AccessKey from "./access-key";
import * as Encrypt from "./encrypt";
import * as Encoded from "./encoded";

export type Encoded = Encoded.T;
export type Hash = AccessKey.Hash;
export type EncryptedString = Encrypt.Encrypted;

export { encryptNew, reEncrypt, decrypt } from "./encrypt";
export { encode, decode, encodeObject, decodeObject } from "./encoded";
