//Get the id of the product to display//
const str = window.location.href;
const url = new URL(str);
let productId = url.searchParams.get("id");
let productColor;
let productQuantity;

//Insert a product and its details into the product page//
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
        let productImage = product.imageUrl;
        //Attach the product image to the image section 
        sectionItemImage.appendChild(imageElement);

        //Recover the DOM element that will host the product title and set the content
        const sectionItemTitle = document.getElementById("title");
        sectionItemTitle.textContent = product.name;
        let productName = product.name;

        //Recover the DOM element that will host the product price and set the content
        const sectionItemPrice = document.getElementById("price");
        sectionItemPrice.textContent = product.price;
        let productPrice = product.price;

        //Recover the DOM element that will host the product description and set the content 
        const sectionItemDescription = document.getElementById("description");
        sectionItemDescription.textContent = product.description;
        let productDescritpion = product.description;

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

        //Get updated inputs once the color and quatity of the product qre selected

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
            productQuantity = parseInt(quantityInput.value);
            console.log(productQuantity);
        })
        //Call the function to add the selected products to the cart 
        addProductToCart()
    })
    .catch(function (error) {
        //Block of code to handle errors
        return error;
    })

//Add product to cart and confirm//
function addProductToCart() {
    //Recover the DOM element containing the "addToCart" button
    const addToCart = document.getElementById("addToCart");

    //Listen to the click on the "addToCart" button 
    addToCart.addEventListener("click", function (event) {
        event.preventDefault();
        //If the cart already has at least 1 item
        //Check if the selected quantity is between 1 and 100 units
        if (productQuantity > 0 && productQuantity <= 100 && productColor) {
            console.log("quantity:" + productQuantity);
            console.log("color:" + productColor);

            //If a cart already exists in the local storage
            if (localStorage.getItem("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                console.log(cart);
                //Check if there selected product is already in the cart (same ID + same color)
                let foundProduct = cart.find(
                    (p) => p.productId == productId && p.productColor == productColor
                );
                console.log(foundProduct);
                //If the selected product is already in the cart, increment the quantity
                if (foundProduct !== undefined) {                    
                    foundProduct.productQuantity += productQuantity;
                    if (foundProduct.productQuantity > 100) {
                        alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
                        console.log(alert);
                    }
                    else {
                        localStorage.setItem("cart", JSON.stringify(cart));
                        console.log(cart);
                        addedProductToCartConfirmation();
                    }                    
                }
                //if the selected product is not in the cart, add a new product
                else {
                    let newProduct = {
                        productId: productId,
                        productColor: productColor,
                        productQuantity: productQuantity
                    }
                    cart.push(newProduct);
                    console.log(newProduct);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    console.log(cart);
                    addedProductToCartConfirmation();
                }
            }
            //If the cart is empty, add a new product
            else {
                let cart = [];
                let newProduct = {
                    productId: productId,
                    productColor: productColor,
                    productQuantity: productQuantity
                }
                cart.push(newProduct);
                console.log(newProduct);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log(cart);
                addedProductToCartConfirmation();
            }
        }
        //If the selected quantity exceeds 100 units
        else if (productColor && productQuantity > 100 ) {
            alert(`La quantité maximale est de 100 unités`);
            console.log(alert);
        }
        //If the color and quantity have not been selected
        else {
            alert(`Veuillez sélectionner une couleur et une quantité afin de continuer`);
            console.log(alert);
        }
    })

    //Added products to cart confirmation
    function addedProductToCartConfirmation() {
        if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
            window.location.href = "cart.html";
        }
    }
}