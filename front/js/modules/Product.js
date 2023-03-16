//Create a class => "Product" and add all the methods that will allow us to work allong the pages//
export default class Product {
    //Define the product details//
    constructor(id, image, altTxt, title, description, color, price, undefined) {
        this.id = id;
        this.image = image;
        this.altTxt = altTxt;
        this.title = title;
        this.description = description;
        this.color = color;
        this.price = price;
        this.quantity = undefined
    }
    //Define the methods for the product//

    //Homepage - Display the set of products
    displaySetDetails() {
        //Recover the DOM element that will host the set of products 
        const itemsSection = document.getElementById("items");

        //Create an "a" tag to make the link to a product
        const itemLink = document.createElement("a");
        //Set the "a" tag and its "href" attribute
        itemLink.href = `./product.html?id=${this.id}`;
        //Attach the "a" tag to the items section
        itemsSection.appendChild(itemLink);

        //Create an "article" tag dedicated to a product
        const itemArticle = document.createElement("article");
        //Attach the "article" tag to the link section
        itemLink.appendChild(itemArticle);

        //Create an "img" tag for each product
        const itemImage = document.createElement("img");
        itemImage.src = this.image;
        itemImage.alt = this.altTxt;
        //Attach the "img" tag of each product to the article section
        itemArticle.appendChild(itemImage);

        //Create a "h3" tag for each product
        const itemName = document.createElement("h3");
        itemName.textContent = this.title;
        //Attach the "h3" tag of each product to the article section
        itemArticle.appendChild(itemName);

        //Create a "p" tag for each product
        const itemDescription = document.createElement("p");
        itemDescription.textContent = this.description;
        //Attach the "p" tag of each product to the article section
        itemArticle.appendChild(itemDescription);
    }
    //Product page - Set the color options of the product
    setColorOptions() {
        for (let color of this.color) {
            //Recover the DOM element that will host the "option" tag 
            const selectColor = document.getElementById("colors");
            //Create an "option" tag for the color option
            const colorOptions = document.createElement("option");
            colorOptions.value = color;
            colorOptions.textContent = color;
            //Attach the "option" tag to the select section 
            selectColor.appendChild(colorOptions);
        }
    }
    //Product page - Set the price of the product (using the API data) 
    setPrice(data) {
        //Recover the DOM element that will host the product price and set the content
        const sectionItemPrice = document.getElementById("price");
        sectionItemPrice.textContent = data.price;
    }
    //Product page - Display the product details
    displaySingleDetails() {
        //Recover the DOM element that will host the product image 
        const sectionItemImage = document.getElementsByClassName("item__img")[0];

        //Create an "img" tag for the product image
        const itemImage = document.createElement("img");
        itemImage.src = this.image;
        itemImage.alt = this.altTxt;
        //Attach the product image to the image section 
        sectionItemImage.appendChild(itemImage);

        //Recover the DOM element that will host the product title and set the content
        const sectionItemTitle = document.getElementById("title");
        sectionItemTitle.textContent = this.title;

        //Recover the DOM element that will host the product description and set the content 
        const sectionItemDescription = document.getElementById("description");
        sectionItemDescription.textContent = this.description;

        //Recover the DOM elements that contains the color of the product
        const selectColor = document.getElementById("colors");
        //Listen to the changes on the color inputs and retrieve the values
        selectColor.addEventListener("change", (event) => {
            event.preventDefault();
            this.color = selectColor.value;
        })

        //Recover the DOM elements that contains the quantity of the product
        const quantityInput = document.getElementById("quantity");
        //Listen to the changes on the quantity inputs and retrieve the values
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            this.quantity = parseInt(quantityInput.value);
        })

        //Recover the DOM element that contains the "addToCart" button
        const addToCart = document.getElementById("addToCart");
        //Listen to the click on the "addToCart" button to check the inputs and add to the cart  
        addToCart.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.validateColorAndQuantityInputs() == true) {
                this.addToCart();
            }
        })
    }
    //Product page - Check the color and quantity inputs and display an alert if needed
    validateColorAndQuantityInputs() {
        //If the selected quantity is between 1 and 100 units, validate
        if (this.quantity > 0 && this.quantity <= 100 && this.color) {
            return true
        }
        //If the selected quantity exceeds 100 units, display an alert
        else if (this.color && this.quantity > 100) {
            alert(`La quantité maximale est de 100 unités`);
            return false
        }
        //If the color and quantity have not been selected, display an alert
        else {
            alert(`Veuillez sélectionner une couleur et une quantité afin de continuer`);
            return false
        }
    }
    //Product page - Add the product to cart 
    addToCart() {
        //CReate a cart (an empty array)
        let cart = [];
        // If a cart already exists in the local storage, retrieve the cart
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            //Check if there selected product is already in the cart (same ID + same color)
            let foundProduct = cart.find(
                (p) => p.id == this.id && p.color == this.color
            );
            //If the selected product is already in the cart, increment the quantity
            if (foundProduct !== undefined) {
                foundProduct.quantity += this.quantity;
                //If the selected quantity exceeds 100 units, display an alert 
                if (foundProduct.quantity > 100) {
                    alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
                }
                else {
                    localStorage.setItem("cart", JSON.stringify(cart));
                    if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
                        window.location.href = "cart.html";
                    }
                }
                return;
            }
        }
        // If the local storage is empty and/or the selected product is not in the cart, add a new product
        cart.push(this);
        localStorage.setItem("cart", JSON.stringify(cart));
        if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
            window.location.href = "cart.html";
        }
    }
    //Cart page - Display the cart content
    displayCartContent(cart) {
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
                this.modifyQuantity(cart, parseInt(quantityInput.value));
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
        totalQuantityInput.textContent = this.totalQuantity(parseInt(totalQuantityInput.textContent));

        //Recover the DOM element that contain the total price       
        const totalPriceInput = document.getElementById("totalPrice");
        //Insert the total price to the section        
        totalPriceInput.textContent = this.totalPrice(parseInt(totalPriceInput.textContent));
    }
    //Cart page - Get the total quantity
    totalQuantity(totalQuantityInput) {
        if (!totalQuantityInput) {
            totalQuantityInput = 0
        }
        return totalQuantityInput += this.quantity;
    }
    //Cart page - Get the total price
    totalPrice(totalPriceInput) {
        if (!totalPriceInput) {
            totalPriceInput = 0
        }
        return totalPriceInput + (this.quantity * this.price);
    }
    //Cart page - Modify the quantity of a product
    modifyQuantity(cart, quantityInput) {
        //If the new quantity is bigger than 100 units, alert and reset to the initial quantity     
        if (quantityInput > 100) {
            alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
        }
        else {
            this.quantity = quantityInput;
            let foundProduct = cart.find(
                (p) => p.id == this.id && p.color == this.color
            );
            foundProduct.quantity = this.quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`La quantité du produit a été modifié`);
        }
        window.location.reload();
    }
    //Cart page - Delete a product from the cart
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