$(document).ready(function(){
    const access_key = "pB1y5YC3l6xDFE31TFwDkBsQt3HIoSFektfuu4ALV0M";
    const form_element = $("form");
    const input_element = $("#search_option");
    const search_result = $(".search_result");
    const show_more = $("#show_more");

    let input_data = "";
    let page = 1;

    async function search_image(){
        input_data = input_element.val();
        console.log(input_data);

        // const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${access_key}`;

        // with query
        const url = `https://api.unsplash.com/search/photos?`;
        $.ajax({
            url: url,
            type: 'GET',
            data : {
                page : page,
                query : input_data,
                client_id : access_key
            },
            success: function(response) {
                const data = response;
                const result = data.results;
                if(page === 1){
                    search_result.html("");
                }
                
                result.map((r)=>{
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
                    search_result.append(image_wrapper);
                })

                page++;
                if(page>1){
                    show_more.css("display","block")
                    }
                },
            error: function(xhr, status, error) {
                    console.error("Error:", status, error);
                }
        });
    }

    form_element.on("submit",(event)=>{
        event.preventDefault();
        page = 1;
        search_image();
    })

    show_more.on("click",(event)=>{
        search_image();
    })

})