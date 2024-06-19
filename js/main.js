let addBtn = document.querySelector('.add-btn');
let noteSec = document.querySelector('.noteSec');


// UPDATING NOTES TO LOCAL STORAGE

const updateLocalStorageData = () => {

	const notesData = document.querySelectorAll('textarea');
	const noteStorage = [];

	notesData.forEach((note) => {
		return noteStorage.push(note.value)
	});

	localStorage.setItem('noteStorage', JSON.stringify(noteStorage));
}



// ADD NOTES FUNCTION

const addBtnFunction = (text = "") => {

	// CHECK FOR EMPTY NOTES IF EXIST

	const existingTextareas = document.querySelectorAll('textarea');

	for (let textarea of existingTextareas) {
		if (textarea.value.trim() === "") {
			alert('Please fill the existing empty note before adding a new one.');
			return;
		}
	}
	

	// STORED HTML CONTENT IN CONST

	const noteHtmlData = `
    <div class="note">
        <div class="iconSec">
            <i class="${text ? "fas fa-edit" : "fa-solid fa-bookmark"} editBtn"><span class="textEdit">${text ? "EDIT" : "SAVE"}</span></i>
            <i class="fas fa-trash-alt removeBtn"><span class="textEdit">REMOVE</span></i>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="contentArea ${text ? "hidden" : ""}"></textarea> 
    </div>`;


	// ADD NOTE IN NOTE SECTION AT BEGNING

	noteSec.insertAdjacentHTML('afterbegin', noteHtmlData);

	let noteItem = noteSec.querySelector('.note');
	let editBtn = noteSec.querySelector('.editBtn');
	let removeBtn = noteSec.querySelector('.removeBtn');
	let mainDiv = noteSec.querySelector('.main');
	let contentArea = noteSec.querySelector('textarea');
    let editBtnTxt = editBtn.querySelector('.textEdit');


	// ADD CLICK EVENT IN REMOVE BUTTON FOR REMOVING NOTE

	removeBtn.addEventListener('click', function() {

		noteItem.remove();

		updateLocalStorageData();

	});


	// ADD CLICK EVENT IN EDIT BUTTON TO TOGGLE BETWEEN MAIN DIV & TEXT AREA 

	contentArea.value = text;
	mainDiv.innerHTML = text;

	editBtn.addEventListener('click', function() {

		mainDiv.classList.toggle('hidden');
		contentArea.classList.toggle('hidden');

		// TOGGLE ADD & SAVE

		if (!mainDiv.classList.contains('hidden')) {
            editBtn.classList.remove('fa-bookmark');
            editBtn.classList.add('fa-edit');
            editBtnTxt.innerText = 'EDIT';
        } 
		
		else {
            editBtn.classList.remove('fa-edit');
            editBtn.classList.add('fa-bookmark');
            editBtnTxt.innerText = 'SAVE';
        }

	});


	// UPDATING TEXT AREA VAALUE IN MAIN DIV

	contentArea.addEventListener('change', function(event) {

		const noteText = event.target.value;
		mainDiv.innerHTML = noteText;

		updateLocalStorageData();
	});

};



// GETTING NOTES FROM LOCAL STORAGE WHEN PAGE LOADED

const noteStorage = JSON.parse(localStorage.getItem('noteStorage'));

if (noteStorage) {
	noteStorage.forEach((note) => addBtnFunction(note))
};


// ADD CLICK EVENT IN ADD NOTE BUTTON

addBtn.addEventListener('click', () => addBtnFunction());








// SIGN UP FORM VALIDATION START

let tablLower = document.querySelector('.tableLower')
let input = document.querySelectorAll('input');



// ADD EVENT LISTENER FOR CLICK ON INPUT

input.addEventListener('click', feildNotBlank());

function feildNotBlank() {

    for (let i = 0; i < input.length; i++) {

        let inputValue = document.querySelectorAll('input')[i].value.trim();

        // CHECK IF INPUT FIELD IS BLANK

        if (inputValue == '') {
            errorMsg(inputName, `${inputName} ${'Cannot be Blank'}`)
        }
    }
}



// SET ERROR MESSAGE IF VALIDATION FAILS

function setErrorMsg(id, errorMsg) {

    let falseInput = document.querySelector(id);
    falseInput.nextElementSibling.innerHTML = errorMsg;
    falseInput.classList.add("error");
    // falseInput.forEach((curElem) => curElem.focus());

}



// CLEAR ERROR MESSAGE IF ERROR RESOLVED

function clearErrorMsg(id) {

    let validInput = document.querySelector(id);
    validInput.nextElementSibling.innerHTML = "";
    validInput.classList.remove("error");

}



// EMAIL VALIDATION FUNCTION

