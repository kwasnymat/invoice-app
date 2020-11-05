export const createQueryString = (values) => {
  const filteredValues = Object.entries(values).filter(
    ([, value]) => value !== '-------'
  );
  const url = new URLSearchParams(filteredValues).toString();
  return url && `?${url}`;
};

export const createQueryStore = (values) => {
  const filteredValues = Object.entries(values).filter(
    ([, value]) => value !== '-------'
  );
  const url = new URLSearchParams(filteredValues).toString();
  return url && `${url}`;
};
