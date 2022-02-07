const cartItems = document.querySelector('.cart__items');

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

// REQUISITO 3
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

// REQUISITO 7
function loading() {
  const loadParagraph = document.createElement('p');
  document.querySelector('.items').appendChild(loadParagraph);
  loadParagraph.innerText = 'carregando...';
  loadParagraph.className = 'loading';
}

function loaded() {
  document.querySelector('.loading').remove();
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
    loaded();
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

// REQUISITO 2
const addToCart = (product) => {
  // add o produto na lista do carrinho de compras
  cartItems.appendChild(createCartItemElement(product));
};

// 
const productById = async (event) => {
  // sku pega o elemento pai (o produto inteiro) do botão clicado e chama a getSkuFromProductItem que pega o sku do produto
  const sku = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(sku);
    const product = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
  // add o objeto product na lista do carrinho
  addToCart(product);
};

// addEventListener em todos botões de add ao carrinho e chama a função productById
function addProductButton() {
  const addCartButton = document.querySelectorAll('.item__add');
  for (let index = 0; index < addCartButton.length; index += 1) {
    addCartButton[index].addEventListener('click', productById);
  }
}

// Aninha ajudou a fazer meu botão addEventListener funcionar e a pegar o sku do produto

window.onload = async () => {
  loading();
  await productsList();
  addProductButton();
};
