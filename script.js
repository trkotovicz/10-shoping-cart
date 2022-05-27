const cartItems = document.querySelector('.cart__items');
const emptyButton = document.querySelector('.empty-cart');
const cartItemList = document.querySelectorAll('.cart__item');

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

// REQUISITO 5
// const sumPriceItems = () => {
//   const totalPrice = document.querySelector('.total-price');
//   let sum = 0;

//   cartItemList.forEach((element) => {
//     const productPrice = parseFloat(element.innerText.split('$'));
//     sum += productPrice;
//   });

//   totalPrice.innerText = sum;
// };

// REQUISITO 3
function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
}

// function createCartImageElement(image) {
//   const img = document.createElement('img');
//   img.src = image;
//   return img;
// }

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.appendChild(createCartImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// REQUISITO 4
const localStorageList = () => saveCartItems(cartItems.innerHTML);

function loadLocalStorageList() {
  const cartItemsList = document.querySelectorAll('.cart__item');
  cartItemsList.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

// REQUISITO 6
const emptyCart = () => {
  const cartItemList = document.querySelectorAll('.cart__item');
  cartItemList.forEach((element) => element.remove());
};
emptyButton.addEventListener('click', emptyCart);

// REQUISITO 7
function loading() {
  const loadParagraph = document.createElement('p');
  document.querySelector('.items').appendChild(loadParagraph);
  loadParagraph.innerText = 'carregando...';
  loadParagraph.className = 'loading';
}

const loaded = () => document.querySelector('.loading').remove();

// REQUISITO 1
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
  cartItems.appendChild(createCartItemElement(product));
};


const productById = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(sku);
    const product = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
  addToCart(product);
  localStorageList();
};

function addProductButton() {
  const addCartButton = document.querySelectorAll('.item__add');
  for (let index = 0; index < addCartButton.length; index += 1) {
    addCartButton[index].addEventListener('click', productById);
  }
}

window.onload = async () => {
  loading();
  await productsList();
  addProductButton();
  cartItems.innerHTML = getSavedCartItems();
  loadLocalStorageList();
};
