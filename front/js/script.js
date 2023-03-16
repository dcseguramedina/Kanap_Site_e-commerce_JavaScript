import Product from "./modules/Product.js";

let kanap = new Product();

//Insert the set of products of Kanap into the home page//

//Request the API to get the details of the set of product
const url = 'http://localhost:3000/api/products/';

fetch(url)
    //Check the URL and retrieve the response in the json format
    .then((response) => response.json())
    //Browse the response data to insert each product in the homepage
    .then((datas) => {
        for (let data of datas) {
            //Create an object => "kanap" and set the details with the API data 
            kanap = new Product(data._id, data.imageUrl, data.altTxt, data.name, data.description);
            //Display the object and its details 
            kanap.displaySetDetails();
        }
    })
    //Block of code to handle errors
    .catch((error) => {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    })