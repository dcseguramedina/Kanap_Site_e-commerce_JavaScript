//Create a class => "Product" to work with//
class Product {
    //Define the product details
    constructor(id, image, altTxt, title, description) {
        this.id = id;
        this.image = image;
        this.altTxt = altTxt;
        this.title = title;
        this.description = description;
    }
    //Display the set of product and its details 
    displayDetails() {
        //Recover the DOM element that will host the set of products 
        const itemsSection = document.getElementById("items");

        //Create an "a" tag to make the link to a product
        const itemLink = document.createElement("a");
        //Set the "a" tag and its "href" attribute
        itemLink.href = `./product.html?id=${this.id}`;
        //Attach the "a" tag to the items section
        itemsSection.appendChild(itemLink);

        //Create an "article" tag dedicated to a product
        const itemArticle = document.createElement("article");
        //Attach the "article" tag to the link section
        itemLink.appendChild(itemArticle);

        //Create an "img" tag for each product
        const itemImage = document.createElement("img");
        itemImage.src = this.image;
        itemImage.alt = this.altTxt;
        //Attach the "img" tag of each product to the article section
        itemArticle.appendChild(itemImage);

        //Create a "h3" tag for each product
        const itemName = document.createElement("h3");
        itemName.textContent = this.title;
        //Attach the "h3" tag of each product to the article section
        itemArticle.appendChild(itemName);

        //Create a "p" tag for each product
        const itemDescription = document.createElement("p");
        itemDescription.textContent = this.description;
        //Attach the "p" tag of each product to the article section
        itemArticle.appendChild(itemDescription);
    }
}

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
            let kanap = new Product(data._id, data.imageUrl, data.altTxt, data.name, data.description);
            //Display the object and its details 
            kanap.displayDetails();
        }
    })
    //Block of code to handle errors
    .catch((error) => {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    })