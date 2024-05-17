/*  
    create a structure like

        <div id="root">
            <div id="parent">
                <div id="child">
                    <h1 id="headingOne" style="font-size: 22px; color: red;"></h1>
                    <h2 id="headingTwo" style="font-size: 22px; color: red;"></h2>
                </div>
            </div>
        </div>

*/

const parent = React.createElement("div",
    {
        id:"parent"
    },
    React.createElement("div",
        {
            id : "child"
        },[                                     //if you want to pass more than one elemnt in your dom then you have to use array
            React.createElement("h1",
                {   
                    key : "headingOne",         //to make each element unique otherwise it will throw an error saying that react.development.js:199 Warning: Each child in a list should have a unique "key" prop.
                    id : "headingOne",
                    style : {
                        color : "red",
                        fontSize : "22px"
                    }
                },
                "This is h1 "),
            React.createElement("h2",
                {   
                    key : "headingTwo",
                    id : "headingTwo",
                    style : {
                        color : "red",
                        fontSize : "22px"
                    }
                },
                "This is h2 ")
            ]        
    )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent)
console.log(parent)


/*
    In this code we will get an error in console saying :-
        react.development.js:199 Warning: Each child in a list should have a unique "key" prop.

    To solve this problem the key attribue is added inside h1 and h2 to make each element unique 
*/
