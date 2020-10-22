

// -----------------------------------------//
// ADD ITEMS TO local storage 
// -----------------------------------------//
// function populateStorage() {
//   localStorage.setItem('bgcolor', 'red');
//   localStorage.setItem('font', 'Helvetica');
//   localStorage.setItem('image', 'myCat.png');
// }

const nameDiv = document.querySelector('#customer-name')
const orderDateDiv = document.querySelector('#order-date')
const address1Div = document.querySelector('#address-line-1')
const address2Div = document.querySelector('#address-line-2')
const address3Div = document.querySelector('#address-line-3')
const emailDiv = document.querySelector('#customer-email')
const paymentMethodDiv = document.querySelector('#payment-method')
const subtotalDiv = document.querySelector('#subtotal')
const taxesDiv = document.querySelector('#taxes')
const shippingDiv = document.querySelector('#shipping')
const totalDiv = document.querySelector('#total')


var customerInfo = {
    name: 'Gokay Abay',
    address1: '704',
    address2: '2121 Alma',
    address3: 'Vancouver',
    email: 'email@amil.com',
    paymentMethod: '123456789239'
}
var inCart = [
    box1 = {
        price: 123
    },
    box2 = {
        price: 123
    },
    box3 = {
        price: 123
    },
]

// -----------------------------------------//
// UPDATE STORAGE
// -----------------------------------------//
const updateStorage = () => {
    // #1. Update localstorage with the CURRENT instance of our cart array
    // also need to JSON.stringify because localstorage only works with JSON
    
    // cretas a localstorage item with a name 'inTheCart'
    localStorage.setItem("inTheCart", JSON.stringify(inCart));
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    // #2. Retrieve the cart data from local storage and then parse the JSON data into javascript objects
    // Then assign a variable to the cart data.
    var actuallyInCart = JSON.parse(localStorage.getItem("inTheCart"));
    var customerInfoJson = JSON.parse(localStorage.getItem("customerInfo"))
    console.log(actuallyInCart);
    console.log(customerInfoJson)
    
    
    var subtotal = 0;
    
    actuallyInCart.forEach((item) => {
        subtotal += item.price
    });
    
    var strSubtotal = subtotal.toString()
    var strTaxes = ((subtotal * 0.12).toFixed(2)).toString()
    var strShip = (20).toString()
    var strTotal = (subtotal + (subtotal * 0.12) + 20).toString()
    
    nameDiv.innerHTML = customerInfoJson.name
    orderDateDiv.innerHTML = getCurrentDate()
    address1Div.innerHTML = customerInfoJson.address1
    address2Div.innerHTML = customerInfoJson.address2
    address3Div.innerHTML = customerInfoJson.address3
    emailDiv.innerHTML = customerInfoJson.email
    paymentMethodDiv.innerHTML = customerInfoJson.paymentMethod
    subtotalDiv.innerHTML = strSubtotal
    taxesDiv.innerHTML = strTaxes
    shippingDiv.innerHTML = strShip
    totalDiv.innerHTML = strTotal

}

function getCurrentDate() {
    let date = new Date()
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}
