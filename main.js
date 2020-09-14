function openNav() {
  document.getElementById("categories").style.display = "inline";
  setTimeout(() => {
    document.getElementById("categories").style.width = "150px";
  }, 100);
}

function closeNav() {
  document.getElementById("categories").style.width = "0";
  setTimeout(() => {
    document.getElementById("categories").style.display = "none";
  }, 500);
}

let inventory = {
  succulents: [
    {
      id: 0,
      sku: 1,
      name: "Cactus",
      productCategory: "productCategory",
      description: "Rugged, yet beautiful.",
      price: 10,
      image: "./images/Cactus-gray-pot-plant-succulent.jpg",
    },
    {
      id: 1,
      sku: 2,
      name: "Chicks and Hens",
      productCategory: "productCategory",
      description: "The classic succulent.",
      price: 10,
      image: "./images/chicks-and-hens-succulent.jpg",
    },
    {
      id: 2,
      sku: 3,
      name: "Snake Plant",
      productCategory: "productCategory",
      description: "Watch it grow from small to tall.",
      price: 10,
      image: "./images/snake-plant-succulent.jpg",
    },
  ],
  petFriendly: [
    {
      id: 0,
      sku: 4,
      name: "Spider Plant",
      category: "Pet-Friendly",
      description: "A wide reach.",
      price: 10,
      image: "./images/spider-plant.jpg",
    },
    {
      id: 1,
      sku: 5,
      name: "Ponytail Palm",
      category: "Pet-Friendly",
      description: "A tropical paradise at home.",
      price: 10,
      image: "./images/Pony-tail-palm-medium.jpg",
    },
    {
      id: 2,
      sku: 6,
      name: "Money Tree Plant",
      category: "Pet-Friendly",
      description: "Have your home looking like a million bucks.",
      price: 10,
      image: "./images/money-tree-plant.jpg",
    },
  ],
  beginnerFriendly: [
    {
      id: 0,
      sku: 7,
      name: "ZZ Plant",
      category: "Beginner-Friendly",
      description: "Everybody's crazy about a sharp-dressed plant.",
      price: 10,
      image: "./images/ZZ-plant.jpg",
    },
    {
      id: 1,
      sku: 8,
      name: "Pothos",
      category: "Beginner-Friendly",
      description: "The devil's advocate.",
      price: 10,

      image: "./images/pothos-plant.jpeg",
    },
  ],
  luxury: [
    {
      id: 0,
      sku: 9,
      name: "Pointsettia",
      category: "Luxury",
      description: "Why wait until the holidays?",
      price: 10,

      image: "./images/poinsettia.jpg",
    },
    {
      id: 1,
      sku: 10,
      name: "Peace Lilly",
      category: "Luxury",
      description: "Take a deep breath.",
      price: 10,

      image: "./images/peace-lily.jpg",
    },
  ],
};
let cart = JSON.parse(window.localStorage.getItem("cart")),
  total = 0;

console.log(cart);

let totalPrice = () => {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += parseInt(cart[i].price);
    console.log("Cart Total: ", total);
  }
  return total;
};

let taxFunction = () => {
  let taxes = total * 0.06;

  console.log("Taxes: " + taxes);
  return taxes;
};

let grandTotal = () => {
  let grandTot = 0;
  console.log(total);
  grandTot = total + taxFunction();
  console.log("Final Price" + grandTot);
  return grandTot;
};

