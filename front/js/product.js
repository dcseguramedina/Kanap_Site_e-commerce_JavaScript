//Insert the product and its details into the product page//
let displayProduct = () => {
    //Get the Id of the product to display
    let productId = () => new URL(window.location.href).searchParams.get("id");
    //Request the API to get the product to display
    const urlId = 'http://localhost:3000/api/products/' + productId();
    fetch(urlId)
        //Check the URL and retrieve the response in the json format
        .then((response) => response.json())
        //Insert product details in the page
        .then((product) => {
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

            //Call the function to set the color options for the product
            setColorOptions(product);

            //Create a newProduct object containing the details of the selected product
            const newProduct = {
                productId: product._id,
                productImage: product.imageUrl,
                productAltTxt: product.altTxt,
                productName: product.name,
                productDescritpion: product.description,
                productColor: undefined,
                productQuantity: undefined,
                productPrice: undefined
            };

            //Listen to the changes on the color inputs and retrieve the values
            //Recover the DOM elements that contain the color of the product
            const selectColor = document.getElementById("colors");
            selectColor.addEventListener("change", (event) => {
                event.preventDefault();
                newProduct.productColor = selectColor.value;
            })

            //Listen to the changes on the quantity inputs and retrieve the values
            //Recover the DOM elements that contain the quantity of the product
            const quantityInput = document.getElementById("quantity");
            quantityInput.addEventListener("change", (event) => {
                event.preventDefault();
                newProduct.productQuantity = parseInt(quantityInput.value);
            })

            //Listen to the click on the "addToCart" button and check the product details inputs 
            //Recover the DOM element containing the "addToCart" button
            const addToCart = document.getElementById("addToCart");
            addToCart.addEventListener("click", (event) => {
                event.preventDefault();
                if (checkColorAndQuantityInputs(newProduct.productColor, newProduct.productQuantity) == true) {
                    addProductToCart(newProduct);
                };
            })
        })
        //Block of code to handle errors
        .catch((error) => {
            alert(`Une erreur s'est produite. Veuillez réessayer`);
        })
}
displayProduct();

//Set the color options for the product
let setColorOptions = (product) => {
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

//Check the color and quantity inputs and display an alert if needed
let checkColorAndQuantityInputs = (productColor, productQuantity) => {
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
let addProductToCart = (newProduct) => {
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
let findCartProduct = (cart, product) => {
    return cart.find(
        (p) => p.productId == product.productId && p.productColor == product.productColor
    )
}

//If there selected product is already in the cart, modify quantity
let incrementProductQuantity = (cart, foundProduct, productQuantity) => {
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
let addNewProduct = (cart, newProduct) => {
    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    addedProductToCartConfirmation();
}

//Added products to cart confirmation
let addedProductToCartConfirmation = () => {
    if (window.confirm(`Le produit a été ajoutée au panier. Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
}