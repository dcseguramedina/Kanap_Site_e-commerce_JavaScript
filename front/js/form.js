//Validate and place the order//

//Create an object containing the form fields
class Field {

    constructor(docName, regex, docErrorMsg, errorMsg) {
        this.docName = docName;
        this.regex = regex;
        this.docErrorMsg = docErrorMsg;
        this.errorMsg = errorMsg;
    }

    //Listen to the changes in the form fields and check the inputs 
    addEvent() {
        this.docName.addEventListener("change", (event) => {
            event.preventDefault();
            this.checkInput();
        })
    }

    //Validate the inputs and display an error message if needed
    checkInput() {
        let valid = this.regex.test(this.docName.value);
        if (valid == false) {
            this.docErrorMsg.textContent = this.errorMsg;
            return false
        } else {
            this.docErrorMsg.textContent = "";
            return true
        }
    }
}

let firstName = new Field(
    document.getElementById("firstName"),
    new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
    document.getElementById("firstNameErrorMsg"),
    `Prénom invalide`
);
firstName.addEvent();

let lastName = new Field(
    document.getElementById("lastName"),
    new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
    document.getElementById("lastNameErrorMsg"),
    `Nom invalide`
);
lastName.addEvent();

let address = new Field(
    document.getElementById("address"),
    new RegExp(/^[a-zA-Z0-9.,_\é\è\ê\ë\ï\œ\-\s]{5,50}[ ]{0,2}$/),
    document.getElementById("addressErrorMsg"),
    `Addresse invalide`
);
address.addEvent();

let city = new Field(
    document.getElementById("city"),
    new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
    document.getElementById("cityErrorMsg"),
    `Vile invalide`
);
city.addEvent();

let email = new Field(
    document.getElementById("email"),
    new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+$/),
    document.getElementById("emailErrorMsg"),
    `Email invalide`
);
email.addEvent();

let addEventToOrder = (firstName, lastName, address, city, email) => {
    //Recover the DOM element that contains the order button
    const orderBtn = document.getElementById("order");
    //Listen to the click on the order button and start a last verification before sending the request
    orderBtn.addEventListener("click", (event) => {
        event.preventDefault();
        infoValidation(firstName, lastName, address, city, email);
    })
}
addEventToOrder(firstName, lastName, address, city, email);

let infoValidation = (firstName, lastName, address, city, email) => {
    //If there cart is empty, send an alert
    if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == []) {
        alert(`Votre panier est vide`);
        // If the form is invalid, send an alert
    } else if (
        firstName.regex.test(firstName.docName.value) !== true ||
        lastName.regex.test(lastName.docName.value) !== true ||
        address.regex.test(address.docName.value) !== true ||
        city.regex.test(city.docName.value) !== true ||
        email.regex.test(email.docName.value) !== true
    ) {
        alert(`Le formulaire est incorrect`);
        // If the verification goes well, send the POST request 
    } else {
        createOrder(firstName, lastName, address, city, email);
    }
}

let createOrder = (firstName, lastName, address, city, email) => {
    //Create a table of products to recover the productId of each product added to the cart
    let products = [];
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (let product of cart)
            products.push(product.id);
    }

    // Create a contact object (from the form data)
    let contact = {
        firstName: firstName.docName.value,
        lastName: lastName.docName.value,
        address: address.docName.value,
        city: city.docName.value,
        email: email.docName.value
    }

    //Create an order object containing the list of products IDs and the contact information//
    let order = {
        products: products,
        contact: contact
    }
    console.log(order);

    sendOrderToServer(order);
}

//Make a POST request on the API and retrieve the ID of command in the response//
let sendOrderToServer = (order) => {
    const urlOrder = 'http://localhost:3000/api/products/order';
    fetch(urlOrder, {
        //Define the fetch options for the request
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
    })
        //Check the URL and retrieve the response in the json format
        .then((response) => response.json())
        //Redirect the user to the confirm page, passing the id of command in the URL
        .then((order) => {
            console.log(order);
            let orderId = order.orderId;
            if (orderId != undefined) {
                location.href = 'confirmation.html?id=' + orderId;
            }
            localStorage.clear();
        })
        //Block of code to handle errors
        .catch((error) => {
            alert(`Une erreur s'est produite. Veuillez réessayer`);
        })
}