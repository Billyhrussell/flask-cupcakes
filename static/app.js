"use strict"

const $listCupcakes = $("#listcupcakes")
const $form = $("#newCupcakeForm")

let cupcakes;


async function getCupcakes(){
  let response = await axios.post("/api/cupcakes");
  cupcakes = response.data.cupcake;

  displayCupcakes(cupcakes);
}

function displayCupcakes(cupcakes){

  for(let cupcake of cupcakes){
    const $li = $("<li>");
    $li.text(`${cupcake.flavor} ${cupcake.size} ${cupcake.rating}`)
    // const $img = $(`<img src= ${cupcake.image}>`)
    // $li.append($img)
    $listCupcakes.append($li)
  }
}

getCupcakes();