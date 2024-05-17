// let lists = document.getElementsByClassName("listItem")
// let rightBox = document.getElementById("right")


// for(let list of lists){
//     list.addEventListener("dragstart",function(e){
//         let item = e.target;
//         rightBox.addEventListener("dragover",function(e){
//             e.preventDefault();
//         })

//         list.addEventListener("dragend",()=>{
//             rightBox.removeEventListener("drop",addItems);
//         })

//         function addItems(e){
//             let rightBoxList = rightBox.getElementsByClassName("listItem");
//             console.log(rightBoxList.length)
//             // console.log(e.target.getAttribute('data-index'))
//             let index = e.target.getAttribute('data-index');
//             // console.log(index)
//             const val= getAddAfterElement(rightBox,e.clientY)
//             let val1 = document.getElementById(`${index}`);
//             console.log(val1);
//             if(val == null){
//                 rightBox.appendChild(item);
//             }
//             else{
//                 rightBox.insertBefore(item,val);
//             }
//         }    
//         rightBox.addEventListener("drop",addItems);
//     })
// }

// function getAddAfterElement(container,y){
//     const elements=Array.from(container.getElementsByClassName("listItem"));
//     return elements.reduce((closest,child)=>{
//         const box=child.getBoundingClientRect();
//         const offset=y-(box.top+box.height/2);
//         if(offset < 0 && offset > closest.offset){
//             return {
//                 offset:offset,element:child
//             }
//         }
//         else{
//             return closest;
//         }
//     },{offset:Number.NEGATIVE_INFINITY}).element;
// }







// let lists = document.getElementsByClassName("listItem")
// let rightBox = document.getElementById("right")

// for(let list of lists){
//     list.addEventListener("dragstart",function(e){
//         let item = e.target;
//         rightBox.addEventListener("dragover",function(e){
//             e.preventDefault();
//         })

//         list.addEventListener("dragend",()=>{
//             rightBox.removeEventListener("drop",addItems);
//         })

//         function addItems(e){
//             let rightBoxList = rightBox.getElementsByClassName("listItem");
//             let index = e.target.getAttribute('data-index');
//             let val = document.getElementById(`${index}`);

//             if(rightBoxList.length == 0){
//                 rightBox.appendChild(item);
//             }
//             else{
//                 rightBox.insertBefore(item,val);
//             }
//         }    
//         rightBox.addEventListener("drop",addItems);
//     })
// }







$(document).ready(function() {
    $(".listItem").on("dragstart", function(e) {
        let item = e.target;
        $("#right").on("dragover", function(e) {
            e.preventDefault();
        });

        $(this).on("dragend", function() {
            $("#right").off("drop", addItems);
        });

        function addItems(e) {
            let rightBoxList = $("#right").find(".listItem");
            let index = $(e.target).attr('data-index');
            let val = $("#" + index);

            if (rightBoxList.length === 0) {
                $("#right").append(item);
            } else {
                $("#right").insertBefore(item, val);
            }
        }

        $("#right").on("drop", addItems);
    });
});







