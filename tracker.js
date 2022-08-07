const form = document.querySelector(".searchBar"); //get the form.
const formInput = document.querySelector(".searchInput"); 
let userInput = ""; //create a variable to store the user input.
let foodItems = [];
let index =0;
let totalFats =0 
let totalCarbs =0 
let totalProtein =0
let totalCalories = 0

form.addEventListener("submit", function(e){ //when the submit button is clicked.
    e.preventDefault(); //prevent default behavior.
    console.log("Form clicked.") //log the form being clicked.
    userInput = formInput.value; //save form input
    console.log(userInput); //log the user input for testing 
    let data = JSON.stringify({ //create a JSON object to send to the server.
        "query": `${userInput}`, //send the user input to the server.
      });
      let config = {
        method: 'post', 
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients', 
        headers: {  
          'x-app-id': '6bf6c5d5', 
          'x-app-key': '8b3cd6a561d32f76e541569003bb0af5', 
          'x-remote-user-id': '0',  
          'Content-Type': 'application/json' 
        },
        data : data //set the data to the JSON object.
    };
    axios(config) //send the config object to the server.
    .then(function (response) { //when the server responds.
        console.log(JSON.stringify(response.data));  //log the response.
        foodItems.push(new foodInfo(
            capitalizeString(response.data.foods[0].food_name),
            Math.trunc(response.data.foods[0].nf_calories),
            Math.trunc(response.data.foods[0].nf_total_fat),
            Math.trunc(response.data.foods[0].nf_total_carbohydrate),
            Math.trunc(response.data.foods[0].nf_protein),
            response.data.foods[0].photo.thumb,
        ))
        newFoodItem(index);
        index++;
        calcTotalValues(foodItems[index-1]);
    })
    .catch(function (error) { //if the server fails.
        console.log(error); //log the error.
});
}
)

class foodInfo{ //create a class to store the food information.
    constructor(name,cal,fats,carbs,prot,imgLink){
        this.name = name;
        this.cal = cal 
        this.fats = fats
        this.carbs = carbs 
        this.prot = prot 
        this.imgLink = imgLink
    }
}

function calcTotalValues(foodItem){
   //function to calculate the total values.
    totalCalories += foodItem.cal;
    document.querySelector('.totalCaloriesValue').innerHTML = `<h2>Calories: ${totalCalories}</h2>`;
    totalFats += foodItem.fats;
    document.querySelector('.totalFatsValue').innerHTML = `<h2>Fats: ${totalFats}</h2>`;
    totalCarbs += foodItem.carbs;
    document.querySelector('.totalCarbsValue').innerHTML = `<h2>Carbs: ${totalCarbs}</h2>`;
    totalProtein += foodItem.prot;
    document.querySelector('.totalProteinValue').innerHTML = `<h2>Protein: ${totalProtein}</h2>`;
}

function newFoodItem(index){
    let newFood = document.createElement("div"); //create a new div.
    newFood.classList.add("foodItem"); //add the class "foodItem" to the div.
    newFood.innerHTML = `<h3>${foodItems[index].name}</h3>
    <p>${foodItems[index].cal} calories</p>
    <p>${foodItems[index].prot}g protein</p>
    <p>${foodItems[index].fats}g fat</p>
    <p>${foodItems[index].carbs}g carbs</p>
    <img src="${foodItems[index].imgLink}">
    <i class="fa-solid fa-trash-alt" id="trash"> </i>`; //add the food information to the div.
    document.querySelector(".foodDiary").appendChild(newFood); //add the div to the container.
    }
    
    document.querySelector(".foodDiary").addEventListener("click", function(e){
        if(e.target.classList.contains("fa-trash-alt")){
            console.log("trash clicked");
            let foodItem = e.target.parentElement;
            totalCalories -= foodItems[index].cal;
            document.querySelector('.totalCaloriesValue').innerHTML = `<h2>Calories: ${totalCalories}</h2>`;
            totalFats -= foodItems[index].fats;
            document.querySelector('.totalFatsValue').innerHTML = `<h2>Fats: ${totalFats}</h2>`;
            totalCarbs -= foodItems[index].carbs;
            document.querySelector('.totalCarbsValue').innerHTML = `<h2>Carbs: ${totalCarbs}</h2>`;
            totalProtein -= foodItems[index].prot;
            document.querySelector('.totalProteinValue').innerHTML = `<h2>Protein: ${totalProtein}</h2>`;
        }
      });


      trashButtons.forEach(function(element){
        element.addEventListener("click", function(e){
            e.target.parentElement.remove();
            
        })})

function capitalizeString(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}