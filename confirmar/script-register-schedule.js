import { createRegister } from "../routes/RegisterRoutes.js";

document.getElementById("btnConfirmar").addEventListener('click', () => {
  const cart = JSON.parse(sessionStorage.getItem("carrinho"))
  let body = {
    "name": "temporario",
    "treatment": cart.selectedServiceKey,
    "value": cart.total,
    "additions": converteobj(cart.additionalSelection),
    "date": cart.date,
    "schedule": cart.schedule
  }
  const user_id = sessionStorage.getItem("user_id")

  grava(body, user_id)
  sessionStorage.removeItem('carrinho');

}
)

async function grava(body, user_id) {
  await createRegister(body, user_id);

}

function converteobj(tu) {
  let eu = []
  for (let i = 0; i < tu.length; i++) {
    eu.push({
      "addition": tu[i],
      "value": 100
    })
  }

  return eu
}