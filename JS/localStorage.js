function attachEventListeners(){
    const botoes = document.querySelectorAll('.btn-agendar');

    botoes.forEach(botao => {
        botao.addEventListener('click', function () {
            // Recupera o id específico do botão (do atributo data-id)
            const idSelecionado = this.getAttribute('data-id');

            try {
                // Salva no localStorage
                localStorage.setItem('servicoSelecionado', idSelecionado);

                // Se desejar, aguarde um tempo (por exemplo, 1,5 segundos) e então redirecione
                window.location.href = 'adicional.html';
            } catch (error) {
                // Caso ocorra algum erro, exibe uma mensagem de erro
                // feedback.textContent = 'Ocorreu um erro ao salvar a informação.';
                // feedback.style.color = 'red';
            }
        });
    });
}