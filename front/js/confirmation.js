//Display orderId - This number must not be kept or stored//
function initConfirmation() {
    displayOrderId();
}
initConfirmation();

//Get the orderId to display in the confirmation page
function getOrderIdToDisplay() {
    const str = window.location.href;
    const url = new URL(str);
    return url.searchParams.get("id");
}

//Recover the DOM element and insert the orderId to display
function displayOrderId() {
    let orderId = getOrderIdToDisplay();
    //Recover the DOM element containing the order Id
    const confirmation = document.getElementById("orderId");
    //Display the orderId in the page
    confirmation.textContent = orderId + `. Merci pour votre commande`;
}  