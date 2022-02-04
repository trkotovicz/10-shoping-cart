const fetchItem = async (productId) => {
  const url = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await url.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
