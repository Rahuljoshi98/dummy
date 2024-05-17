function postData(e) {
    e.preventDefault();
    let firstName = document.getElementById("fullName").value;
    let email = document.getElementById("emailId").value;
    let phone = document.getElementById("phone").value;
    let obj = {
        firstName : firstName,
        email : email,
        phone : phone
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST","https://jsonplaceholder.typicode.com/posts",true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
                console.log(JSON.parse(this.responseText));
            }
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(obj));
}
        