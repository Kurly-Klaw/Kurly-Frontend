document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      // Reseta todos os ícones para "unchecked"
      document.querySelectorAll('.radio-icon').forEach((icon) => {
        icon.src = "Imagens/Radio-unchecked.png";
      });
  
      // Atualiza o ícone do botão selecionado para "checked"
      const selectedLabel = e.target.closest('label'); // Encontra o label correspondente
      selectedLabel.querySelector('.radio-icon').src = "Imagens/Radio-checked.png";
    });
  });
  
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const label = e.target.closest('label'); // Encontra o label correspondente
      const icon = label.querySelector('.checkbox-icon');
  
      if (checkbox.checked) {
        icon.src = "Imagens/Checkbox-checked.png"; // Define o ícone "checked"
      } else {
        icon.src = "Imagens/Checkbox-unchecked.png"; // Retorna ao ícone "unchecked"
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