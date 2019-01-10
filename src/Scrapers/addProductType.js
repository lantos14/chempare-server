//            pl.: hm  (kardiganok-puloverek, data) => return 'kardiganok-puloverek'
const addProductType = (name, store, data) => {
  const result = data;
  const universalType = defineType(store, name);
  result.forEach(product => {
    product.type = universalType;
  });

  return result;
}

export default addProductType;
