//Get the order id of the product to display
const str = window.location.href;
const url = new URL(str);
let orderId = url.searchParams.get("id");

//The ID number is must not be kept or stored