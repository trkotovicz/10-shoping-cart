function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// REQUISITO 1
/*
Cria a lista de produtos tratando os dados da API do ML.
Chama a fetchProducts.js que é responsável por pegar os dados da API.
Aguarda carregar os dados, depois chama a propriedade results e para cada item (produto) da lista cria um objeto com o sku, title e image. Chama a section 'items' e adiciona como filho da createProductItemElement, já informando o objeto como parâmetro dela.
Chama a função ao carregar a página.
*/
const productsList = async () => {
  await fetchProducts('computador').then((data) => {
    data.results.forEach((item) => {
      const product = {
        sku: item.id,
        name: item.title,
        image: item.thumbnail,
      };
      document.querySelector('.items').appendChild(createProductItemElement(product));
    });
  });
};

window.onload = () => {
  productsList();
};
