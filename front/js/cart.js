//From the Cart page, retrieve the cart (the array) via localStorage



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

    for (let i = 0; i < removeFromCart.length; i++) {

        //Listen to the click on the "deleteItem" button 
        removeFromCart[i].addEventListener("click", function (event) {
            event.preventDefault();
            console.log("test");
            if (localStorage.getItem("cart")) {
                if (window.confirm(`Le produit va être supprimé du panier. Cliquez sur OK pour confirmer`)) {
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    console.log(cart);
                    //Look for the selected product (same ID + same color) and keep everything different from it 
                    cart = cart.filter(
                        (p) => p.productId !== cart[i].productId || p.productColor !== cart[i].productColor
                    );
                    console.log(cart)
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Le produit a été supprimer")
                    window.location.reload();
                }
                else {
                    alert("Le produit n'a pas été supprimé")
                }
            }
        })
    }
}

removeProductFromCart();

function modifyProductQuantity() {
    //Recover the DOM element that contain the quantity settings
    const modifyQuantity = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < modifyQuantity.length; i++) {

        //Listen to the changes on the quantity inputs 
        modifyQuantity[i].addEventListener("change", function (event) {
            event.preventDefault();
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                //Look for the selected product in the cart (same ID + same color)
                let foundProduct = cart.find(
                    (p) => p.productId == cart[i].productId && p.productColor == cart[i].productColor
                );
                //Increment the quantity of the product
                if (foundProduct !== undefined) {
                    if (modifyQuantity[i].value > 100) {
                        alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
                        modifyQuantity[i].value = foundProduct.productQuantity
                    }
                    else {
                        foundProduct.productQuantity = modifyQuantity[i].value;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert(`La quantité du produit a été modifié`);
                    }
                }
            }
        })
    }
}

modifyProductQuantity();

//Cart order form validation//

//Validate the data entered by the user in the form and display an error message if needed

//***First name validation
const firstName = document.getElementById("firstName");
const firstNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

firstName.addEventListener("change", function (event) {
    event.preventDefault();
    validFirstName();
})

function validFirstName() {
    if (!firstNameRegex.test(firstName)) {
        firstNameErrorMsg.textContent = `Prénom invalide`;
    }
    else {
        firstNameErrorMsg.textContent = "";
    }
}


//Last name validation
const lastName = document.getElementById("lastName");
const lastNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

lastName.addEventListener("change", function (event) {
    event.preventDefault();
    validLastName();
})

function validLastName() {
    if (!lastNameRegex.test(lastName)) {
        lastNameErrorMsg.textContent = `Nom invalide`;
    }
    else {
        lastNameErrorMsg.textContent = "";
    }
}

//Address validation
const address = document.getElementById("address");
const addressRegex = new RegExp(/^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/);
const addressErrorMsg = document.getElementById("addressErrorMsg");

address.addEventListener("change", function (event) {
    event.preventDefault();
    validAddress();
})

function validAddress() {
    if (!addressRegex.test(address)) {
        addressErrorMsg.textContent = `Addres invalide`;
    }
    else {
        addressErrorMsg.textContent = "";
    }
}

//City validation
const city = document.getElementById("city");
const cityRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const cityErrorMsg = document.getElementById("cityErrorMsg");

city.addEventListener("change", function (event) {
    event.preventDefault();
    validCity();
})

function validCity() {
    if (!addressRegex.test(city)) {
        cityErrorMsg.textContent = `Ville invalide`;
    }
    else {
        cityErrorMsg.textContent = "";
    }
}

//Email validation
const email = document.getElementById("email");
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+$/);
const emailErrorMsg = document.getElementById("emailErrorMsg");

email.addEventListener("change", function (event) {
    event.preventDefault();
    validEmail();
})

function validEmail() {
    if (!emailRegex.test(email)) {
        emailErrorMsg.textContent = `Email invalide`;
    }
    else {
        emailErrorMsg.textContent = "";
    }
}



//Recover the DOM element that contain the order form
const order = document.getElementById('order');

//Create a contact object (from the form data)
let orderProducts = [];
for (let i = 0; i < localStorage.getItem("cart").length; i++) {
    orderProducts.push(localStorage.getItem("cart")[i].orderProducts);
}

//Create a table of products
let orderContact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email
};

//Listen to the click on the order button and start a last verification before sending the request
order.addEventListener("click", function (event) {
    event.preventDefault();

    //If there cart is empty, send an alert
    if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == []) {
        alert(`Votre panier est vide`);
    }
    //If the form is invalid, send an alert 
    //else if (
    //    !firstNameRegex.test(firstName) ||
    //    !lastNameRegex.test(lastName) ||
    //    !addressRegex.test(address) ||
    //    !cityRegex.test(city) ||
    //    !emailRegex.test(email)
    //) {
    //    alert(`Le formulaire est incorrect`);
    //}
    //If the verification goes well, save the order details in the local storage 
    else {
        localStorage.setItem('order', JSON.stringify(orderProducts, orderContact));
        sendToServer();
    }
})

//Make a POST request on the API and retrieve the ID of command in the response
function sendToServer() {
    //Define the fetch options for the request
    const fetchOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderProducts, orderContact),
    }

    fetch('http://localhost:3000/api/products/order', fetchOptions)
        .then(function (response) {
            console.log(response);
            //Check the URL and retrieve the response in the json format
            if (response.ok) {
                return response.json();
            }
        })
        //Redirect the user to the Confirm page, passing the id of command in the URL
        .then(function (order) {
            console.log(order);  

            orderConfirmation();

            function orderConfirmation() {
                if (window.confirm(`La commande a été enregistré. Pour consulter le numéro de commande, cliquez sur OK`)) {
                    window.location.href = `./confirmation.html?id=${order._id}`;
                }
            };
        })
        .catch(function (error) {
            //Block of code to handle errors
            return error;
        })    
}