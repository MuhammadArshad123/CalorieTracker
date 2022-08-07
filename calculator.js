const btn = document.querySelector(".btn")


btn.addEventListener("click", e => {
    const age = document.getElementById("age").value
    const height = document.getElementById("height").value
    const weight = document.getElementById("weight").value
    const activity= document.getElementById("activity").value
    const isMale = document.getElementById("dot-1").checked
    const isFemale = document.getElementById("dot-2").checked
    const isOther = document.getElementById("dot-3").checked
;
    console.log(isMale);
    console.log(isFemale)
    console.log(isOther)

    let cal = addActivity(calculate(isMale,isFemale,isOther,age,weight,height),activity)
    document.querySelector(".totalAmount").innerHTML = `<h3>Total: ${cal}</h3>`;
})



function calculate(isMale,isFemale,isOther,age,weight,height){
    if(isMale){
        return Math.trunc(((weight*.45)*10) + ((height*2.54)*6.25)-(5*age)+5)
    }else if(isFemale){
        return Math.trunc(((weight*.45)*10) + ((height*2.54)*6.25)-(5*age)-161)
    }else if(isOther){
        return Math.trunc(((((weight*.45)*10) + ((height*2.54)*6.25)-(5*age)+5) + (((weight*.45)*10) + ((height*2.54)*6.25)-(5*age)-161)) / 2)
    }
}

function addActivity(originValue,activity){
    if(activity == 'high' || activity == 'High'){
        return originValue + 500
    }else if(activity == 'medium' || activity == 'Medium'){
        return originValue + 250
    }else{
        return originValue
    }
}