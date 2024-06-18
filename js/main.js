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
	let editBtnIcon = editBtn.querySelector('.fas');
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








// JS FORM VALIDATION START

let tablLower = document.querySelector('.tableLower')
let input = document.querySelectorAll('input');

input.addEventListener('click', feildNotBlank());

function feildNotBlank() {

	for (let i = 0; i < input.length; i++) {

		let inputValue = document.querySelectorAll('input')[i].value.trim();

		if (inputValue == '') {

			errorMsg(inputName, `${inputName} ${'Cannot be Blank'}`)

			// input.parentElement.tablLower.innerHTML = 'Feild Cannot be Blank';
		}
	}

}


// LOGIN FORM VALIDATION

let myform = document.querySelector("form");


// SET ERROR MSG IF VALIDATION FALSE

function setErrorMsg(id, errorMsg) {
	let falseInput = document.querySelector(id);
	// console.log(falseInput);
	falseInput.nextElementSibling.innerHTML = errorMsg;
	falseInput.classList.add("error");
	// falseInput.forEach((curElem) => curElem.focus());
}



// EMAIL VALIDATION FUNCTION

function emailValidation(email) {
	let atTheRateSymbol = email.indexOf("@");
	let dot = email.lastIndexOf(".");


	// Check @ Symbol Occur at Begining, If yes then throw Error  

	if (atTheRateSymbol < 1) {
		return false;
	}

	// Check There Should be atleast two characters after @, If Not then throw Error 
	else if (dot <= atTheRateSymbol + 2) {
		return false;
	}

	// Check There Should be atleast two characters after . , If Not then throw Error
	else if (dot === email.length - 1 + 2) {
		return false;
	}

	// If Validation Passed then return true
	else {
		return true;
	}

}


function validateForm() {

	let returnVal = true;

    // Getting Value with Triming the Spaces of Left & Right Side.

	let name = document.querySelector("#name").value.trim();
	let email = document.querySelector("#email").value.trim();
	let number = document.querySelector("#phoneNumber").value.trim();
	let password = document.querySelector("#password").value.trim();
	let cPassword = document.querySelector("#cpPassword").value.trim();



	// NAME VALIDATION

	if (name === "") {
		setErrorMsg("#name", "Name Feild Cannot be Blank");
		returnVal = false;
	}



	// EMAIL VALIDATION

	if (email === "") {
		setErrorMsg("#email", "Email Feild Cannot be Blank");
		returnVal = false;
	} 
	
	else if (!emailValidation(email)) {
		setErrorMsg("#email", "Please Enter Valid Email");
		returnVal = false;
	}



	// PHONE NUMBER VALIDATION

	if (number === "") {
		setErrorMsg("#phoneNumber", "Phone Number Feild Cannot be Blank");
		returnVal = false;
	} 
	
	else if (number.length < 10) {
		setErrorMsg("#phoneNumber", "Please Enter Valid Mobile No");
		returnVal = false;
	}



	// PASSWORD & CONFIRM PASSWORD VALIDATION

	if (password === "") {
		setErrorMsg("#password", "Password Feild Cannot be Blank");
		returnVal = false;
	} 
	
	// Required character Validation
	
	else if (password.length < 8) {
		setErrorMsg("#password", "Minimum 8 Characters Required");
		returnVal = false;
	}

	// Upper Case Validation

	else if (password.search(/[A-Z]/) == -1) {
		setErrorMsg("#password", "Please Enter Valid Passworde - One Uppercase, One lowercase, One number & One Symbol");
		returnVal = false;
	}

	// Lower Case Validation

	else if (password.search(/[a-z]/) == -1) {
		setErrorMsg("#password", "Please Enter Valid Passworde - One Uppercase, One lowercase, One number & One Symbol");
		returnVal = false;
	}

	// Number Validation

	else if (password.search(/[0-9]/) == -1) {
		setErrorMsg("#password", "Please Enter Valid Passworde - One Uppercase, One lowercase, One number & One Symbol");
		returnVal = false;
	}


	// Symbol Validation

	else if (password.search(/[@\#\?\!\@\$\&]/) == -1) {
		setErrorMsg("#password", "Please Enter Valid Passworde - One Uppercase, One lowercase, One number & One Symbol");
		returnVal = false;
	}


	//Confirm Password

	if (cPassword === "") {
		setErrorMsg("#cpPassword", "Confirm Password Feild Cannot be Blank");
		returnVal = false;
	} 
	
	else if (cPassword !== password) {
		setErrorMsg("#cpPassword", "Confirm Password not Matched");
		returnVal = false;
	}


	return returnVal;

}


// SHOW AND HIDE PASSWORD

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








