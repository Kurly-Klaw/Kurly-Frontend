document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      // Reseta todos os ícones para "unchecked"
      document.querySelectorAll('.radio-icon').forEach((icon) => {
        icon.src = "src/Radio-unchecked.png";
      });
  
      // Atualiza o ícone do botão selecionado para "checked"
      const selectedLabel = e.target.closest('label'); // Encontra o label correspondente
      selectedLabel.querySelector('.radio-icon').src = "src/Radio-checked.png";
    });
  });
  
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const label = e.target.closest('label'); // Encontra o label correspondente
      const icon = label.querySelector('.checkbox-icon');
  
      if (checkbox.checked) {
        icon.src = "src/Checkbox-checked.png"; // Define o ícone "checked"
      } else {
        icon.src = "src/Checkbox-unchecked.png"; // Retorna ao ícone "unchecked"
      }
    });
  });
  function toggleCard(event) {
    const card = event.currentTarget;
    const isButton = event.target.closest('button');
    const aumentador = card.querySelector('.aumentador'); // Seleciona o aumentador

    if (!isButton) {
        card.classList.toggle('expanded');
        // Atualiza a classe do aumentador
        if (isExpanded) {
          aumentador.style.top = 'auto';
          aumentador.style.bottom = '0';
      } else {
          aumentador.style.top = '100%';
          aumentador.style.bottom = 'auto';
      }
  }
}

// Acessando o slider e os botões
const slider = document.getElementById("hair-condition");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

// Função para diminuir o valor do slider
decreaseButton.addEventListener("click", () => {
    if (slider.value > slider.min) {
        slider.value -= 1;
    }
});

// Função para aumentar o valor do slider
increaseButton.addEventListener("click", () => {
    if (slider.value < slider.max) {
        slider.value = parseInt(slider.value) + 1;
    }
});
