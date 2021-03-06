// INIT COUNTDOWN
function handleTickInit(tick) {
    Tick.count.down('2020' + '-12-1').onupdate = function(value) {
        tick.value = value;
    };
}


// tQ: for form validation
class infofield {
    constructor(id, label = "") {
        this.obj = document.getElementById(id);
        this.txt = this.obj.innerHTML.trim().replace( /(<([^>]+)>)/ig, '');
        this.edit = this.obj.isContentEditable;
        this.valid = true;
        this.label = label;
    }
}

// tQ: t'is for Gokay
class customer {
    constructor() {
    let inputs = getInputs();

    var fullName = inputs.get("first-name").txt + " " + inputs.get("last-name").txt;
    this.firstName = fullName.split(" ")[0];
    this.lastName = fullName.split(" ")[1];

    this.addressLine1 = inputs.get("address-line-1").txt;
    this.addressLine2 = inputs.get("address-line-2").txt;
    this.addressLine3 = inputs.get("address-line-3").txt;
    this.creditCardNo = inputs.get("cc-line-1").txt;
    this.totalAmt = parseFloat(document.getElementById("total").innerHTML);
    }
}

function getInputs() {
    var fields = [
    "first-name",
    "last-name",
    "email-address" ,     
    "address-line-1", // Mr. Chris Redfield
    "address-line-2", // 300 Unicorn Way
    "address-line-3", // Raccoon City, YK
    "address-line-4", // H0H0H0
    "cc-line-1", // 1234 5678 9361 2346
    "cc-line-2", // 12/21
    "cc-line-3", // 123

    "address-line-cc-1",
    "address-line-cc-2",
    "address-line-cc-3",
    "address-line-cc-4"
    ];

    var labels = [
        "first name",
        "last name",
        "email address" ,     
        "address: full name", // Mr. Chris Redfield
        "address: street no. and name", // 300 Unicorn Way
        "address: city, province", // Raccoon City, YK
        "postal code (format: A1A1A1)", // H0H0H0
        "credit card number", // 1234 5678 9361 2346
        "credit card expiry date: mm/yy", // 12/21
        "3-digit credit card CCV", // 123
        
        "address: full name", // Mr. Chris Redfield
        "address: street no. and name", // 300 Unicorn Way
        "address: city, province", // Raccoon City, YK
        "postal code (format: A1A1A1)" // 123
    ]

    let obj_map = new Map();

    for (i = 0; i < fields.length; ++i) {
        obj_map.set(fields[i], new infofield(fields[i]));
        obj_map.get(fields[i]).label = labels[i];
    }

    return obj_map;
}

function toggleSummaryFields(fields){

    var pencilIcon = document.getElementsByClassName("icon-pencil-container")[0];
    
    if (pencilIcon.classList.contains("icon-pencil-container-editmode")) {
        pencilIcon.classList.remove("icon-pencil-container-editmode");
        document.getElementById("useshipping").disabled = true;
        toggleCCaddress()
        validateInputs(fields);
        
    } else {
        pencilIcon.classList.add("icon-pencil-container-editmode");
        document.getElementById("useshipping").disabled = false;
        lockButton();
    }

    toggleEditable(fields);
}

function toggleCCaddress() {

    var useShipping = document.getElementsByClassName("useShippingAddress-cc")[0];
    var useThis = document.getElementsByClassName("useThisAddress-cc")[0];

    // <div>Use <span class="useShippingAddress-cc">shipping</span>
    // <span class="useThisAddress-cc useThisAddress-cc-hidden"> this</span> address for billing:</div>
    if (useThis.classList.contains("useThisAddress-cc-hidden")) {
        useShipping.classList.add("useShippingAddress-cc-invalid")
        useThis.classList.remove("useThisAddress-cc-hidden")
    } else {
        useShipping.classList.remove("useShippingAddress-cc-invalid")
        useThis.classList.add("useThisAddress-cc-hidden")
    }
    
    var cbox = document.getElementById("useshipping");
    
    if (cbox.checked) {
        var fromArray = [
        "address-line-1", // Mr. Chris Redfield
        "address-line-2", // 300 Unicorn Way
        "address-line-3", // Raccoon City, YK
        "address-line-4" // H0H0H0
        ];
    
        var toArray = [
        "address-line-cc-1",  // Mr. Chris Redfield
        "address-line-cc-2",  // 300 Unicorn Way
        "address-line-cc-3",  // Raccoon City, YK
        "address-line-cc-4"  // H0H0H0
        ];

        transferAddress(fromArray, toArray);
    }
}

