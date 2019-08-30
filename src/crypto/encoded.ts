type Encoded = string;
export type T = Encoded;

export const encode = (bytes: string, query = false): Encoded => {
  const encoded = btoa(bytes);
  return query ? encodeURIComponent(encoded) : encoded;
};

export const decode = (encoded: Encoded, query = false): string => {
  const toDecode = query ? decodeURIComponent(encoded) : encoded;

  return atob(toDecode);
};

export const encodeObject = (object: any, query = false): Encoded => {
  const json = JSON.stringify(object);
  return encode(json, query);
};

export const decodeObject = <T>(hex: Encoded, query = false): T => {
  const json = decode(hex, query);
  return JSON.parse(json);
};
