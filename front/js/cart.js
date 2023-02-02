//From the Cart page, retrieve the cart (the array) via localStorage

function getCartFromLocalStorage() {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);

        for (let product in cart) {

            //Recover the DOM element that will host the cart products 
            const sectionCartItems = document.getElementById("cart__items");

            //Create an "article" tag for the product
            const cartItem = document.createElement("article");
            cartItem.className = "cart__item";
            cartItem.setAttribute('data-id', cart[product].productId);
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
        }
    }
    else {
        alert(`Votre panier est vide`);
        console.log(alert);
    }
}

getCartFromLocalStorage();
