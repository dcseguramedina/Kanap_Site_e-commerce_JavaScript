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
            for(let color of product.colors) {
                
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
colorSelect.addEventListener("change", function(event) {
    event.preventDefault();
    productColor = colorSelect.value;
    console.log(productColor);
})

quantityInput.addEventListener("change", function(event) {
    event.preventDefault();
    productQuantity = quantityInput.value;
    console.log(productQuantity);
})

//Listen to the click on the "addToCart" button 
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function(event) {
    event.preventDefault();
    addToCartClicked();
})
//Add the selected product to the cart (local storage)     
function addToCartClicked() {
    if (productQuantity > 0 && productQuantity <=100 && productQuantity != 0) {
        //Set the details of the selected product  
        let productDetails = {
                productId: productId,
                productColor: productColor,
                productQuantity: productQuantity
            }
        //Initialize the local storage in order to stock the details of the selected product 
        localStorage.setItem("addedToCart", JSON.stringify(productDetails));
        console.log('product details ', productDetails);
    }  
    else {
        alert()
    }     
}