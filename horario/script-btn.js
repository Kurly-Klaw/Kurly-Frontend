document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.getElementById('continueButton');
    let selectedItem

    // Adiciona um evento de mudança ao select
    selectElement.addEventListener('change', function() {
        // Armazena o valor selecionado no sessionStorage
        sessionStorage.setItem('selectedItem', this.value);
    });

    // Adiciona um evento de clique ao botão de continuar
    continueButton.addEventListener('click', function(event) {
        // Verifica se um item foi selecionado
        selectedItem = document.querySelector('.selected')

        if (!selectedItem) {
            // Se nenhum item foi selecionado, impede a navegação
            event.preventDefault();
            alert('Por favor, selecione um item antes de continuar.');
        }
        // Se um item foi selecionado, o link segue normalmente
    });
});