function emailValidation(email) {

    let atTheRateSymbol = email.indexOf("@");

    let dot = email.lastIndexOf(".");

    // CHECK @ SYMBOL OCCURS AT BEGINNING, IF YES THEN THROW ERROR  

    if (atTheRateSymbol < 1) {
        return false;
    }

    // CHECK THERE SHOULD BE AT LEAST TWO CHARACTERS AFTER @, IF NOT THEN THROW ERROR 

    else if (dot <= atTheRateSymbol + 2) {
        return false;
    }

    // CHECK THERE SHOULD BE AT LEAST TWO CHARACTERS AFTER ., IF NOT THEN THROW ERROR

    else if (dot === email.length - 1 + 2) {
        return false;
    }

    // IF VALIDATION PASSES THEN RETURN TRUE

    else {
        return true;
    }
}




// FORM VALIDATE FUNCTION 

function validateForm() {

    let returnVal = true;

    // GETTING VALUE WITH TRIMMING THE SPACES OF LEFT & RIGHT SIDE.

    let name = document.querySelector("#name").value.trim();
    let email = document.querySelector("#email").value.trim();
    let number = document.querySelector("#phoneNumber").value.trim();
    let password = document.querySelector("#password").value.trim();
    let cPassword = document.querySelector("#cpPassword").value.trim();


    // NAME VALIDATION

	// GETTENG NO OF WORDS IN NAME

	const wordNo = name.split(" ");
	wordLength = wordNo.length;

    if (name === "") {
        setErrorMsg("#name", "Name Field Cannot be Blank");
        returnVal = false;
    }

	else if (wordLength < 2 ) {
		setErrorMsg("#name", "Please Enter Full Name (Atleast Two Words)");
        returnVal = false;
	}

	else {
		clearErrorMsg("#name");
	}


    // EMAIL VALIDATION

    if (email === "") {
        setErrorMsg("#email", "Email Field Cannot be Blank");
        returnVal = false;
    } 
	
	else if (!emailValidation(email)) {
        setErrorMsg("#email", "Please Enter Valid Email");
        returnVal = false;
    }

	else {
		clearErrorMsg("#email");
	}


    // PHONE NUMBER VALIDATION

    if (number === "") {
        setErrorMsg("#phoneNumber", "Phone Number Field Cannot be Blank");
        returnVal = false;
    } 
	
	else if (number.length < 10) {
        setErrorMsg("#phoneNumber", "Please Enter Valid Mobile No");
        returnVal = false;
    }

	else {
		clearErrorMsg("#phoneNumber");
	}


    // PASSWORD & CONFIRM PASSWORD VALIDATION

    if (password === "") {
        setErrorMsg("#password", "Password Field Cannot be Blank");
        returnVal = false;
    }

    // REQUIRED CHARACTER VALIDATION

    else if (password.length < 8) {
        setErrorMsg("#password", "Minimum 8 Characters Required");
        returnVal = false;
    }

    // UPPER CASE VALIDATION

    else if (password.search(/[A-Z]/) == -1) {
        setErrorMsg("#password", "Please Enter Valid Password - One Uppercase, One Lowercase, One Number & One Symbol");
        returnVal = false;
    }

    // LOWER CASE VALIDATION

    else if (password.search(/[a-z]/) == -1) {
        setErrorMsg("#password", "Please Enter Valid Password - One Uppercase, One Lowercase, One Number & One Symbol");
        returnVal = false;
    }

    // NUMBER VALIDATION

    else if (password.search(/[0-9]/) == -1) {
        setErrorMsg("#password", "Please Enter Valid Password - One Uppercase, One Lowercase, One Number & One Symbol");
        returnVal = false;
    }

    // SYMBOL VALIDATION

    else if (password.search(/[@\#\?\!\@\$\&]/) == -1) {
        setErrorMsg("#password", "Please Enter Valid Password - One Uppercase, One Lowercase, One Number & One Symbol");
        returnVal = false;
    }

	else {
		clearErrorMsg("#password");
	}


    // CONFIRM PASSWORD VALIDATION

    if (cPassword === "") {
        setErrorMsg("#cpPassword", "Confirm Password Field Cannot be Blank");
        returnVal = false;
    } 
	
	else if (cPassword !== password) {
        setErrorMsg("#cpPassword", "Confirm Password Not Matched");
        returnVal = false;
    }

	else {
		clearErrorMsg("#cpPassword");
	}

    return returnVal;
}









// SHOW AND HIDE (TOGGLE) PASSWORD

function togglePassword() {

	let checkboxInput = document.querySelectorAll(".passImput");
	let checkbox = document.querySelector("#log-input");
	
	checkboxInput.forEach((currElem) => {

		if (checkbox.checked) {
			 currElem.type = "text";
		} 
		
		else {
			currElem.type = "password";
		}

	})

}








