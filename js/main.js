let addBtn = document.querySelector('.add-btn');
let noteSec = document.querySelector('.noteSec');


//Updating Notes to Local Storage

const updateLocalStorageData = () => {
	const notesData = document.querySelectorAll('textarea');
	const noteStorage = [];

	notesData.forEach((note) => {
		return noteStorage.push(note.value)
	});

	localStorage.setItem('noteStorage', JSON.stringify(noteStorage));
}


// Getting Notes from Local Storage When Page Loaded
// const noteStorage = JSON.parse(localStorage.getItem('noteStorage'));

// if(noteStorage) {noteStorage.forEach(function(){function addBtnFunction(note)})};
// console.log(note);

// addBtn.addEventListener('click', function () {
//     function addBtnFunction (text = '') {


const addBtnFunction = (text = '') => {
	// Store HTML Content in Const
	const noteHtmlData = `<div class="note">
    <div class="iconSec">
        <i class="fas fa-edit editBtn"><span class="textEdit">EDIT</span></i>
        <i class="fas fa-trash-alt removeBtn"><span class="textEdit">REMOVE</span></i>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="contentArea ${text ? 'hidden': ''}"></textarea> 
    </div>`;

	// Added Note in Note Section
	// noteSec.innerHTML ='<div class="note"><div class="iconSec"><i class="fas fa-edit"><span class="textEdit">EDIT</span></i><i class="fas fa-trash-alt"><span class="textEdit">REMOVE</span></i></div><div class="contentArea" contenteditable="true"</div></div>';
	noteSec.insertAdjacentHTML('afterbegin', noteHtmlData);

	let noteItem = noteSec.querySelector('.note');
	let editBtn = noteSec.querySelector('.editBtn');
	let removeBtn = noteSec.querySelector('.removeBtn');
	let mainDiv = noteSec.querySelector('.main');
	let contentArea = noteSec.querySelector('textarea');

	// Add Click Event in Remove Button to Removing Note
	removeBtn.addEventListener('click', function() {
		//    for (let i = 0; i < noteItems.length; i++ ){
		noteItem.remove();

		// if (contentArea === '') {
		//     noteItem.remove();
		// }
		//    }
		updateLocalStorageData();
	});

	// Add Click Event in Edit Button to toggle Between Main div & Text Area 
	contentArea.value = text;
	mainDiv.innerHTML = text;

	editBtn.addEventListener('click', function() {
		mainDiv.classList.toggle('hidden');
		contentArea.classList.toggle('hidden');
	});

	contentArea.addEventListener('change', function(event) {
		const noteText = event.target.value;
		mainDiv.innerHTML = noteText;

		updateLocalStorageData();
	});

};


// Getting Notes from Local Storage When Page Loaded

const noteStorage = JSON.parse(localStorage.getItem('noteStorage'));

if (noteStorage) {
	noteStorage.forEach((note) => addBtnFunction(note))
};
// console.log(note);



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


// Login Form Validation

// let myInput = document.querySelector("#one");
// let validateText = document.querySelector(".tableLower");

// document.querySelector("#one").addEventListener('change', (event) => {
// console.log(event.target.value);

//     // if(event.target.value === "") {
//     //     // validateText.innerHTML = "Cant be blank";
//     // } 

//     // else {
//     //     null;
//     // }

// });




// if (name === "") {
//     setErrorMsg("#name", "This Feild Cannot be Blank");
//     if (email === "") {
//         setErrorMsg("#email", "This Feild Cannot be Blank");
//         if (number === "") {
//             setErrorMsg("#phoneNumber", "This Feild Cannot be Blank");
//             if (password === "") {
//                 setErrorMsg("#password", "This Feild Cannot be Blank");
//                 return false;
//             }
//         }
//      } 
//  } 


//  else if (name.length > 2) {
//         setErrorMsg("#name", "Error")
//         return false;
//  }


//  else {
//     return true;
//  }




