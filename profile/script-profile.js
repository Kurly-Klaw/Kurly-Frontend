const editButton = document.getElementById("edit-pencil-icon");
const formulario = document.getElementById("formulario");
const photo = document.getElementById('input-user-img')
const phone = document.getElementById('user-phone_number')


document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    // Reseta todos os ícones para "unchecked"
    document.querySelectorAll(".radio-icon").forEach((icon) => {
      icon.src = "../assets/src/icons/Radio-unchecked.png";
    });

    // Atualiza o ícone do botão selecionado para "checked"
    const selectedLabel = e.target.closest("label"); // Encontra o label correspondente
    selectedLabel.querySelector(".radio-icon").src =
      "../assets/src/icons/Radio-checked.png";
  });
});

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const label = e.target.closest("label"); // Encontra o label correspondente
    const icon = label.querySelector(".checkbox-icon");

    if (checkbox.checked) {
      label.classList.toggle("checked");
    } else {
      label.classList.toggle("checked");

    }
  });
});
function toggleCard(event) {
  const card = event.currentTarget;
  const isButton = event.target.closest("button");
  const expansivel = card.querySelector(".escondido"); // Seleciona o aumentador
  const seta = card.querySelector(".setas");

  if (!isButton) {
    expansivel.classList.toggle("expanded");
    seta.classList.toggle("invertido");
    // Atualiza a classe do aumentador
  }
}

const slider = document.getElementById("hair-size");

function updateTrack() {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #A76C39 ${value}%, #F5EAE0 ${value}%)`;
}

slider.addEventListener("input", updateTrack);
updateTrack()


function proximaPagina() {
  window.location.href = "../login";
}

function editForm(event) {


  const elementos = formulario.elements;

  for (let i = 0; i < elementos.length; i++) {
    elementos[i].disabled = !elementos[i].disabled;
  }

  if (formulario.elements[0].disabled) {
    editButton.textContent = "edit";
    document.querySelectorAll('.label-has-input').forEach(label => {
      label.classList.add('disabled');
    });
    formulario.requestSubmit();
  } else {
    editButton.textContent = "check";
    document.querySelectorAll('.label-has-input.disabled').forEach(label => {
      label.classList.remove('disabled');
    });

  }
}

