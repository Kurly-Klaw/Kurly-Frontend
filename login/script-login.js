import { loginUser } from '../routes/UserRoutes.js'

let button = document.getElementById('btnLogin');
const ACCESS_TOKEN_SECRET = 'a1dcd2995c6542f547ddb0f00741aec7d1e8037456fa505bc0c042737328351a'


function checkCookie() {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('authorization='));
    return cookie !== undefined;
}

document.cookie.split(';').find(cookie => cookie.trim().startsWith('authorization=')) !== undefined ? window.location.href = "../profile/" : {}

button.addEventListener('click', async (e) => {
    e.preventDefault();

    let email = document.getElementById('idEmail');
    let senha = document.getElementById('idSenha');

    let response = await loginUser({
        "email": email.value,
        "password": senha.value,
    });

    const payload = parseJWT(response.token);

    if (response.token) {

        var expires = (new Date(Date.now() + 15 * 60000)).toUTCString();
        document.cookie = `authorization=${response.token};expires=${expires};path=/`;

        sessionStorage.setItem('user_id', payload.user_id);
        sessionStorage.setItem('user_type', payload.role);

        createNotification("Logado com sucesso, redirecionando..")

        if (payload.role == 'admin') {
            window.location.href = '../admin'
        } else {
            let temp = sessionStorage.getItem('come_from')
            sessionStorage.removeItem('come_from')
            window.location.href = `..${temp}`
        }


    }
})


function parseJWT(token) {
    // O token JWT é composto por 3 partes separadas por "."
    const base64Url = token.split('.')[1];
    // Adicionamos padding, se necessário
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decodificando base64 para uma string UTF-8
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''));
    // Retornando o payload como um objeto JSON
    return JSON.parse(jsonPayload);
}

function createNotification(message) {
    // Verifica se o bloco já existe
    if (document.getElementById('notification')) return;

    // Criando o elemento de notificação

    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.style.position = 'fixed';
    notification.style.top = '0';
    notification.style.left = '0';
    notification.style.width = '100%';
    notification.style.backgroundColor = '#d9d9d9'; // Vermelho para erro
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.textAlign = 'center';
    notification.style.fontSize = '16px';
    notification.style.zIndex = '1000';

    // Criando o texto da mensagem
    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    // Adicionando a mensagem ao bloco de notificação
    notification.appendChild(messageElement);

    // Adicionando o bloco de notificação ao body da página
    document.body.appendChild(notification);
}