let addToCart = (event) => {
  if (cart === null) {
    cart = [];
    cart.push(inventory[event.target.classList[0]][event.target.id]);
  } else {
    cart.push(inventory[event.target.classList[0]][event.target.id]);
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
};

const getProducts = (category) => {
  const productCategory = document.getElementById(category);
  for (let i = 0; i < inventory[category].length; i++) {
    const itemContainer = document.createElement("div");
    itemContainer.className = "itemContainer";

    const div1 = document.createElement("h2");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    const button = document.createElement("button");
    button.id = i;
    button.classList.add(category);
    button.addEventListener("click", (event) => addToCart(event));

    div1.innerText = inventory[category][i].name;
    div2.innerText = inventory[category][i].description;
    div3.innerText = "$" + inventory[category][i].price;
    button.innerText = "Add to Cart";

    button.classList.add("cartButton");

    const img = document.createElement("img");
    img.src = inventory[category][i].image;
    img.classList.add("plant-image");

    itemContainer.append(img);
    itemContainer.append(div1);
    itemContainer.append(div2);
    itemContainer.append(div3);
    itemContainer.append(button);

    productCategory.append(itemContainer);
  }
};
const getAllProducts = () => {
  getProducts("succulents");
  getProducts("petFriendly");
  getProducts("beginnerFriendly");
  getProducts("luxury");
};

let fillCart = () => {
  const showCart = () => {
    cart = JSON.parse(window.localStorage.getItem("cart"));
    console.log(cart);
    totalPrice();
  };
  showCart();
  //items in cart with prices
  {
    const cartPage = document.getElementById("container1");
    for (let i = 0; i < cart.length; i++) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("purchasedItem");
      cartItem.id = i;
      const itemName = document.createElement("h3");
      const remove = document.createElement("button");
      remove.classList.add("remove-button");
      remove.id = i;

      const itemPrice = document.createElement("span");
      itemPrice.classList.add("item-price");
      remove.addEventListener("click", (event) => removeFromCart(event));
      itemName.innerText = cart[i].name;
      remove.innerText = "X";
      itemPrice.innerText = "$" + cart[i].price;

      cartItem.append(itemName);
      cartItem.append(remove);

      cartItem.append(itemPrice);

      container1.append(cartItem);
    }
    //subtotal to go under the individual items
    {
      const subtotalLine = document.getElementById("container1");
      const subtotal = document.createElement("div");
      subtotal.classList.add("money");
      const subtotalText = document.createElement("h4");
      const subPrice = document.createElement("span");
      subPrice.id = "subId";
      subtotalText.innerText = "Subtotal:";
      subPrice.innerText = "$" + total;

      subtotal.append(subtotalText);
      subtotal.append(subPrice);
      subtotalLine.append(subtotal);
    }

    //tax, shipping, and total
    {
      const finalPrice = document.getElementById("container1");
      const taxAndTotal = document.createElement("div");

      const tax = document.createElement("p");
      tax.classList.add("money");
      const taxText = document.createElement("span");
      let taxNumber = document.createElement("span");
      taxNumber.id = "taxId";
      taxText.innerText = "Tax:";
      taxNumber.innerText = "$" + taxFunction().toFixed(2);

      const grand = document.createElement("h3");
      grand.classList.add("money");
      const grandText = document.createElement("span");
      let grandNumber = document.createElement("span");
      grandNumber.id = "grandID";
      grandText.innerText = "Total:";
      grandNumber.innerText = "$" + grandTotal().toFixed(2);

      tax.append(taxText);
      tax.append(taxNumber);
      taxAndTotal.append(tax);

      grand.append(grandText);
      grand.append(grandNumber);
      taxAndTotal.append(grand);

      container1.append(taxAndTotal);
    }
  }
};

