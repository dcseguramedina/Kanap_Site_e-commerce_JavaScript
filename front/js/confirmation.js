//Display orderId - This number must not be kept or stored//

let getId = () => {
    //Get the orderId to display
    return new URL(window.location.href).searchParams.get("id");
};

let displayOrderId = () => {
    //Recover the DOM element containing the orderId
    const confirmation = document.getElementById("orderId");
    //Display the orderId in the confirmation page
    confirmation.textContent = getId() + `. Merci pour votre commande`;
}  
displayOrderId();