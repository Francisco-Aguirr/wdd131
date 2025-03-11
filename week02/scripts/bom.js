// select the DOM elements
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");


//click event listener for the Add Chapter button
button.addEventListener("click", function(){
    if (input.value.trim() !== '' ){
        // create new li and deleteButton elements
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        //populate the li element with the imput value
        li.textContent = input.value;
        //Populate the button textContent with a ❌
        deleteButton.textContent = "❌";
        //Append the li element variable with the delete button
        li.append(deleteButton);
        //Append the li element variable to the unordered list in your HTML
        list.append(li);
        //clean the input 
        input.value = '';
        //event listener to the delete button that removes the li element when clicked
        deleteButton.addEventListener("click", function(){
            list.removeChild(li);
            input.focus();
        })
        console.log("The input is valid: ", input.value);

    }else{
        console.log("Input is blank. Please enter a value.");
        input.focus();
    }
});



