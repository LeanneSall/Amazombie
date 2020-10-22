class infofield {
    constructor(id) {
        this.id = id;
        this.obj = document.getElementById(id);
        this.txt = this.obj.innerHTML;
        this.edit = this.obj.isContentEditable;
    }
}

function getFields() {
    var fields = [
    "full-name",
    "email-address" ,     
    "address-line-1", // Mr. Chris Redfield
    "address-line-2", // 300 Unicorn Way
    "address-line-3", // Raccoon City, YK
    "address-line-4", // H0H0H0
    "cc-line-1", // 1234 5678 9361 2346
    "cc-line-2", // 12/21
    "cc-line-3" // 123
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

    } else {
        pencilIcon.classList.add("icon-pencil-container-editmode");
    }

    fields.forEach(element => {
        var field = document.getElementById(element.id);
        if (field.isContentEditable) {
            // tQ: validate
            validateInputs(getFields());

            field.classList.remove("order-summary-row-editmode");
            field.contentEditable = false;
        } else {
            field.classList.add("order-summary-row-editmode");
            field.contentEditable = true;
        }
    });
}

function validateInputs(obj_array) {
    var isOk = true;

    var placeholders = [
        "full name",
        "email address" ,     
        "address line 1: full name", // Mr. Chris Redfield
        "address line 2: street no. and name", // 300 Unicorn Way
        "address line 3: city, province", // Raccoon City, YK
        "address line 4: postal code", // H0H0H0
        "credit card number", // 1234 5678 9361 2346
        "credit card expiry date: mm/yy", // 12/21
        "credit card CVN" // 123
    ]

    for (i = 0; i < obj_array.length; ++i) {
        document.getElementById(obj_array[i].id).classList.remove("order-summary-row-invalid");
        if (obj_array[i].txt.trim().length <= 1) {
            document.getElementById(obj_array[i].id).innerHTML = "Please enter your " + placeholders[i];
            document.getElementById(obj_array[i].id).classList.add("order-summary-row-invalid");
        }
    }

    if (isOk) {

    } else {

    }
}

// class customer {
//     firstName,
//     lastName,
//     addressLine1,
//     addressLine2,
//     addressLine3,
//     creditCardNo,
//     totalAmt
// }