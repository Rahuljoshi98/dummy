const heading = React.createElement("h1",{
    id : "headingOne",
    style : {
        color : "red",
        fontSize : "22px"
    }
},"Hello World from React");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading)
console.log(heading)          //this wiil return object (the heading that we have created is an react element which is javaScript Object )




