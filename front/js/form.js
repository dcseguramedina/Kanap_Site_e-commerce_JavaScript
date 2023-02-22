//Form validation
function initOrderValidation() {
    //Validate and place the order//
    //Create an object containing the form fields
    const contactForm = {
        firstName: {
            docName: document.getElementById("firstName"),
            regex: new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
            docErrorMsg: document.getElementById("firstNameErrorMsg"),
            errorMsg: `Prénom invalide`
        },
        lastName: {
            docName: document.getElementById("lastName"),
            regex: new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
            docErrorMsg: document.getElementById("lastNameErrorMsg"),
            errorMsg: `Nom invalide`
        },
        address: {
            docName: document.getElementById("address"),
            regex: new RegExp(/^[a-zA-Z0-9.,_\é\è\ê\ë\ï\œ\-\s]{5,50}[ ]{0,2}$/),
            docErrorMsg: document.getElementById("addressErrorMsg"),
            errorMsg: `Addresse invalide`
        },
        city: {
            docName: document.getElementById("city"),
            regex: new RegExp(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
            docErrorMsg: document.getElementById("cityErrorMsg"),
            errorMsg: `Vile invalide`
        },
        email: {
            docName: document.getElementById("email"),
            regex: new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+$/),
            docErrorMsg: document.getElementById("emailErrorMsg"),
            errorMsg: `Email invalide`
        }
    }

    addEventsToForm(contactForm);
    

    //Request the API to post the order details
    //Create a table of products to recover the productId of each product added to the cart
    let orderProducts = [];
    if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (product of cart)
            orderProducts.push(product.productId);
            console.log(orderProducts);
    }
    // Create a contact object (from the form data)
    let orderContact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    console.log(orderContact);
    //Create an order object containing the list of products IDs and the contact information
    let order = {
        products: orderProducts,
        contact: orderContact
    }
    console.log(order);

    addEventsToOrder(contactForm, order);
    
    //if invalid -> exit
    //else -> sendOrderToServer(order);
}

initOrderValidation();

//Browse the form fields and add a "change" eventListener
function addEventsToForm(contactForm) {
    for (let field in contactForm) {
        addEventToField(contactForm[field]);
    }
}
//Listen to the changes in the form fields and check the inputs 
function addEventToField(field) {
    field.docName.addEventListener("change", function (event) {
        event.preventDefault();
        checkFieldInput(field);
    })
}
//Validate the inputs and display an error message if needed
function checkFieldInput(field) {
    let valid = field.regex.test(field.docName.value);
    if (valid == false) {
        field.docErrorMsg.textContent = field.errorMsg;
        return false
    } else {
        field.docErrorMsg.textContent = "";
        return true
    }
}

//Start the validation of the order information and add an event
function addEventsToOrder(contactForm, order) {
    //Recover the DOM element that contains the order button
    const orderBtn = document.getElementById("order");
    //Listen to the click on the order button and start a last verification before sending the request
    orderBtn.addEventListener("click", function (event) {
        event.preventDefault();
        validateCartAndForm(contactForm, order);
    })
}
//Validate the form in order to do the POST request to the API (display an error message if needed)//
function validateCartAndForm(contactForm, order) {
    // Check each field from the order contact form
    let valid = true;
    for (let field in contactForm) {
        valid = checkFieldInput(contactForm[field]);
        if (valid == false) {
            break;
        }
    }
    //If there cart is empty, send an alert
    if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == []) {
        alert(`Votre panier est vide`);
        // If the form is invalid, send an alert
    } else if (valid != true) {
        alert(`Le formulaire est incorrect`);
        // If the verification goes well, send the POST request 
    } else {
        sendOrderToServer(order);
    }
}
//Make a POST request on the API and retrieve the ID of command in the response//
function sendOrderToServer(order) {
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
            //Check the URL and retrieve the response in the json format
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (order) {
            //Redirect the user to the Confirm page, passing the id of command in the URL
            let orderId = order.orderId;
            console.log(orderId);
            if (orderId != undefined) {
                location.href = 'confirmation.html?id=' + orderId;
            }
            localStorage.clear();
        })
        .catch(function (error) {
            //Block of code to handle errors
            return error;
        })
}