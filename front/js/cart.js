import Product from "./modules/Product.js";

let kanap = new Product();

//Retrieve the cart via the local storage and display the cart content//

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
                    //Create an object => "kanap" and set the details with the cart and API data
                    kanap = new Product(data._id, data.imageUrl, data.altTxt, data.name, data.description, item.color, data.price, item.quantity);                   
                    //Display the object and its details 
                    kanap.displayCartContent(cart);
                })
            //Block of code to handle errors
            .catch((error) => {
                alert(`Une erreur s'est produite. Veuillez réessayer`);
            })            
        }        
    }
    else if (cart == undefined || cart.length == 0) {
        alert(`Votre panier est vide`);
    }
}
getCartFromLocalStorage();