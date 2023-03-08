//Retrieve the cart via the local storage and display the cart content//
class Product {

    constructor(data) {
        this.id = data._id;
        this.image = data.imageUrl;
        this.altTxt = data.altTxt;
        this.title = data.name;
        this.description = data.description;
        this.price = data.price;
        this.color = undefined;
        this.quantity = undefined;
    }

    //Insert the product details into the product page
    displayCartContent() {

        //Recover the DOM element that will host the cart products 
        const sectionCartItems = document.getElementById("cart__items");

        //Create an "article" tag for the product and set its attributes
        const cartItem = document.createElement("article");
        cartItem.className = "cart__item";
        cartItem.setAttribute('data-id', this.id);
        cartItem.setAttribute('data-color', this.color);
        //Attach the product to the cart products section
        sectionCartItems.appendChild(cartItem);

        //Create a "div" tag to contain the product image
        const cartItemImage = document.createElement("div");
        cartItemImage.className = "cart__item__img";
        //Attach the "div" to the product section
        cartItem.appendChild(cartItemImage);

        //Create an "img" tag for the product image
        const itemImage = document.createElement("img");
        itemImage.src = this.image;
        itemImage.alt = this.altTxt;
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
        productTitle.textContent = this.title;
        //Attach the title to the product 
        cartItemContentDescription.appendChild(productTitle);

        //Create a "p" tag for the product color
        const productColor = document.createElement("p");
        productColor.textContent = this.color;
        //Attach the color to the product
        cartItemContentDescription.appendChild(productColor);

        //Create a "p" tag for the product price   
        const productPrice = document.createElement("p");
        productPrice.textContent = this.price + " €";
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
        quantityInput.value = this.quantity;
        //Listen to the changes on the quantity inputs and retrieve the values 
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                this.modifyQuantity(quantityInput, cart);
            }
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
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                this.deleteFromCart(cart);
            }
        });
        //Attach the delete option to the product
        cartItemContentSettingsDelete.appendChild(deleteItem);

        //Recover the DOM element that contain the total quantity
        const totalQuantityInput = document.getElementById("totalQuantity");
        //Insert the total quantity to the section
        totalQuantityInput.textContent = this.totalQuantity();

        //Recover the DOM element that contain the total price       
        const totalPriceInput = document.getElementById("totalPrice");
        //Insert the total price to the section
        totalPriceInput.textContent = this.totalPrice();
    }

    totalQuantity() {
        let totalQuantity = 0;
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (let item of cart) {
                totalQuantity += item.quantity;
            }
        }
        return totalQuantity;
    }

    totalPrice() {
        let totalPrice = 0;
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (let item of cart) {
                totalPrice += item.quantity * parseInt(this.price);
            }
        }
        return totalPrice;
    }

    modifyQuantity(quantityInput, cart) {
        //If the new quantity is bigger than 100 units, alert and reset to the initial quantity     
        if (parseInt(quantityInput.value) > 100) {
            alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
        }
        else {
            this.quantity = parseInt(quantityInput.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`La quantité du produit a été modifié`);
        }
        window.location.reload();
    }

    deleteFromCart(cart) {
        if (window.confirm(`Le produit va être supprimé du panier. Cliquez sur OK pour confirmer`)) {
            //Look for the selected product (same ID + same color) and keep everything different from it 
            cart = cart.filter(
                (p) => p.id !== this.id || p.color !== this.color
            );
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Le produit a été supprimer")
            window.location.reload();
        }
        else {
            alert("Le produit n'a pas été supprimé")
        }
    }
}

//Get cart from local storage
let getCartFromLocalStorage = () => {
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        //Browse the cart content to display the product details
        for (let item of cart) {
            //Request the API to get the products to display//
            const urlPrice = 'http://localhost:3000/api/products/' + item.id;
            fetch(urlPrice)
                //Check the URL and retrieve the response in the json format
                .then((response) => response.json())
                //Browse the response data to insert each product in the homepage
                .then((data) => {
                    let sofa = new Product(data);
                    sofa.color = item.color;
                    sofa.quantity = item.quantity;
                    sofa.displayCartContent();
                })
            /*//Block of code to handle errors
            .catch((error) => {
                alert(`Une erreur s'est produite. Veuillez réessayer`);
            })*/
        }
    }
    else if (cart == undefined || cart.length == 0) {
        alert(`Votre panier est vide`);
    }
}
getCartFromLocalStorage();