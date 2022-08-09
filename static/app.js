"use strict";

const BASE_URL = "http://localhost:5000"

const $listCupcakes = $("#listcupcakes");
const $form = $("#newCupcakeForm");

let cupcakes;


async function getCupcakes() {
  let response = await axios.get("/api/cupcakes");
  cupcakes = response.data.cupcakes;
  // TODO: separation of concerns
  displayCupcakes(cupcakes);
}

function displayCupcakes(cupcakes) {
  $listCupcakes.empty()
  for (let cupcake of cupcakes) {
    let liHtml = generateCupcakeHtml(cupcake);
    $listCupcakes.append(liHtml);
  }
}

async function handleSubmit(e) {
 //handle submit button
  e.preventDefault();

  const response = await axios({
    url: `${BASE_URL}/api/cupcakes`,
    method: "POST",
    data: {
      flavor: $("#flavor").val(),
      size: $("#size").val(),
      rating: $("#rating").val(),
      image: $("#image").val()
    }
  });
  const cupcake = response.data;
  let liHtml = generateCupcakeHtml(cupcake.cupcake);
  $listCupcakes.append(liHtml);
  console.log(`add li html`, liHtml);
  console.log("cupcake ", cupcake);
}

//TODO: another function to update with new cupcake

function generateCupcakeHtml(cupcake){
    const $li = $("<li>");
    $li.text(`${cupcake.flavor} ${cupcake.size} ${cupcake.rating}`);
    const $img = $(`<img src= ${cupcake.image}>`);
    $li.append($img);

    return $li;
}

$form.on("submit", handleSubmit);

getCupcakes();

