const customSort = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce((obj, item, index) => {
    return {
      ...obj,
      [item]: index
    };
  }, {});
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
  );
};

module.exports = { customSort }