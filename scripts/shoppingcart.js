// tQ: for populating page based on previous page, and to pass on to Gokay
// class product {
//     id
//     quantity
//     price
// }

// tQ: for form validation
class infofield {
    constructor(id) {
        this.id = id;
        this.obj = document.getElementById(id);
        this.txt = this.obj.innerHTML.trim().replace( /(<([^>]+)>)/ig, '');
        this.edit = this.obj.isContentEditable;
        this.valid = true;
    }
}

// tQ: t'is for Gokay
// class customer() {
//     firstName,
//     lastName,
//     addressLine1,
//     addressLine2,
//     addressLine3,
//     creditCardNo,
//     totalAmt
// }

function getInputs() {
    var fields = [
    "full-name",
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

    var obj_array = [];

    for (i = 0; i < fields.length; ++i) {
        obj_array.push(new infofield(fields[i]));
    }

    return obj_array;
}

function toggleEditable(fields){

    var pencilIcon = document.getElementsByClassName("icon-pencil-container")[0];

    if (pencilIcon.classList.contains("icon-pencil-container-editmode")) {
        pencilIcon.classList.remove("icon-pencil-container-editmode");

        // tQ: validate all fields by default for pencil and checkbox editing mode
        validateInputs(getInputs());
    } else {
        pencilIcon.classList.add("icon-pencil-container-editmode");
        greyOutButton();
    }

    fields.forEach(element => {
        var field = document.getElementById(element.id);
        if (field.isContentEditable) {
            field.classList.remove("order-summary-row-editmode");
            field.contentEditable = false;
        } else {
            field.classList.add("order-summary-row-editmode");
            field.contentEditable = true;
        }
    });
}

function toggleCCaddress() {
    var cbox = document.getElementById("useshipping");

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

    for (i = 0; i < fromArray.length; ++i) {
        if (cbox.checked) {
            document.getElementById(toArray[i]).innerHtml = new infofield(fromArray[i]).txt;
        } else {
            toggleEditable(new infofield(toArray[i]));
        }
    }
}

function validateInputs(obj_array) {

    document.getElementById("order-submit-button").classList.remove("disabled", "order-submit-button-disabled");

    var isOk = true;

    var placeholders = [
        "full name",
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
        "3-digit credit card CCV" // 123
    ]

    // tQ: check for input lengths
    for (i = 0; i < obj_array.length; ++i) {
        document.getElementById(obj_array[i].id).classList.remove("order-summary-row-invalid");
        if (obj_array[i].txt.length <= 1 || obj_array[i].txt=="Please enter your " + placeholders[i]) {
            obj_array[i].valid = false;
        }
    }

    // tQ: full name must be two words
    const regexp_fname = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/);
    if (!(regexp_fname.test(obj_array[0].txt.toLowerCase()))) {
        obj_array[0].valid = false;
    }
    
    // tQ: email must be valid
    const regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regexp_email.test(String(obj_array[1].txt).toLowerCase()))) {
        obj_array[1].valid = false;
    }

    // tQ: postal code must match pattern
    const regexp_postal = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    var postal = [5,12];
    for (i = 0; i < postal.length; ++i) {
        if (!(regexp_postal.test(String(obj_array[i].txt)))) {
            obj_array[i].valid = false;
        }
    }

    // tQ: credit card number must match pattern
    const regexp_cc1 = /^[0-9]{16}$/;
    var testThis = String(obj_array[6].txt).replaceAll(" ","");
    if (!(regexp_cc1.test(String(obj_array[6].txt).replaceAll(" ","")))) {
        obj_array[6].valid = false;
    }
    // tQ: credit card exp date must be valid
    const regexp_cc2 = /^[0-9]{2}\/[0-9]{2}$/;
    obj_array[7].valid = false;
    if (regexp_cc2.test(String(obj_array[7].txt).replaceAll(" ",""))) {
        var month = parseInt(String(obj_array[7].txt).substring(0,2));
        var year = parseInt(String(obj_array[7].txt).substring(3));
        var compdate = new Date((2000 + year), month, 0);
        console.log(compdate)
        if (month >= 1 && month <= 12 && compdate >= new Date()) {
            obj_array[7].valid = true;
        }
    }
    // tQ: credit card ccv must match pattern
    const regexp_cc3 = /^[0-9]{3}$/;
    if (!(regexp_cc3.test(String(obj_array[8].txt).replaceAll(" ","")))) {
        obj_array[8].valid = false;
    }

    // tQ: append classes
    for (i = 0; i < obj_array.length; ++i) {
        if (!(obj_array[i].valid)) {
            document.getElementById(obj_array[i].id).innerHTML = "Please enter your " + placeholders[i];
            document.getElementById(obj_array[i].id).classList.add("order-summary-row-invalid");
            isOk = false;
        }
    }

    if (!(isOk)) {
        greyOutButton();
    }
}

function greyOutButton() {
    document.getElementById("order-submit-button").classList.add("disabled", "order-submit-button-disabled");
}
