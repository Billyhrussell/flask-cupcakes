"use strict";

const BASE_URL = "http://localhost:5001"

const $listCupcakes = $("#listcupcakes");
const $form = $("#newCupcakeForm");

let cupcakes;


async function getCupcakes() {
  let response = await axios.get("/api/cupcakes");
  cupcakes = response.data.cupcakes;

  displayCupcakes(cupcakes);
}

function displayCupcakes(cupcakes) {
  $listCupcakes.empty()
  for (let cupcake of cupcakes) {
    const $li = $("<li>");
    $li.text(`${cupcake.flavor} ${cupcake.size} ${cupcake.rating}`);
    const $img = $(`<img src= ${cupcake.image}>`);
    $li.append($img);
    $listCupcakes.append($li);
  }
}

async function handleSubmit(e) {
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
  getCupcakes(cupcake);


}

$form.on("submit", handleSubmit);

getCupcakes();

