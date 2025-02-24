import { createRegister } from "../routes/RegisterRoutes.js";
import { getUser } from "../routes/UserRoutes.js";

document.getElementById("btnConfirmar").addEventListener('click', async () => {

  const user_id = sessionStorage.getItem("user_id")
  let user = await getUser(user_id)
  const cart = JSON.parse(sessionStorage.getItem("carrinho"))
  let body = {
    "name": user.name,
    "phone_number": user.phone_number,
    "treatment": cart.selectedServiceKey,
    "value": cart.total,
    "additions": converteobj(cart.additionalSelection),
    "date": cart.date,
    "schedule": cart.schedule
  }


  await grava(body, user_id)
  sessionStorage.removeItem('carrinho');
  const notification = document.createElement('div')

  notification.id = 'notification';
  notification.style.position = 'fixed';
  notification.style.top = '0';
  notification.style.left = '0';
  notification.style.width = '100%';
  notification.style.backgroundColor = '#a76c39'; // Vermelho para erro
  notification.style.color = 'white';
  notification.style.padding = '15px';
  notification.style.textAlign = 'center';
  notification.style.fontSize = '16px';
  notification.style.zIndex = '1000';

  const messageElement = document.createElement('p');
  messageElement.textContent = "Agendamento realizado com sucesso.";
  notification.append(messageElement)
  document.body.appendChild(notification);

  setTimeout(function () {
    window.location.href = "../profile/";
  }, 1000);

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
      "value": 0
    })
  }

  return eu
}