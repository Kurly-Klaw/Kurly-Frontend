import {editCarrinho} from '../assets/js/sessionStorage.js'

function toggleCard(event) {
  const card = event.currentTarget;
  const isButton = event.target.closest('button');
  const seta = card.getElementsByClassName("seta")[0]

  if (!isButton) {
    card.classList.toggle('expanded');
    seta.classList.toggle("invertido")
    setTimeout(() => {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
  }
}

function slidePromo(event) {
  const promo = event.currentTarget;
  const isButton = event.target.closest('button');
  if (!isButton) {
    promo.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

async function btnProductPressed(event) {
  const btn = event.currentTarget;
  const idSelected = btn.getAttribute("data-id")
  const includeSelected = btn.getAttribute("data-includes")
  await editCarrinho("selectedKey", idSelected)
  if (includeSelected) await editCarrinho("comboService", includeSelected.replace(/[\[\]]/g, "").split(","))
  else await editCarrinho("cleanCombo")
  window.location.href = '../opcionais';
}

window.toggleCard = toggleCard;
window.slidePromo = slidePromo;
window.btnProductPressed = btnProductPressed;