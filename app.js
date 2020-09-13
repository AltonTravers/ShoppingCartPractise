const mainContent = document.querySelector(".main-item");

// Event listener for main content
mainContent.addEventListener("click", addToCart);

// Click add cart to Add to Cart
function addToCart(e) {
  let itemsKey;
  let priceKey;
  let quantityKey;
  let idKey;
  let totalPriceKey;

  if (
    localStorage.getItem("itemsKey") === null &&
    localStorage.getItem("priceKey") === null &&
    localStorage.getItem("idKey") === null &&
    localStorage.getItem("quantityKey") === null &&
    localStorage.getItem("totalPriceKey") === null
  ) {
    priceKey = [];
    itemsKey = [];
    quantityKey = [];
    idKey = [];
    totalPriceKey = 0;
  } else {
    priceKey = JSON.parse(localStorage.getItem("priceKey"));
    itemsKey = JSON.parse(localStorage.getItem("itemsKey"));
    quantityKey = JSON.parse(localStorage.getItem("quantityKey"));
    idKey = JSON.parse(localStorage.getItem("idKey"));
    totalPriceKey = JSON.parse(localStorage.getItem("totalPriceKey"));
  }

  if (e.target.classList.contains("add-cart")) {
    const itemToAdd = e.target.nextElementSibling.querySelector(".item-name")
      .innerText;
    const priceToAdd = parseFloat(
      e.target.nextElementSibling.querySelector(".price").innerText
    );
    let quantityToAdd = 1;
    let idToAdd = 0;
    if (idKey.length >= 1) {
      idToAdd = idKey.length;
    }

    idKey.push(idToAdd);
    itemsKey.push(itemToAdd);
    priceKey.push(priceToAdd);
    quantityKey.push(quantityToAdd);
    totalPriceKey = totalPriceKey + priceToAdd;
  }
  console.log(itemsKey);
  console.log(priceKey);
  console.log(quantityKey);
  console.log(idKey);

  localStorage.setItem("priceKey", JSON.stringify(priceKey));
  localStorage.setItem("itemsKey", JSON.stringify(itemsKey));
  localStorage.setItem("quantityKey", JSON.stringify(quantityKey));
  localStorage.setItem("idKey", JSON.stringify(idKey));
  localStorage.setItem("totalPriceKey", JSON.stringify(totalPriceKey));

  e.preventDefault();
}
