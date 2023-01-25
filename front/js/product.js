//Get the id of the product to display
const str = window.location.href;
const url = new URL(str);
let productId = url.searchParams.get("id");

//Insert a product and its details into the product page
fetch('http://localhost:3000/api/products/' + productId)
    .then(function (response) {
        //Check the URL and retrieve the response in the json format
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (product) {

        //Recover the DOM element that will host the product image 
        const sectionItemImage = document.getElementsByClassName("item__img")[0];

        //Create an "img" tag for the product image
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        imageElement.alt = product.altTxt;
        //Attach the product image to the image section 
        sectionItemImage.appendChild(imageElement);

        //Recover the DOM element that will host the product title and set the content
        const sectionItemTitle = document.getElementById("title");
        sectionItemTitle.textContent = product.name;

        //Recover the DOM element that will host the product price and set the content
        const sectionItemPrice = document.getElementById("price");
        sectionItemPrice.textContent = product.price;

        //Recover the DOM element that will host the product description and set the content 
        const sectionItemDescription = document.getElementById("description");
        sectionItemDescription.textContent = product.description;

        //Set the color options for the product
        for (let color of product.colors) {

            //Recover the DOM element that will host the "option" tag
            const selectColor = document.getElementById("colors");
            //Create an "option" tag for the color option
            const colorElement = document.createElement("option");
            colorElement.value = color;
            colorElement.textContent = color;
            //Attach the "option" tag to the select section 
            selectColor.appendChild(colorElement);
        }

    })
    .catch(function (error) {
        //Block of code to handle errors
        return error;
    })

//Add products to cart

//Create variables to retrieve input values
let productColor = "";
let productQuantity = "";

//Recover the DOM elements that contain the color and the quantity of the product
const quantityInput = document.getElementById("quantity");
const colorSelect = document.getElementById("colors");

//Listen to the changes on the inputs and retrieve the values
colorSelect.addEventListener("change", function (event) {
    event.preventDefault();
    productColor = colorSelect.value;
    console.log(productColor);
})

quantityInput.addEventListener("change", function (event) {
    event.preventDefault();
    productQuantity = quantityInput.value;
    console.log(productQuantity);
})

//Listen to the click on the "addToCart" button 
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function (event) {
    event.preventDefault();
    SaveToLocalStorage();
})

//Save the addToCart product into the local storage     
function SaveToLocalStorage() {
    if (productQuantity > 0 && productQuantity <= 100 && productQuantity != 0) {
        //Set the details of the added product  
        let productDetails = {
            productId: productId,
            productColor: productColor,
            productQuantity: productQuantity
        }
        //Initialize the local storage in order to stock the details of the added product 
        localStorage.setItem("saveCart", JSON.stringify(productDetails));
        console.log(productDetails);
    }
    else {
        alert()
    }
}

//Get the addToCart product from the local storage
function getFromLocalStorage() {
    let cart = localStorage.getItem("saveCart");
    //If the is no product return an empty array
    if (cart == null) {
        return [];
    }
    //If there is a product return the product details
    else {
        return JSON.parse(productDetails);
    }
}

//Add the selected products to cart
function addProductsToCart () {
    let cart = getFromLocalStorage();
    //If the product was already present in the cart (same ID + same color) increment the quantity in the array
    let foundProduct = cart.find(p => p.id == productDetails.productId && p.quantity == productDetails.productQuantity);
    if(foundProduct != undefined) {
        foundProduct.productQuantity++;
    }
    //if the product was not already present in the cart add a new element in the array
    else {
        productDetails.productQuantity = 1;
        cart.push(productDetails);
    }    
    SaveToLocalStorage();
}