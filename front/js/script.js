//Insert products on the home page//
let displaySetOfProducts = () => {   
    //Request the API to get the set of products to display
    const url = 'http://localhost:3000/api/products/';
    fetch(url)
        //Check the URL and retrieve the response in the json format
        .then((response) => response.json())
        //Browse the response data to insert each product in the homepage
        .then((products) => {
            for (let product of products) {                
                //Recover the DOM element that will host the products 
                const sectionItems = document.getElementById("items");

                //Create an "a" tag to make the link to a product
                const linkElement = document.createElement("a");
                //Set the "a" tag and its "href" attribute
                linkElement.href = `./product.html?id=${product._id}`;
                //Attach the "a" tag to the items section
                sectionItems.appendChild(linkElement);

                //Create an "article" tag dedicated to a product
                const productElement = document.createElement("article");
                //Attach the "article" tag to the link section
                linkElement.appendChild(productElement);

                //Create an "img" tag for each product
                const imageElement = document.createElement("img");
                imageElement.src = product.imageUrl;
                imageElement.alt = product.altTxt;
                //Attach the "img" tag of each product to the article section
                productElement.appendChild(imageElement);

                //Create a "h3" tag for each product
                const nameElement = document.createElement("h3");
                nameElement.textContent = product.name;
                //Attach the "h3" tag of each product to the article section
                productElement.appendChild(nameElement);

                //Create a "p" tag for each product
                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = product.description;
                //Attach the "p" tag of each product to the article section
                productElement.appendChild(descriptionElement);
            }
        })
        //Block of code to handle errors
        .catch((error) => {
            alert(`Une erreur s'est produite. Veuillez réessayer`);
        })        
}
displaySetOfProducts();