function ccSelection() {
  var x = document.getElementById("shipBillContainer");
  document.querySelector("form").addEventListener("submit", creditCardSubmit);
  document.getElementById("cashPayment").style.display = "none";
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function cashSelection() {
  var c = document.getElementById("cashPayment");
  document.querySelector(
    ".cashInput"
  ).textContent = `Amount Due: $${grandTotal().toFixed(2)}`;
  document.getElementById("shipBillContainer").style.display = "none";
  if (c.style.display === "none") {
    c.style.display = "block";
  } else {
    c.style.display = "none";
  }
}

function loadAmount() {
  var a = document.getElementById("cashInput").value;
  document.getElementById("demo").innerHTML = "$" + a;
  remainingTotals(a);
}

let removeFromCart = (event) => {
  console.log("remove button was clicked");
  cart.splice(event.target.id, 1);
  console.log(cart);
  let container1 = document.getElementById("container1");
  let elementToDelete = document.getElementById(`${event.target.id}`);
  container1.removeChild(elementToDelete);
  window.localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("subId").innerHTML = `$${totalPrice()}`;
  document.getElementById("taxId").innerHTML = `$${taxFunction().toFixed(2)}`;
  document.getElementById("grandID").innerHTML = `$${grandTotal().toFixed(2)}`;
};

function remainingTotals(number) {
  let remainingTotal = grandTotal() - number;
  if (remainingTotal > 0) {
    document.querySelector("#remainingAmountText").textContent =
      "Remaining Amount:";
    document.querySelector("#amountRemaining").style.color = "red";
    document.querySelector(
      "#amountRemaining"
    ).textContent = remainingTotal.toFixed(2);
  } else {
    document.querySelector("#remainingAmountText").textContent = "Change Due:";
    document.querySelector("#amountRemaining").style.color = "green";
    document.querySelector("#amountRemaining").textContent = Math.abs(
      remainingTotal
    ).toFixed(2);
  }
}

const creditCardSubmit = (event) => {
  event.preventDefault();
  let correctForm = true;
  for (let i = 0; i < 15; i++) {
    console.log(event.target[i].value);
    if (event.target[i].value === "") {
      console.log("WE ARE HERE");
      correctForm = false;
    }
  }
  if (correctForm === true) {
    window.location.href = "receipt.html";
  }

  console.log(event);
};

///receipt page

let fillReceipt = () => {
  const showCart = () => {
    cart = JSON.parse(window.localStorage.getItem("cart"));
    console.log(cart);
    totalPrice();
  };
  showCart();
  //items in cart with prices
  {
    const cartPage = document.getElementById("receiptContainer");
    for (let i = 0; i < cart.length; i++) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("purchasedItem");
      cartItem.id = i;
      const itemName = document.createElement("h3");

      const itemPrice = document.createElement("span");
      itemPrice.classList.add("item-price");
      itemName.innerText = cart[i].name;
      itemPrice.innerText = "$" + cart[i].price;

      cartItem.append(itemName);

      cartItem.append(itemPrice);

      receiptContainer.append(cartItem);
    }
    //subtotal to go under the individual items
    {
      const subtotalLine = document.getElementById("receiptContainer");
      const subtotal = document.createElement("div");
      subtotal.classList.add("money");
      const subtotalText = document.createElement("h4");
      const subPrice = document.createElement("span");
      subPrice.id = "subId";
      subtotalText.innerText = "Subtotal:";
      subPrice.innerText = "$" + total;

      subtotal.append(subtotalText);
      subtotal.append(subPrice);
      subtotalLine.append(subtotal);
    }

    //tax, shipping, and total
    {
      const finalPrice = document.getElementById("receiptContainer");
      const taxAndTotal = document.createElement("div");

      const tax = document.createElement("p");
      tax.classList.add("money");
      const taxText = document.createElement("span");
      let taxNumber = document.createElement("span");
      taxNumber.id = "taxId";
      taxText.innerText = "Tax:";
      taxNumber.innerText = "$" + taxFunction().toFixed(2);

      const grand = document.createElement("h3");
      grand.classList.add("money");
      const grandText = document.createElement("span");
      let grandNumber = document.createElement("span");
      grandNumber.id = "grandID";
      grandText.innerText = "Total:";
      grandNumber.innerText = "$" + grandTotal().toFixed(2);

      tax.append(taxText);
      tax.append(taxNumber);
      taxAndTotal.append(tax);

      grand.append(grandText);
      grand.append(grandNumber);
      taxAndTotal.append(grand);

      receiptContainer.append(taxAndTotal);
    }
  }
};
