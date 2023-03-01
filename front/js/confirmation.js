//Display orderId - This number must not be kept or stored//
function displayOrderId() {
    //Get the orderId to display 
    let orderId = new URL(window.location.href).searchParams.get("id");
    //Recover the DOM element containing the orderId
    const confirmation = document.getElementById("orderId");
    //Display the orderId in the confirmation page
    confirmation.textContent = orderId + `. Merci pour votre commande`;
}  
displayOrderId();