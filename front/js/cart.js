//Retrieve the cart via the local storage and display the cart content//

//Get cart from local storage
let getCartFromLocalStorage = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
    }
    return cart
}

let displayCartContent = () => {

    let cart = getCartFromLocalStorage();

    if (cart == undefined || cart.length == 0) {
        alert(`Votre panier est vide`);
    }

    //Browse the cart content to display the product details
    for (let product of cart) {
        //Recover the DOM element that will host the cart products 
        const sectionCartItems = document.getElementById("cart__items");

        //Create an "article" tag for the product and set its attributes
        const cartItem = document.createElement("article");
        cartItem.className = "cart__item";
        cartItem.setAttribute('data-id', product.productId);
        cartItem.setAttribute('data-color', product.productColor);
        //Attach the product to the cart products section
        sectionCartItems.appendChild(cartItem);

        //Create a "div" tag to contain the product image
        const cartItemImage = document.createElement("div");
        cartItemImage.className = "cart__item__img";
        //Attach the "div" to the product section
        cartItem.appendChild(cartItemImage);

        //Create an "img" tag for the product image
        const itemImage = document.createElement("img");
        itemImage.src = product.productImage;
        itemImage.alt = product.productAltTxt;
        //Attach the product image to the product
        cartItemImage.appendChild(itemImage);

        //Create a "div" tag to contain the product content
        const cartItemContent = document.createElement("div");
        cartItemContent.className = "cart__item__content";
        //Attach the "div" to the product content section
        cartItem.appendChild(cartItemContent);

        //Create a "div" tag to contain the product description
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.className = "cart__item__content__description";
        //Attach the "div" to the product description section
        cartItemContent.appendChild(cartItemContentDescription);

        //Create an "h2" tag for the product title
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.productName;
        //Attach the title to the product 
        cartItemContentDescription.appendChild(productTitle);

        //Create a "p" tag for the product color
        const productColor = document.createElement("p");
        productColor.textContent = product.productColor;
        //Attach the color to the product
        cartItemContentDescription.appendChild(productColor);

        //Create a "p" tag for the product price   
        const productPrice = document.createElement("p");
        productPrice.className = "itemPrice";

        const urlPrice = 'http://localhost:3000/api/products/' + product.productId;
        fetch(urlPrice)
            //Check the URL and retrieve the response in the json format
            .then((response) => response.json())
            .then((product) => {
                let price = product.price;
                productPrice.textContent = price + " €";
                
            })
            //Block of code to handle errors
            .catch((error) => {
                alert(`Une erreur s'est produite. Veuillez réessayer`);
            })       

        //Attach the "p" to the product 
        cartItemContentDescription.appendChild(productPrice);

        //Create a "div" tag to contain the product settings
        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.className = "cart__item__content__settings";
        //Attach the "div" to the product settings section
        cartItemContent.appendChild(cartItemContentSettings);

        //Create a "div" tag to contain the product quantity
        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        //Attach the "div" to the product quantity section
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        //Create a "p" tag for the product quantity
        const quantity = document.createElement("p");
        quantity.textContent = "Qté : ";
        //Attach the quantity to the product
        cartItemContentSettingsQuantity.appendChild(quantity);

        //Create an "input" tag for the product quantity details and set its attributes
        const quantityInput = document.createElement("input");
        quantityInput.className = "itemQuantity";
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("name", "itemQuantity");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("max", "100");
        quantityInput.value = product.productQuantity;
        //Listen to the changes on the quantity inputs and retrieve the values 
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            modifyProductQuantity(cart, product, quantityInput);
        });
        //Attach the quantity details to the product
        cartItemContentSettingsQuantity.appendChild(quantityInput);

        //Create a "div" tag to contain the delete option
        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        //Attach the "div" to the product settings section
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        //Create a "p" tag for the delete option
        const deleteItem = document.createElement("p");
        deleteItem.className = "deleteItem";
        deleteItem.textContent = "Supprimer";
        //Listen to the click on the "deleteItem" button and delete the products
        deleteItem.addEventListener("click", (event) => {
            event.preventDefault();
            deleteItemFromCart(cart, product);
        });
        //Attach the delete option to the product
        cartItemContentSettingsDelete.appendChild(deleteItem);

        //Recover the DOM element that contain the total quantity
        const totalQuantityInput = document.getElementById("totalQuantity");
        //Insert the total quantity to the section
        totalQuantityInput.textContent = totalQuantity();

        //Recover the DOM element that contain the total price       
        const totalPriceInput = document.getElementById("totalPrice");
        //Insert the total price to the section
        totalPriceInput.textContent = totalPrice();
    }
}
displayCartContent();

function totalQuantity() {
    let totalQuantity = 0;
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (let product of cart) {
            totalQuantity += product.productQuantity;
        }
    }
    return totalQuantity;
}

/*function getP() {
    let productPrice = document.getElementsByClassName("itemPrice");
    console.log(productPrice);
    let price = 0;
    for (let i = 0; i < productPrice.length; i++) {
        price = productPrice[i].textContent;
        console.log(price);
        return price;
    }
}*/

function totalPrice(price) {
    let totalPrice = 0;
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (let product of cart) {
            totalPrice += product.productQuantity * parseInt(price);
        }
    }
    return totalPrice;
}

let modifyProductQuantity = (cart, product, quantityInput) => {
    //If the new quantity is bigger than 100 units, alert and reset to the initial quantity     
    if (parseInt(quantityInput.value) > 100) {
        alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
    }
    else {
        product.productQuantity = parseInt(quantityInput.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`La quantité du produit a été modifié`);
    }
    window.location.reload();
}

let deleteItemFromCart = (cart, product) => {
    if (window.confirm(`Le produit va être supprimé du panier. Cliquez sur OK pour confirmer`)) {
        //Look for the selected product (same ID + same color) and keep everything different from it 
        cart = cart.filter(
            (p) => p.productId !== product.productId || p.productColor !== product.productColor
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Le produit a été supprimer")
        window.location.reload();
    }
    else {
        alert("Le produit n'a pas été supprimé")
    }
}