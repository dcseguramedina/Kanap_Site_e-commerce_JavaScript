//Insert the products into the product page//
class Product {

    constructor(data) {
        this.id = data._id;
        this.image = data.imageUrl;
        this.altTxt = data.altTxt;
        this.title = data.name;
        this.description = data.description;        
        this.color = undefined;
        this.quantity = undefined;
    }

    //Set the color options of the product
    setColorOptions(data) {
        for (let color of data.colors) {
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

        //Recover the DOM elements that contain the color of the product
        const selectColor = document.getElementById("colors");
        //Listen to the changes on the color inputs and retrieve the values
        selectColor.addEventListener("change", (event) => {
            event.preventDefault();
            this.color = selectColor.value;
        })

        //Recover the DOM elements that contain the quantity of the product
        const quantityInput = document.getElementById("quantity");
        //Listen to the changes on the quantity inputs and retrieve the values
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            this.quantity = parseInt(quantityInput.value);
        })

        //Recover the DOM element containing the "addToCart" button
        const addToCart = document.getElementById("addToCart");
        //Listen to the click on the "addToCart" button and check the product details inputs 
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
        // If the ls is empty and/or the selected product is not in the cart, add a new product
        cart.push(this);
        localStorage.setItem("cart", JSON.stringify(cart));
        if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
            window.location.href = "cart.html";
        }
    }
}

//Get the Id of the selected product
let getId = () => {
    return new URL(window.location.href).searchParams.get("id");
};

//Request the API to get the products to display//
const urlId = 'http://localhost:3000/api/products/' + getId();
fetch(urlId)
    //Check the URL and retrieve the response in the json format
    .then((response) => response.json())
    //Browse the response data to insert each product in the homepage
    .then((data) => {
        let sofa = new Product(data);
        sofa.setColorOptions(data);
        sofa.setPrice(data);
        sofa.displayDetails();
    })
    //Block of code to handle errors
    .catch((error) => {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    })