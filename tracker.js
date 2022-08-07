const form = document.querySelector(".searchBar"); //get the form.
const formInput = document.querySelector(".searchInput"); 
let userInput = ""; //create a variable to store the user input.
let foodItems = [];
let index =0;
let totalFats =0 
let totalCarbs =0 
let totalProtein =0
let totalCalories = 0
let idnum = 0

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
          'x-app-id': 'abb70c85', 
          'x-app-key': 'b1768a5dd5fe49ef9ffef9af4d666616', 
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
            response.data.foods[0].photo.thumb, idnum
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
    constructor(name,cal,fats,carbs,prot,imgLink,id){
        this.name = name;
        this.cal = cal 
        this.fats = fats
        this.carbs = carbs 
        this.prot = prot 
        this.imgLink = imgLink
        this.id = id
        idnum++
    }
}

function calcTotalValues(foodItem){
   //function to calculate the total values.
    totalCalories += foodItem.cal;
    document.querySelector('.totalCaloriesValue').innerHTML = `<h3>Calories: ${totalCalories}</h3>`;
    totalFats += foodItem.fats;
    document.querySelector('.totalFatsValue').innerHTML = `<h3>Fats: ${totalFats}</h3>`;
    totalCarbs += foodItem.carbs;
    document.querySelector('.totalCarbsValue').innerHTML = `<h3>Carbs: ${totalCarbs}</h3>`;
    totalProtein += foodItem.prot;
    document.querySelector('.totalProteinValue').innerHTML = `<h3>Protein: ${totalProtein}</h3>`;
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
    <div class="trashIcon"><i class="fa-solid fa-trash-alt" id="trash ${foodItems[index].id}"></i></div>`;
    document.querySelector(".foodDiary").appendChild(newFood); //add the div to the container.
    }
    
    document.querySelector(".foodDiary").addEventListener("click", function(e) {
        console.log(e.target)   //TRASHTRASH
        if(e.target.classList.contains("fa-trash-alt")){
            console.log("trash clicked");
            let foodItem = e.target.parentElement;
            let element = e.target
            let temp = ""
            temp = element.id
            temp = temp.substring(5)
            let trashId = parseInt(temp)
            console.log(trashId)
            totalCalories -= foodItems[trashId].cal;
            document.querySelector('.totalCaloriesValue').innerHTML = `<h3>Calories: ${totalCalories}</h3>`;
            totalFats -= foodItems[trashId].fats;
            document.querySelector('.totalFatsValue').innerHTML = `<h3>Fats: ${totalFats}</h3>`;
            totalCarbs -= foodItems[trashId].carbs;
            document.querySelector('.totalCarbsValue').innerHTML = `<h3>Carbs: ${totalCarbs}</h3>`;
            totalProtein -= foodItems[trashId].prot;
            document.querySelector('.totalProteinValue').innerHTML = `<h3>Protein: ${totalProtein}</h3>`;
            foodItem.remove()
            console.log(totalCalories)
            console.log(totalFats)
            console.log(totalCarbs)
            console.log(totalProtein)
        }
      });


      trashButtons.forEach(function(element){
        element.addEventListener("click", function(e){
            e.target.parentElement.remove();
            
        })})

function capitalizeString(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}