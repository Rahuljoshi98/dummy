let currentPage;
let formStep;
document.addEventListener("DOMContentLoaded", () => {
    formValidation('#registrationForm');
    const allNextButtons = Array.from(document.querySelectorAll("[nextPage]"));
    // this is to all the buttons at start
    allNextButtons.forEach( (btn)=>{
        btn.disabled = true;
        btn.style.cursor = "no-drop";
        btn.style.opacity = "0.5";
    } )
});

let storeDataInLocalStorage = {};
const formValidation = formSelector =>{

    const selectFormElement = document.querySelector(formSelector);
    formStep = Array.from(selectFormElement.querySelectorAll("[formStep]"));
    const validationOption = [
        {
            attribute : 'customMinLength',
            isValid : input => input.value && input.value.length >= parseInt(input.getAttribute('customMinLength'),10),   //base 10
            errorMessage : (input,label) => `** ${label.textContent} should have at least ${input.getAttribute('customMinLength')} characters`
        },
        {
            attribute : 'exactLength',
            isValid : input => input.value && input.value.length === parseInt(input.getAttribute('exactLength'),10),
            errorMessage : (input,label) => `** ${label.textContent} should have ${input.getAttribute('exactLength')} digits`
        },
        {
            attribute : 'pattern',
            isValid : input =>{
                const regex = new RegExp(input.pattern);
                return regex.test(input.value);
            },
            errorMessage : (input,label) =>{
                let inputFieldId = input.id;
                if(inputFieldId == 'fullName' && input.value.length <5){
                    return `** minimum length of ${label.textContent} should be 5`
                }
                if(inputFieldId == 'userPassword' || inputFieldId == 'confirmPassword'){
                    return `** ${label.textContent}: 8+ chars, lowercase, uppercase, digit, special char.`

                }
                return `** Invalid ${label.textContent} `
            } 
        },
        {
            attribute : 'match',
            isValid : input =>{
                const confirmPass = input.getAttribute('match');
                const userPass = selectFormElement.querySelector(`#${confirmPass}`);
                return userPass && userPass.value.trim() === input.value.trim()
            },
            errorMessage : (input,label) => {
                const confirmPass = input.getAttribute('match');
                const userPass = selectFormElement.querySelector(`#${confirmPass}`);
                const matchedLabel = userPass.parentElement.parentElement.querySelector('label')
                return `** ${label.textContent} should match ${matchedLabel.textContent}`
            }
        },
        
        {
            attribute : 'required',
            isValid : input => input.value.trim() !== '',
            errorMessage : (input,label) => `** ${label.textContent} is required`
        }
    ];

    const validateEachGroup = (a) =>{
        const label = a.querySelector('label');
        const inputFields = a.querySelector('input,textarea');
        const errorMessageDiv = a.querySelector('.errorMessage');
        const errorIconDanger = a.querySelector('.errorDanger');
        const errorIconSuccess = a.querySelector('.errorSuccess');
        
        let formError = false;
        for(let val of validationOption){
            if(inputFields && inputFields.hasAttribute(val.attribute) && !val.isValid(inputFields)){
                errorMessageDiv.textContent = val.errorMessage(inputFields,label);
                inputFields.classList.add('border-danger')
                inputFields.classList.remove('border-success')
                // inputFields.classList.add('border-2')
                errorIconDanger.style.display = "inline-block"
                errorIconSuccess.style.display = "none"
                formError = true;
            }
        }

        if(inputFields && !formError){
            errorMessageDiv.textContent = "";
            inputFields.classList.add('border-success')
            inputFields.classList.remove('border-danger')
            // inputFields.classList.add('border-2')
            errorIconDanger.style.display = "none"
            errorIconSuccess.style.display = "inline-block"
            return true;
        }

        if(!inputFields){
            return true;
        }
        
    }
    currentPage = formStep.findIndex( (step)=>{
        return step.classList.contains("isActive");
    });

    if(currentPage<0){
        currentPage=0;
        showCurrentPage()
    }

    selectFormElement.setAttribute('novalidate','');
    selectFormElement.addEventListener('click',function(e){
        let increment;
        const btn = formStep[currentPage].querySelector("[nextPage]");
        if(e.target.matches("[nextPage]")){
            increment = 1;
        }
        else if(e.target.matches("[prevPage]")){
            increment = -1;
        }
        if(increment == null)   return;
        if(e.target.matches("[prevPage]")){
            currentPage += increment;
            showCurrentPage();
        }
        else if(!btn.disabled && checkValidation(formStep[currentPage])){
            const inputDataFields = Array.from(formStep[currentPage].querySelectorAll('input'));
            const textAreaFields = Array.from(formStep[currentPage].querySelectorAll('textarea'));
            const sectionFields = Array.from(formStep[currentPage].querySelectorAll('select'));
            inputDataFields.forEach( (key)=>{
                storeDataInLocalStorage[key.name] = key.value;
            })

            textAreaFields.forEach( (key)=>{
                storeDataInLocalStorage[key.name] = key.value;
            })

            sectionFields.forEach( (key)=>{
                storeDataInLocalStorage[key.name] = key.value;
            })

            localStorage.setItem('formData',JSON.stringify(storeDataInLocalStorage));
            currentPage += increment;
            showCurrentPage()
        }
    });

    selectFormElement.addEventListener('submit',function(e){
        e.preventDefault();
        currentPage=2;
        if(checkValidation(formStep[currentPage])){
            currentPage = 2;
            const inputDataFields = Array.from(formStep[currentPage].querySelectorAll('input'));
            const textAreaFields = Array.from(formStep[currentPage].querySelectorAll('textarea'));
            const sectionFields = Array.from(formStep[currentPage].querySelectorAll('select'));
            inputDataFields.forEach( (key)=>{
            storeDataInLocalStorage[key.name] = key.value;
        })

        textAreaFields.forEach( (key)=>{
            storeDataInLocalStorage[key.name] = key.value;
        })

        sectionFields.forEach( (key)=>{
            storeDataInLocalStorage[key.name] = key.value;
        })

        delete storeDataInLocalStorage["Password"];
        delete storeDataInLocalStorage["Confirm Password"];
        let maskedPhoneNo = storeDataInLocalStorage["Phone No."];
        let maskedAadharNo = storeDataInLocalStorage["Aadhar Card No."];

        let size1 = maskedPhoneNo.length-4;
        let size2 = maskedAadharNo.length-4;
        let startString1 = "";
        let startString2 = "";
        for(let i=0;i<size1;i++){
            startString1 += "*";
        }
        for(let i=0;i<size2;i++){
            startString2 += "*";
        }
        maskedPhoneNo = startString1+maskedPhoneNo.slice(size1);
        maskedAadharNo = startString2+maskedAadharNo.slice(size2)

        storeDataInLocalStorage["Phone No."] = maskedPhoneNo;
        storeDataInLocalStorage["Aadhar Card No."] = maskedAadharNo;

        // function postData() {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open("POST","https://jsonplaceholder.typicode.com/posts",true);
        //     xhr.onreadystatechange = function () {
        //         if (this.readyState == 4 && this.status == 201) {
        //                 console.log(JSON.parse(this.responseText));
        //             }
        //     }
        //     xhr.setRequestHeader("Content-type", "application/json");
        //     xhr.send(JSON.stringify(storeDataInLocalStorage));
        // }
        // postData()

        function postData() {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(storeDataInLocalStorage),
                success: function(response) {
                    console.log(response);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
        postData();
        

        currentPage = 0;
        showCurrentPage()
        const myForm = document.getElementById("registrationForm");
        myForm.reset()
        localStorage.setItem('formData',JSON.stringify(storeDataInLocalStorage));
        }
    })

    const checkValidation = pageToValidate =>{
        const formGroups = Array.from(pageToValidate.querySelectorAll('.inputFieldDiv'))
        let flag = true;
        formGroups.forEach(val=>{
            if(!validateEachGroup(val)){
                flag = false;
            };
        })
        return flag;
    }

    // function showCurrentPage(){
    //     formStep.forEach( (step,index)=>{
    //         step.classList.toggle("isActive",index === currentPage);
    //     })
    // }  

    function showCurrentPage() {
        $(formStep).each(function(index, step) {
            $(step).toggleClass("isActive", index === currentPage);
        });
    }
    
}

function btndisable(e){
    const nextBtnDisable = Array.from(formStep[currentPage].querySelectorAll(".toCheckDisableButton")).some(item => item.value == '');
    const btn = formStep[currentPage].querySelector("[nextPage]");
    if(nextBtnDisable){
        btn.disabled = true;
        btn.style.opacity = "0.5"
        btn.style.cursor = "no-drop"
    }
    else{
        btn.disabled = false;
        btn.style.opacity = "1"
        btn.style.cursor = "pointer"
    }
}

// common validation functions for every fild
function validateOnKeyDown(event,regex){
    let key = event.key;
    let val = event.target.value;
    if(key == 'Backspace' || key == 'ArrowRight' || key == 'ArrowLeft'){
        return false;
    }
    if(!regex.test(key) || (val.at(-1) === ' ' && key === ' ')){
        event.preventDefault();
        return true;
    }
    return false;
}

function removeErrorsOnkeyDown(errorContainer,dangerIconContainer,successIconContainer,inbutBox){
    let error = document.getElementById(`${errorContainer}`)
    let dangerIcon = document.getElementById(`${dangerIconContainer}`);
    let succesIcon = document.getElementById(`${successIconContainer}`);
    let inputField = document.getElementById(`${inbutBox}`);
    dangerIcon.style.display="none";
    succesIcon.style.display="none";
    inputField.classList.remove('border-danger')
    inputField.classList.remove('border-success')   
    error.innerText = "";
}

function removeSelectError(event,errorTextDiv,selectFieldDropDown){
    let error = document.getElementById(`${errorTextDiv}`);
    let inputField = document.getElementById(`${selectFieldDropDown}`);
    error.innerText = "";
    inputField.classList.remove("border-danger");
    inputField.classList.remove("border-success");
}

function displayPassword(event,passwordType,showEye,hideEye){
    event.preventDefault();
    let field = document.getElementById(`${passwordType}`);
    let fieldType = field.type;   
    let openEye = document.querySelector(`.${showEye}`)
    let closeEye = document.querySelector(`.${hideEye}`)

    if(fieldType == 'password'){
        field.type = "text";
        openEye.style.display="inline-block"
        closeEye.style.display="none"
    }
    else{
        field.type = "password";
        openEye.style.display="none"
        closeEye.style.display="inline-block"
    }
}

function checkField(event,fieldName){
    let val = event.target.value;
    let key = event.key;
    switch (fieldName){
        case 'fullName' : const regexFullName = /^[a-zA-Z\s.]{1,100}$/
                        removeErrorsOnkeyDown('nameErrorContainer','userNameDangerIcon','userNameSuccessIcon','fullName');
                        validateOnKeyDown(event,regexFullName);
                        break;

        case 'emailId' : removeErrorsOnkeyDown('emailErrorContainer','userEmailDangerIcon','userEmailSuccessIcon','emailId');
                        break;
        
        case 'password' : removeErrorsOnkeyDown('passwordErrorContainer','userPasswordDangerIcon','userPasswordSuccessIcon','userPassword');
                        break;

        case 'confirmPassword' :  removeErrorsOnkeyDown('confirmPasswordErrorContainer','confirmPasswordDangerIcon','confirmPasswordSuccessIcon','confirmPassword');
                                break;                

        case 'address' : removeErrorsOnkeyDown('addressErrorContainer','addressdDangerIcon','addressdSuccessIcon','address');
                        break;
        
        case 'phoneNo' : const regexPhoneNo = /^[0-9]{1,10}$/;
                        removeErrorsOnkeyDown('phoneNoErrorContainer','phoneNoDangerIcon','phoneNoSuccessIcon','phoneno');
                        validateOnKeyDown(event,regexPhoneNo);
                        break;

        case 'aadharCardNo' : const regexAadharCard = /^[0-9]{1,12}$/;
                            removeErrorsOnkeyDown('aadharCardErrorContainer','aadharCardDangerIcon','aadharCardSuccessIcon','aadharCardNo');
                            validateOnKeyDown(event,regexAadharCard);
                            break; 

        case 'additionalNotes' : removeErrorsOnkeyDown('additionalNotesErrorContainer','additionalNotesDangerIcon','additionalNotesSuccessIcon','addNotes');
                                break;                  
    }
}

