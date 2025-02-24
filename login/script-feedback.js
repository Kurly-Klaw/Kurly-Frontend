window.onload = function () {
    // Função para criar o bloco de notificação dinamicamente
    function createNotification(message) {
        // Verifica se o bloco já existe
        if (document.getElementById('notification')) return;

        // Criando o elemento de notificação
        const notification = document.createElement('div');
        const anchor = document.createElement('a');
        anchor.addEventListener('click', () => {
            sessionStorage.setItem('come_from', window.location.pathname)
        })
        notification.id = 'notification';
        notification.classList('fixed z-50')

        // Criando o texto da mensagem
        const messageElement = document.createElement('p');
        messageElement.textContent = message;

        // Adicionando a mensagem ao bloco de notificação
        notification.appendChild(messageElement);

        // Adicionando o bloco de notificação ao body da página
        document.body.appendChild(notification);
    }

    // Função para remover a notificação
    function removeNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.remove();
        }
    }

    // Função que controla o comportamento de exibição de notificação
    function checkSession() {
        if (!checkCookie()) {
            createNotification("Você está logado, redirecionando para o perfil")
            setTimeout(function () {
                window.location.href = "../profile/";
            }, 1500);
        }
    }

    setInterval(checkSession, 1000); // Ajuste o tempo conforme necessário

    // Chamada inicial para verificar o estado da sessão
    checkSession();
};


function profile() {
    const dialog = document.createElement('dialog')
    dialog.show()
    dialog.innerHTML = `
    
    <div class="popupContent">
      <h2>Você está desconectado!</h2>
      <p class="text-justify">
        Para acessar os dados do seu perfil, você precisa estar conectado.
        Realize o login para aproveitar melhor nossos serviços.
      </p>
      <div class="btn-login-container">
        <button id="btn-login-btn" class="btn-login" onclick="proximaPagina()">
          Fazer Login
        </button>
      </div>
    </div>`
    let body = document.querySelector('body')
    body.appendChild(dialog)
    document.cookie = 'authorization='
}