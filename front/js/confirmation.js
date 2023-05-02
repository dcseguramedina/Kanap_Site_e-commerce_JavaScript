//Display orderId - This number must not be kept or stored//

//Get the orderId to display
let getId = () => {    
    return new URL(window.location.href).searchParams.get("id");
};
//Display the orderId in the confirmation page
let displayOrderId = () => {
    //Recover the DOM element containing the orderId
    const confirmation = document.getElementById("orderId");        
    confirmation.textContent = getId() + `. Merci pour votre commande`;
}  
displayOrderId();