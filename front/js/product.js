//Create a class => "Product" to work with//
class Product {
//Define the product details
    constructor(id, image, altTxt, title, description, color, undefined) {
        this.id = id;
        this.image = image;
        this.altTxt = altTxt;
        this.title = title;  
        this.description = description;     
        this.color = color;
        this.quantity = undefined;
    }

    //Set the color options of the product
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
//Set the price of the product (using the API data) 
    setPrice(data) {
        //Recover the DOM element that will host the product price and set the content
        const sectionItemPrice = document.getElementById("price");       
        sectionItemPrice.textContent = data.price;
    }

    //Insert the product details into the product page
    displayDetails() {
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

    //Check the color and quantity inputs and display an alert if needed
    validateColorAndQuantityInputs() {
        //If the selected quantity is between 1 and 100 units
        if (this.quantity > 0 && this.quantity <= 100 && this.color) {
            return true
        }
        //If the selected quantity exceeds 100 units
        else if (this.color && this.quantity > 100) {
            alert(`La quantité maximale est de 100 unités`);
            return false
        }
        //If the color and quantity have not been selected
        else {
            alert(`Veuillez sélectionner une couleur et une quantité afin de continuer`);
            return false
        }
    }

    //Add the product to cart 
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
                //If the selected quantity exceeds 100 units
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
}

//Insert the products into the product page//

//Get the Id of the selected product
let getId = () => {
    return new URL(window.location.href).searchParams.get("id");
};

//Request the API to get the product to display
const urlId = 'http://localhost:3000/api/products/' + getId();
fetch(urlId)
    //Check the URL and retrieve the response in the json format
    .then((response) => response.json())
    //Browse the response data to insert the product in the product page
    .then((data) => {
        //Create an object => "kanap" and set the details with the API data
        let kanap = new Product(data._id, data.imageUrl, data.altTxt, data.name, data.description, data.colors, undefined);
        //Set the color options 
        kanap.setColorOptions();
        //Set the price (directly from the API in order to keep it out of the local storage)
        kanap.setPrice(data);
        //Display the object and its details 
        kanap.displayDetails();
    })
    //Block of code to handle errors
    .catch((error) => {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    })