let myform = document.querySelector("form");


// Set Error Msg if validation false

function setErrorMsg(id, errorMsg) {
	let falseInput = document.querySelector(id);
	// console.log(falseInput);
	falseInput.nextElementSibling.innerHTML = errorMsg;
	falseInput.classList.add("error");
	// falseInput.focus();
}



// Email Validation Function

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

// function passValidation (password) {


// let upperCasePattern = /[A-Z]/;  // Check any UPPERCASE letter in given String.
// let lowerCasePattern = /[a-z]/;  // Check any lowecase letter in given String.
// let numberPattern = /[0-9]/;     // Check any Number in given String.

// // let checkUpperPatern = upperCasePattern.test(password); 
// // let checkLowerPatern = lowerCasePattern.test(password);
// // let checkNumberPatern = numberPattern.test(password);

// // Test the Passsword wit .test() Method

// if(password.search(/[0-9]/) == -1) {
//   return false;
// }


// // if(checkLowerPatern) {
// //     return false;
// // }


// // if(checkNumberPatern) {
// //     return false;
// //   }

// //  if(lowerCasePattern.test(password)) {
// //     return false;
// //  }


// //else if(numberPattern.test(password)) {
// //     return false;
// // }

// // else {
// //     return true;
// // }

// }



function validateForm() {

	let returnVal = true;

    // Getting Value with Triming the Spaces of Left & Right Side.

	let name = document.querySelector("#name").value.trim();
	let email = document.querySelector("#email").value.trim();
	let number = document.querySelector("#phoneNumber").value.trim();
	let password = document.querySelector("#password").value.trim();
	let cPassword = document.querySelector("#cpPassword").value.trim();



	// Name Validation

	if (name === "") {
		setErrorMsg("#name", "Name Feild Cannot be Blank");
		returnVal = false;
	}



	// Email Validation

	if (email === "") {
		setErrorMsg("#email", "Email Feild Cannot be Blank");
		returnVal = false;
	} else if (!emailValidation(email)) {
		setErrorMsg("#email", "Please Enter Valid Email");
		returnVal = false;
	}



	// Phone Number Validation

	if (number === "") {
		setErrorMsg("#phoneNumber", "Phone Number Feild Cannot be Blank");
		returnVal = false;
	} else if (number.length < 10) {
		setErrorMsg("#phoneNumber", "Please Enter Valid Mobile No");
		returnVal = false;
	}



	// Password & Confirm Password Validation

	if (password === "") {
		setErrorMsg("#password", "Password Feild Cannot be Blank");
		returnVal = false;
	} else if (password.length < 8) {
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

	//  else if (!passValidation(password)) {
	//     setErrorMsg("#password", "Please Enter Valid Passworde - One Uppercase, One lowercase, One number & One Symbol");
	//     returnVal = false;
	//  }


	//Confirm Password
	if (cPassword === "") {
		setErrorMsg("#cpPassword", "Confirm Password Feild Cannot be Blank");
		returnVal = false;
	} else if (cPassword !== password) {
		setErrorMsg("#cpPassword", "Confirm Password not Matched");
		returnVal = false;
	}


	return returnVal;


    

// Show and Hide Password

function togglePassword() {
	let checkboxInput = document.querySelector("#password");
	let checkboxInput1 = document.querySelector("#cpPassword");
	// checkboxInput.map((currElem, index) => {
	//     checkboxInput = checkboxInput[index];

	let checkbox = document.querySelector("#log-input");
	if (checkbox.checked) {
		checkboxInput.type = "text";
		checkboxInput1.type = "text";
	} else {
		checkboxInput.type = "password";
		checkboxInput1.type = "password";
	}
	//   });
}



// function togglePassword() {
//     let checkboxInput = document.getElementById("password");
//     if (checkboxInput.type === "password") {
//       checkboxInput.type = "text";
//     } else {
//       checkboxInput.type = "password";
//     }
// }


}




