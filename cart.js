document.addEventListener("DOMContentLoaded", showCart);
// document.addEventListener("click", (e) => {
//   console.log(e.target);
//   e.preventDefault();
// });
const tableBody = document.querySelector(".table-body");
const total = document.querySelector(".total-price");

tableBody.addEventListener("click", (e) => {
  const itemId = parseInt(e.target.parentElement.parentElement.id);
  console.log(itemId);

  if (
    localStorage.getItem("itemsKey") === null &&
    localStorage.getItem("priceKey") === null &&
    localStorage.getItem("idKey") === null &&
    localStorage.getItem("quantityKey") === null
  ) {
    priceKey = [];
    itemsKey = [];
    quantityKey = [];
    idKey = [];
  } else {
    priceKey = JSON.parse(localStorage.getItem("priceKey"));
    itemsKey = JSON.parse(localStorage.getItem("itemsKey"));
    quantityKey = JSON.parse(localStorage.getItem("quantityKey"));
    idKey = JSON.parse(localStorage.getItem("idKey"));
  }

  // delete item
  if (e.target.className === "item-remove") {
    //   remove UI
    e.target.parentElement.parentElement.remove();
    // remove from LS
    let x = idKey.indexOf(itemId);
    console.log(x);
    idKey.splice(x, 1);
    priceKey.splice(x, 1);
    itemsKey.splice(x, 1);
    quantityKey.splice(x, 1);

    localStorage.setItem("priceKey", JSON.stringify(priceKey));
    localStorage.setItem("itemsKey", JSON.stringify(itemsKey));
    localStorage.setItem("quantityKey", JSON.stringify(quantityKey));
    localStorage.setItem("idKey", JSON.stringify(idKey));

    let sum = 0;
    priceKey.forEach((self, i) => {
      sum += self * quantityKey[i];
    });

    total.innerHTML = sum;
    localStorage.setItem("totalPriceKey", sum);
  }

  //   quantity - minus
  if (
    e.target.className === "item-dec" &&
    parseInt(e.target.nextElementSibling.innerHTML) > 0
  ) {
    let quantityForDec = parseInt(e.target.nextElementSibling.innerHTML);
    quantityForDec = quantityForDec - 1;
    e.target.nextElementSibling.innerHTML = quantityForDec;
    quantityKey.splice(idKey.indexOf(itemId), 1, quantityForDec);
    localStorage.setItem("quantityKey", JSON.stringify(quantityKey));

    let totalPrice =
      e.target.parentElement.nextElementSibling.childNodes[1].innerHTML;

    let price = parseInt(
      e.target.parentElement.previousElementSibling.childNodes[1].innerHTML
    );

    totalPrice = price * quantityForDec;
    e.target.parentElement.nextElementSibling.childNodes[1].innerHTML = totalPrice;

    let sum = 0;
    priceKey.forEach((self, i) => {
      sum += self * quantityKey[i];
    });

    total.innerHTML = sum;
    localStorage.setItem("totalPriceKey", sum);

    console.log(sum);
  }

  //   quantity - plus
  if (e.target.className === "item-inc") {
    let quantityForInc = parseInt(e.target.previousElementSibling.innerHTML);
    quantityForInc = quantityForInc + 1;
    e.target.previousElementSibling.innerHTML = quantityForInc;
    quantityKey.splice(idKey.indexOf(itemId), 1, quantityForInc);
    localStorage.setItem("quantityKey", JSON.stringify(quantityKey));

    let totalPrice =
      e.target.parentElement.nextElementSibling.childNodes[1].innerHTML;

    let price = parseInt(
      e.target.parentElement.previousElementSibling.childNodes[1].innerHTML
    );

    totalPrice = price * quantityForInc;
    e.target.parentElement.nextElementSibling.childNodes[1].innerHTML = totalPrice;

    let sum = 0;
    priceKey.forEach((self, i) => {
      sum += self * quantityKey[i];
    });

    localStorage.setItem("totalPriceKey", sum);

    total.innerHTML = sum;
  }

  e.preventDefault();
});

function showCart() {
  let idKey;

  if (
    localStorage.getItem("idKey") !== "" ||
    localStorage.getItem("idKey") !== null
  ) {
    idKey = JSON.parse(localStorage.getItem("idKey"));

    console.log(idKey);
    idKey.forEach(createCart);
  }

  if (
    localStorage.getItem("totalPriceKey") == "" ||
    localStorage.getItem("totalPriceKey") == null ||
    localStorage.getItem("totalPriceKey") == 0
  ) {
    let sum = 0;
    priceKey.forEach((self) => {
      sum = self + sum;
    });
    console.log(sum);
    total.innerHTML = sum;
    localStorage.setItem("totalPriceKey", total.innerHTML);
  } else {
    total.innerHTML = localStorage.getItem("totalPriceKey");
  }
}

function createCart(self, i) {
  if (
    localStorage.getItem("itemsKey") === null &&
    localStorage.getItem("priceKey") === null &&
    localStorage.getItem("idKey") === null &&
    localStorage.getItem("quantityKey") === null
  ) {
    priceKey = [];
    itemsKey = [];
    quantityKey = [];
    idKey = [];
  } else {
    priceKey = JSON.parse(localStorage.getItem("priceKey"));
    itemsKey = JSON.parse(localStorage.getItem("itemsKey"));
    quantityKey = JSON.parse(localStorage.getItem("quantityKey"));
    idKey = JSON.parse(localStorage.getItem("idKey"));
  }
  const cartTable = document.querySelector(".table-body");
  const cartCheckOut = document.querySelector(".cart-check-out");

  // New Cart
  const newCart = document.createElement("tr");
  newCart.className = "cart-item";
  newCart.id = self;

  // // new Product
  // const newProduct = document.createElement("td");
  // newProduct.

  newCart.innerHTML = `
    <td class="item-product" >
    <a href="" class="item-remove"><i class="fas fa-times-circle"></i></a>
    <div class="item-pic">
      <img src="./img/hoodle2.jfif" alt="" />
    </div>
    <span class="item-name">${itemsKey[i]}</span>
  </td>
  <td>$<span class="price">${priceKey[i]}.00</span></td>
  <td>
    <a href="" class="item-dec"><i class="fas fa-minus-circle"></i></a>
    <span class="quantity">${quantityKey[i]}</span>
    <a href="" class="item-inc"><i class="fas fa-plus-circle"></i></a>
  </td>
  <td>$<span class="priceTimes">${
    parseInt(priceKey[i]) * parseInt(quantityKey[i])
  }.00</span></td>
    `;

  cartTable.insertBefore(newCart, cartCheckOut);
}
