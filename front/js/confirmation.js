
function displayOrderId() {
    //Get the order id of the product to display
    const str = window.location.href;
    const url = new URL(str);
    let orderId = url.searchParams.get("id");

    //Recover the DOM element that will host the order Id
    const confirmation = document.getElementById("orderId");

    //Display the order Id
    confirmation.textContent = orderId;
}

displayOrderId(orderId)