import Product from "./modules/Product.js";

let kanap = new Product();

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
        kanap = new Product(data._id, data.imageUrl, data.altTxt, data.name, data.description, data.colors, undefined);
        //Set the color options 
        kanap.setColorOptions();
        //Set the price (directly from the API in order to keep it out of the local storage)
        kanap.setPrice(data);
        //Display the object and its details 
        kanap.displaySingleDetails();
    })
    //Block of code to handle errors
    .catch((error) => {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    })