function toggleEditable(fields) {
    for (let [key, value] of fields) {
        var field = document.getElementById(key);
        if (field.isContentEditable) {
            field.classList.remove("order-summary-row-editmode");
            field.contentEditable = false;
        } else {
            field.classList.add("order-summary-row-editmode");
            field.classList.remove("summary-form-cc-grey");
            field.contentEditable = true;
        }
    };
}

function transferAddress(from, to) {
    for (i = 0; i < from.length; ++i) {
        document.getElementById(to[i]).innerHTML = new infofield(from[i]).txt;
    } 
}

function validateInputs(obj_map) {

    unlockButton();

    var isOk = true;

    // tQ: check for input lengths
    for (let [key, value] of obj_map) {
        document.getElementById(key).classList.remove("order-summary-row-invalid");
        if (value.txt.length <= 1 || value.txt=="Please enter your " + value.label) {
            value.valid = false;
        }
    }
    
    // tQ: email must be valid
    const regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regexp_email.test(String(obj_map.get("email-address").txt).toLowerCase()))) {
        obj_map.get("email-address").valid = false;
    }

    // tQ: postal code must match pattern
    const regexp_postal = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    var postal = ["address-line-4","address-line-cc-4"];
    for (i = 0; i < postal.length; ++i) {
        if (!(regexp_postal.test(obj_map.get(postal[i]).txt))) {
            obj_map.get(postal[i]).valid = false;
        }
    }

    // tQ: credit card number must match pattern
    const regexp_cc1 = /^[0-9]{16}$/;
    var testThis = String(obj_map.get("cc-line-1").txt).replaceAll(" ","");
    if (!(regexp_cc1.test(String(obj_map.get("cc-line-1").txt).replaceAll(" ","")))) {
        obj_map.get("cc-line-1").valid = false;
    }
    // tQ: credit card exp date must be valid
    const regexp_cc2 = /^[0-9]{2}\/[0-9]{2}$/;
    obj_map.get("cc-line-2").valid = false;
    if (regexp_cc2.test(String(obj_map.get("cc-line-2").txt).replaceAll(" ",""))) {
        var month = parseInt(String(obj_map.get("cc-line-2").txt).substring(0,2));
        var year = parseInt(String(obj_map.get("cc-line-2").txt).substring(3));
        var compdate = new Date((2000 + year), month, 0);
        
        if (month >= 1 && month <= 12 && compdate >= new Date()) {
            obj_map.get("cc-line-2").valid = true;
        }
    }
    // tQ: credit card ccv must match pattern
    const regexp_cc3 = /^[0-9]{3}$/;
    if (!(regexp_cc3.test(String(obj_map.get("cc-line-3").txt).replaceAll(" ","")))) {
        obj_map.get("cc-line-3").valid = false;
    }

    // tQ: append classes
    for (let [key, value] of obj_map) {
        if (!(value.valid)) {
            document.getElementById(key).innerHTML = "Please enter your " + value.label;
            document.getElementById(key).classList.add("order-summary-row-invalid");
            isOk = false;
        }
    }

    if (!(isOk)) {
        lockButton();
    }
}

function unlockButton() {
    document.getElementById("order-submit-button").classList.remove("disabled", "order-submit-button-disabled");
}

function lockButton() {
    document.getElementById("order-submit-button").classList.add("disabled", "order-submit-button-disabled");
}

function saveUserData() {
    var cust = new customer();
    window.localStorage.setItem('customer', JSON.stringify(cust));
}

function zombiesAreComing() {
    document.getElementById("fairWarning").classList.remove("hidden");
    lockButton();
    var editbutton = document.getElementsByClassName("icon-pencil-container")[0];
    editbutton.classList.add("disabled", "icon-pencil-container-locked");
    editbutton.onclick = function() { return false; }
}

// tQ: default behaviour
//     checkbox should be checked
document.getElementById("useshipping").checked = true;
document.getElementById("useshipping").disabled = true;

// tQ: display message when cart is empty
window.addEventListener('load', function() {
    if (document.getElementsByClassName("cart-row-img").length==0) {
        zombiesAreComing();
    }
});