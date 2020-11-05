export const reduceQueryString = (routeQueryString) => {
  const url = new URLSearchParams(routeQueryString).toString();
  return url && `?${url}`;
};
export const createQueryString = (values) => {
  const filteredValues = Object.entries(values).filter(
    ([, value]) => value !== '-------'
  );

  return reduceQueryString(filteredValues);
};
export const reduceQueryStore = (routeQueryString) => {
  const url = new URLSearchParams(routeQueryString).toString();
  return url && `${url}`;
};
export const createQueryStore = (values) => {
  const filteredValues = Object.entries(values).filter(
    ([, value]) => value !== '-------'
  );

  return reduceQueryStore(filteredValues);
};
