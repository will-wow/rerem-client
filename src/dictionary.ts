import _ from "lodash";

export const renameKeys = <
  Original extends Record<string, any>,
  NewObject extends Record<string, any>,
  Map extends
    | Partial<
        {
          [K in keyof Original]: string;
        }
      >
    | Partial<
        {
          [K in keyof NewObject]: string;
        }
      >
>(
  object: Original,
  nameMapping: Map,
  { invert: useInverse }: { invert?: boolean } = {}
): NewObject => {
  const mapping = useInverse ? _.invert(nameMapping) : nameMapping;
  return _.mapKeys(object, (_value, key) => mapping[key] || key) as NewObject;
};

export const renameKeysCurried = <
  Original extends Record<string, any>,
  NewObject extends Record<string, any>,
  Map extends
    | Partial<
        {
          [K in keyof Original]: string;
        }
      >
    | Partial<
        {
          [K in keyof NewObject]: string;
        }
      >
>(
  nameMapping: Map,
  opts: { invert?: boolean } = {}
) => (object: Original) => {
  return renameKeys(object, nameMapping, opts);
};
