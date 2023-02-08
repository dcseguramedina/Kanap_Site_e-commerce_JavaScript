//From the Cart page, retrieve the cart (the array) via localStorage

let product;
let productId;
let productColor;
let productQuantity;

function getCartFromLocalStorage() {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);

        for (let product of cart) {

            //Recover the DOM element that will host the cart products 
            const sectionCartItems = document.getElementById("cart__items");

            //Create an "article" tag for the product
            const cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            cartItem.setAttribute('data-id', product.productId);
            cartItem.setAttribute('data-color', product.productColor);
            //Attach the product to the cart products section
            sectionCartItems.appendChild(cartItem);

            //Create a "div" tag to contain the product image
            const cartItemImage = document.createElement("div");
            cartItemImage.className = "cart__item__img";
            cartItem.appendChild(cartItemImage);

            //Create an "img" tag for the product image
            const itemImage = document.createElement("img");
            itemImage.src = product.productImage;
            itemImage.alt = product.productAltTxt;
            cartItemImage.appendChild(itemImage);

            //Create a "div" tag to contain the product content
            const cartItemContent = document.createElement("div");
            cartItemContent.className = "cart__item__content";
            cartItem.appendChild(cartItemContent);

            //Create a "div" tag to contain the product description
            const cartItemContentDescription = document.createElement("div");
            cartItemContentDescription.className = "cart__item__content__description";
            cartItemContent.appendChild(cartItemContentDescription);

            //Create an "h2" tag for the product title
            const productTitle = document.createElement("h2");
            productTitle.textContent = product.productName;
            cartItemContentDescription.appendChild(productTitle);

            //Create a "p" tag for the product color
            const productColor = document.createElement("p");
            productColor.textContent = product.productColor;
            cartItemContentDescription.appendChild(productColor);

            //Create a "p" tag for the product price
            const productPrice = document.createElement("p");
            productPrice.textContent = product.productPrice + " €";
            cartItemContentDescription.appendChild(productPrice);

            //Create a "div" tag to contain the product settings
            const cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.className = "cart__item__content__settings";
            cartItemContent.appendChild(cartItemContentSettings);

            //Create a "div" tag to contain the product quantity
            const cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            //Create a "p" tag for the product quantity
            const quantity = document.createElement("p");
            quantity.textContent = "Qté : ";
            cartItemContentSettingsQuantity.appendChild(quantity);

            //Create an "input" tag for the product quantity details
            const quantityInput = document.createElement("input");
            quantityInput.className = "itemQuantity";
            quantityInput.setAttribute("type", "number");
            quantityInput.setAttribute("name", "itemQuantity");
            quantityInput.setAttribute("min", "1");
            quantityInput.setAttribute("max", "100");
            quantityInput.value = product.productQuantity;
            cartItemContentSettingsQuantity.appendChild(quantityInput);

            //Create a "div" tag to contain the delete option
            const cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            //Create a "p" tag for the delete option
            const deleteItem = document.createElement("p");
            deleteItem.className = "deleteItem";
            deleteItem.textContent = "Supprimer";
            cartItemContentSettingsDelete.appendChild(deleteItem);
           
            //Recover the DOM element that contain the quantity settings and insert the quantity
            let totalQuantity = getTotalQuantity();
            const totalQuantityInput = document.getElementById("totalQuantity");
            totalQuantityInput.textContent = totalQuantity;

            //Recover the DOM element that contain the price and insert the price
            let totalPrice = getTotalPrice();
            const totalPriceInput = document.getElementById("totalPrice");
            totalPriceInput.textContent = totalPrice;
        }
    }
    else {
        alert(`Votre panier est vide`);
    }
}

getCartFromLocalStorage();

function getTotalQuantity() {

    let totalQuantity = 0;
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (let product of cart) {
            totalQuantity += product.productQuantity;
        }
    }
    return totalQuantity;
}

function getTotalPrice() {

    let totalPrice = 0;
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (let product of cart) {
            totalPrice += product.productQuantity * parseInt(product.productPrice);
        }
    }
    return totalPrice;
}

function removeProductFromCart() {
    //Recover the DOM element containing the "deleteItem" button
    const removeFromCart = document.querySelectorAll(".deleteItem");

    for (let r = 0; r < removeFromCart.length; r++) {

        //Listen to the click on the "deleteItem" button 
        removeFromCart[r].addEventListener("click", function (event) {
            event.preventDefault();
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                //Look for the selected product (same ID + same color) and keep everything different from it 
                let filteredProduct = cart.filter(
                    (p) => p.productId !== productId && p.productColor !== productColor
                );
                localStorage.setItem("cart", JSON.stringify(cart));
                //removeProductFromCartConfirmation();
            }            
        })

        //Remove products from cart confirmation
        function removeProductFromCartConfirmation() {
            if (window.confirm(`Le produit a été supprimer du panier. Pour consulter votre panier, cliquez sur OK`)) {
                window.location.reload();
            }
        }
    }
}

removeProductFromCart();

function modifyProductQuantity() {
    //Recover the DOM element that contain the quantity settings
    const modifyQuantity = document.querySelectorAll(".itemQuantity");

    for (let m = 0; m < modifyQuantity.length; m++) {

        //Listen to the changes on the quantity inputs 
        modifyQuantity[m].addEventListener("change", function (event) {
            event.preventDefault();
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                //Look for the selected product in the cart (same ID + same color)
                let foundProduct = cart.find(
                    (p) => p.productId == productId && p.productColor == productColor
                );
                //Increment the quantity of the product
                if (foundProduct !== undefined) {
                    foundProduct.productQuantity += productQuantity;
                    if (foundProduct.productQuantity > 100) {
                        alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
                    }
                    else if (foundProduct.productQuantity <= 0) {
                        removeProductFromCart(foundProduct);
                    }
                    else {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        //modifyProductQuantityConfirmation();
                    }
                }
            }
        })

        function modifyProductQuantityConfirmation() {
            if (window.confirm(`La quantité du produit a été modifié. Pour consulter votre panier, cliquez sur OK`)) {
                window.location.reload();
            }
        }
    }
}

modifyProductQuantity();

//Form validation

const form = document.getElementsByClassName("cart__order__form")[0];

const firstNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,"gm");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

const lastNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const addressRegex = new RegExp(/^[a-zA-Z0-9.,-_ ]{1,100}$/);
const cityRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+$/,"gm");


form.firstName.addEventListener("change", function (event) {
    event.preventDefault();
    validFirstName(this);
})

function validFirstName(firstName) {        

    if (firstNameRegex.test(firstName)) {
        console.log(firstName);
    }
    else {        
        firstNameErrorMsg.textContent = `Prénom invalide`;
    }
}