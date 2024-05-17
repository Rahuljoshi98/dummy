let lists = document.getElementsByClassName("listItem")
let rightBox = document.getElementById("right")

for(let list of lists){
    list.addEventListener("dragstart",function(e){
        let item = e.target;
        rightBox.addEventListener("dragover",function(e){
            e.preventDefault();
        })

        list.addEventListener("dragend",()=>{
            rightBox.removeEventListener("drop",addItems);
        })

        function addItems(e){
            let rightBoxList = rightBox.getElementsByClassName("listItem");
            let index = e.target.getAttribute('data-index');
            let val = document.getElementById(`${index}`);

            if(rightBoxList.length == 0){
                rightBox.appendChild(item);
            }
            else{
                rightBox.insertBefore(item,val);
            }
        }    
        rightBox.addEventListener("drop",addItems);
    })
}


