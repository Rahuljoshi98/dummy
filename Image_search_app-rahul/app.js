const access_key = "pB1y5YC3l6xDFE31TFwDkBsQt3HIoSFektfuu4ALV0M";

const form_element = document.querySelector("form");
const input_element = document.getElementById("search_option");
const search_result = document.querySelector(".search_result");
const show_more = document.getElementById("show_more");



let input_data = "";
let page = 1;
console.log(input_element.value)

async function search_image(){
    input_data = input_element.value;
    console.log(input_data);

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${access_key}`;
    // console.log(url)

    const response = await fetch(url);
    // console.log(response)
    const data = await response.json();
    console.log(data)


    const result = data.results;

    if(page === 1){
        search_result.innerHTML = "";
    }


    result.map( (r)=>{
        const image_wrapper = document.createElement('div');

        image_wrapper.classList.add("result");

        const image = document.createElement('img');

        image.src = r.urls.small;
        image.alt = r.alt_description

        const image_link = document.createElement('a');
        image_link.href = r.links.html;
        image_link.target = "_blank";
        image_link.textContent = r.alt_description;
       
        image_wrapper.appendChild(image);
        image_wrapper.appendChild(image_link);
        // image_wrapper.appendChild(image_wrapper);
        search_result.appendChild(image_wrapper);


        // click_event.addEventListener("click",(event)=>{
        //     event.preventDefault()
        //     console.log("in")
        //     window.location.replace(`${r.alt_description}`)
        // })
    })

    page++;

    if(page>1){
        show_more.style.display = "block"
    }

}


form_element.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    search_image();
})


show_more.addEventListener("click",(event)=>{
    search_image();
})


// function myFunction() {
//     console.log("in")
// }

// click_event.addEventListener("click",(event)=>{
//     myFunction();
// })


