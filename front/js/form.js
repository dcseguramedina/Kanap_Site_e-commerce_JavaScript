//Cart order form validation//
//Validate the data entered by the user in the form and display an error message if needed//

//First name validation
const firstName = document.getElementById("firstName");
const firstNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

firstName.addEventListener("change", function (event) {
    event.preventDefault();
    validFirstName();
})

function validFirstName() {
    if (firstNameRegex.test(firstName.value)) {
        firstNameErrorMsg.textContent = "";
    }
    else {
        firstNameErrorMsg.textContent = `Prénom invalide`;
    }
}

//Last name validation
const lastName = document.getElementById("lastName");
const lastNameRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

lastName.addEventListener("change", function (event) {
    event.preventDefault();
    validLastName();
})

function validLastName() {
    if (lastNameRegex.test(lastName.value)) {
        lastNameErrorMsg.textContent = "";
    }
    else {
        lastNameErrorMsg.textContent = `Nom invalide`;
    }
}

//Address validation
const address = document.getElementById("address");
const addressRegex = new RegExp(/^[a-zA-Z0-9.,-_\é\è\ê\ë\ï\œ\-\s]{5,50}[ ]{0,2}$/);
const addressErrorMsg = document.getElementById("addressErrorMsg");

address.addEventListener("change", function (event) {
    event.preventDefault();
    validAddress();
})

function validAddress() {
    if (addressRegex.test(address.value)) {
        addressErrorMsg.textContent = "";
    }
    else {
        addressErrorMsg.textContent = `Addres invalide`;
    }
}

//City validation
const city = document.getElementById("city");
const cityRegex = new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/);
const cityErrorMsg = document.getElementById("cityErrorMsg");

city.addEventListener("change", function (event) {
    event.preventDefault();
    validCity();
})

function validCity() {
    if (addressRegex.test(city.value)) {
        cityErrorMsg.textContent = "";
    }
    else {
        cityErrorMsg.textContent = `Ville invalide`;
    }
}

//Email validation
const email = document.getElementById("email");
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+$/);
const emailErrorMsg = document.getElementById("emailErrorMsg");

email.addEventListener("change", function (event) {
    event.preventDefault();
    validEmail();
})

function validEmail() {
    if (emailRegex.test(email.value)) {
        emailErrorMsg.textContent = "";
    }
    else {
        emailErrorMsg.textContent = `Email invalide`;
    }
}

//Validate the form in order to do the POST request to the API (display an error message if needed)//

//Recover the DOM element that contain the order form
const orderBtn = document.getElementById("order");

//Listen to the click on the order button and start a last verification before sending the request
orderBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //Create a contact object (from the form data)
    let orderProducts = [];
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));

        for (let product of cart) {
            orderProducts.push(product.productId)
        }
    }

    //Create a table of products
    let orderContact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };

    let order = {
        products: orderProducts,
        contact: orderContact
    }
    //If there cart is empty, send an alert
    if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == []) {
        alert(`Votre panier est vide`);
    }
    //If the form is invalid, send an alert 
    else if (
        !firstNameRegex.test(firstName.value) ||
        !lastNameRegex.test(lastName.value) ||
        !addressRegex.test(address.value) ||
        !cityRegex.test(city.value) ||
        !emailRegex.test(email.value)
    ) {
        alert(`Le formulaire est incorrect`);
    }
    //If the verification goes well, save the order details in the local storage 
    else {
        localStorage.setItem("order", JSON.stringify(order));
        sendToServer();
    }
})

//Make a POST request on the API and retrieve the ID of command in the response
function sendToServer() {

    fetch('http://localhost:3000/api/products/order', {
        //Define the fetch options for the request
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
    })
        .then(function (response) {
            console.log(response);
            //Check the URL and retrieve the response in the json format
            if (response.ok) {
                return response.json();
            }
        })
        //Redirect the user to the Confirm page, passing the id of command in the URL
        .then(function (order) {
            console.log(order);
            //localStorage.clear();
            //localStorage.setItem("orderId", order.orderId);
            orderConfirmation();

            function orderConfirmation() {
                if (window.confirm(`La commande a été enregistré. Pour consulter le numéro de commande, cliquez sur OK`)) {
                    window.location.href = `./confirmation.html?id=${order.orderId}`;
                }
            };
        })
        .catch(function (error) {
            //Block of code to handle errors
            return error;
        })
}