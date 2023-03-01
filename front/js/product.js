//Insert a product and its details into the page product and add to the cart//

//Get the Id of the product to display
function getProductId() {
    const str = window.location.href;
    const url = new URL(str);
    return url.searchParams.get("id")
}

//Insert the product and its details into the product page
function displayProduct() {

    let productId = getProductId();

    //Request the API to get the product to display
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
            setColorOptions(product);     
            
            let newProduct = {
                productId: product._id,
                productImage: product.imageUrl,
                productAltTxt: product.altTxt,
                productName: product.name,
                productDescritpion: product.description,
                productColor: undefined,
                productQuantity: undefined
            }

            //Listen to the changes on the color inputs and retrieve the values
            addEventToColor(newProduct);

            //Listen to the changes on the quantity inputs and retrieve the values
            addEventToQuantity(newProduct);

            //Listen to the click on the "addToCart" button and check the product details inputs 
            addEventToAddToCart(newProduct);
        })
        .catch(function (error) {
            //Block of code to handle errors
            return error;
        })
}
displayProduct();

function setColorOptions(product) {
    for (let color of product.colors) {
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

function addEventToColor(newProduct) {
    //Recover the DOM elements that contain the color of the product
    const selectColor = document.getElementById("colors");
    selectColor.addEventListener("change", function (event) {
        event.preventDefault();
        newProduct.productColor = selectColor.value;
    })
}

function addEventToQuantity(newProduct) {
    //Recover the DOM elements that contain the quantity of the product
    const quantityInput = document.getElementById("quantity");
    quantityInput.addEventListener("change", function (event) {
        event.preventDefault();
        newProduct.productQuantity = parseInt(quantityInput.value);
    })
}

function addEventToAddToCart(newProduct) {
    //Recover the DOM element containing the "addToCart" button
    const addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", function (event) {
        event.preventDefault();
        if (checkColorAndQuantityInputs(newProduct.productColor, newProduct.productQuantity) == true) {
            addProductToCart(newProduct);
        };
    })
}

//Check the color and quantity inputs and display an alert if needed
function checkColorAndQuantityInputs(productColor, productQuantity) {
    //If the selected quantity is between 1 and 100 units
    if (productQuantity > 0 && productQuantity <= 100 && productColor) {
        return true;
    }
    //If the selected quantity exceeds 100 units
    else if (productColor && productQuantity > 100) {
        alert(`La quantité maximale est de 100 unités`);
        return false;
    }
    //If the color and quantity have not been selected
    else {
        alert(`Veuillez sélectionner une couleur et une quantité afin de continuer`);
        return false;
    }
}

//Add the product to cart 
function addProductToCart(newProduct) {
    let cart = []; 
    // If a cart already exists in the local storage
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        //Check if there selected product is already in the cart (same ID + same color)
        let foundProduct = findCartProduct(cart, newProduct);
        //If the selected product is already in the cart, modify quantity
        if (foundProduct !== undefined) {
            incrementProductQuantity(cart, foundProduct, newProduct.productQuantity);
            return;
        }
    }    
    addNewProduct(cart, newProduct);
}
//Check if there selected product is already in the cart (same ID + same color)
function findCartProduct(cart, product) {
    return cart.find(
        (p) => p.productId == product.productId && p.productColor == product.productColor
    )
}

//If there selected product is already in the cart, modify quantity
function incrementProductQuantity(cart, foundProduct, productQuantity) {
    //If the selected product is already in the cart, increment the quantity
    foundProduct.productQuantity += productQuantity;
    if (foundProduct.productQuantity > 100) {
        alert(`La quantité maximale ne peut pas dépasser les 100 unités`);
    }
    else {
        localStorage.setItem("cart", JSON.stringify(cart));
        addedProductToCartConfirmation();
    }
}

// If the selected product is not in the cart, add a new product and confirm
function addNewProduct(cart, newProduct) { 
    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    addedProductToCartConfirmation();
}

//Added products to cart confirmation
function addedProductToCartConfirmation() {
    if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
}