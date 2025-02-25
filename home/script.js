import { setSelectedService } from '../assets/js/sessionStorage.js'

window.toggleCard = function (event) {
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

window.slidePromo = function (event) {
  const promo = event.currentTarget;
  const isButton = event.target.closest('button');
  if (!isButton) {
    promo.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

window.btnProductPressed = async function (event) {
  const btn = event.currentTarget;
  const idSelected = btn.getAttribute("data-id")
  await setSelectedService(idSelected)
  window.location.href = '../opcionais';
}
