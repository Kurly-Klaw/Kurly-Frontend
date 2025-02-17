const editButton = document.getElementById('edit-pencil-icon');
const formulario = document.getElementById('formulario');

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      // Reseta todos os ícones para "unchecked"
      document.querySelectorAll('.radio-icon').forEach((icon) => {
        icon.src = "../assets/src/icons/Radio-unchecked.png";
      });
  
      // Atualiza o ícone do botão selecionado para "checked"
      const selectedLabel = e.target.closest('label'); // Encontra o label correspondente
      selectedLabel.querySelector('.radio-icon').src = "../assets/src/icons/Radio-checked.png";
    });
  }); 
  
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const label = e.target.closest('label'); // Encontra o label correspondente
      const icon = label.querySelector('.checkbox-icon');
  
      if (checkbox.checked) {
        icon.src = "../assets/src/icons/Checkbox-checked.png"; // Define o ícone "checked"
      } else {
        icon.src = "../assets/src/icons/Checkbox-unchecked.png"; // Retorna ao ícone "unchecked"
      }
    });
  });
  function toggleCard(event) {
    const card = event.currentTarget;
    const isButton = event.target.closest('button');
    const expansivel = card.querySelector('.escondido'); // Seleciona o aumentador
    const seta = card.querySelector('.setas');

    if (!isButton) {
      expansivel.classList.toggle('expanded');
      seta.classList.toggle('invertido');
        // Atualiza a classe do aumentador
  }
}

// Acessando o slider e os botões
const slider = document.getElementById("hair-size");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

// Função para diminuir o valor do slider
// decreaseButton.addEventListener("click", () => {
//     if (slider.value > slider.min) {
//         slider.value = parseInt(slider.value) - 1;
//         slider.dispatchEvent(new Event("input"));
//     }
// });

// Função para aumentar o valor do slider
// increaseButton.addEventListener("click", () => {
//     if (slider.value < slider.max) {
//         slider.value = parseInt(slider.value) + 1;
//         slider.dispatchEvent(new Event("input"));
//     }
// });



function proximaPagina(){
  window.location.href = "../login"
}



function editForm(event){
  const elementos = formulario.elements;

  for (let i = 0; i < elementos.length; i++) {
    elementos[i].disabled = !elementos[i].disabled;
  }

  if (formulario.elements[0].disabled) {
    editButton.textContent = 'edit';
    formulario.requestSubmit()
} else {
    editButton.textContent = 'check'; 
}

}