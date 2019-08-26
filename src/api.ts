import axios, { Method, AxiosRequestConfig } from "axios";
import humps from "humps";
import _ from "lodash";
import { ok, error, ResultP } from "result-async";

const normalizeTransformer = <T>(transformers: T | T[] | undefined): T[] => {
  if (_.isArray(transformers)) return transformers;
  if (_.isNil(transformers)) return [];
  return [transformers];
};

const transformResponse = [
  ...normalizeTransformer(axios.defaults.transformResponse),
  humps.camelizeKeys
];

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  transformResponse
});

export { api as axios };

const wrapRequestInResult = async <Ok, Error>(
  options: AxiosRequestConfig
): ResultP<Ok, Error> => {
  try {
    const request = await api.request(options);
    return ok(request.data);
  } catch (e) {
    return error(e.response.data);
  }
};

const request = (method: Method, type: "data" | "params") => async <Ok, Error>(
  url: string,
  data?: any
): ResultP<Ok, Error> =>
  wrapRequestInResult<Ok, Error>({
    url,
    method,
    [type]: humps.decamelizeKeys(data)
  });

export const get = request("get", "params");
export const post = request("post", "data");
export const put = request("put", "data");
export const remove = request("delete", "params");
