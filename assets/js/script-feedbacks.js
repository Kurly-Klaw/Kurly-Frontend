window.onload = function () {
    // Função para verificar se o cookie de sessão existe
    function checkCookie() {
        const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('authorization='));
        return cookie !== undefined;
    }

    // Função para criar o bloco de notificação dinamicamente
    function createNotification(message, needButon = false) {

        // Verifica se o bloco já existe
        if (document.getElementById('notification')) return;

        // Criando o elemento de notificação
        const notification = document.createElement('div');
        const button = document.createElement('a');
        button.classList.add('link')
        button.textContent = 'Ir para tela de Login'
        button.addEventListener('click', () => {
            sessionStorage.setItem('come_from', window.location.pathname)
            window.location.href = "../login/"
        })
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
        

        // Criando o texto da mensagem
        const messageElement = document.createElement('p');
        messageElement.textContent = message;

        // Adicionando a mensagem ao bloco de notificação
        notification.append(messageElement, button);

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

            let current_location = window.location.pathname
            switch (current_location) {

                case "/profile/":
                    createNotification("Faça login para acessar seu perfil.", true)
                    break
                case "/confirmar/":
                    createNotification("Para agendar, faça login.", true)
                    break

            }
        } else {
            removeNotification();
        }
    }

    setInterval(checkSession, 1000); // Ajuste o tempo conforme necessário

    // Chamada inicial para verificar o estado da sessão
    checkSession();
};


function profile() {
    console.warn("LOl")
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
    //document.cookie = 'authorization='
}