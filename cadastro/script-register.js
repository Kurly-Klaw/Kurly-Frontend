import { loginUser, createUser } from '../../routes/UserRoutes.js'

let form = document.getElementById('cadastrar');

function logar(email, senha) {
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //Pega os dados da tela/FORMULÁRIO
    let nome = document.getElementById('idName');
    let telefone = document.getElementById('idTel');
    let email = document.getElementById('idEmail');
    let senha = document.getElementById('idSenha');
    let confirmaSenha = document.getElementById('idConfirmaSenha');
    let bamgiarra = false

    //verifica se as senhas são iguais
    if (senha.value === confirmaSenha.value) {

        //Manda uma verificação ao backend
        let response = await createUser({
            "name": nome.value,
            "phone_number": telefone.value,
            "email": email.value,
            "password": senha.value,
            "role": "user"
        })

        console.log(response);
        bamgiarra = response.user_id
        if (bamgiarra) {
            let response = await loginUser({
                "email": email.value,
                "password": senha.value,
            });

            const payload = parseJWT(response.token);

            console.log(payload)
            if (response.token) {
                var expires = (new Date(Date.now() + 15 * 60000)).toUTCString();
                document.cookie = `authorization=${response.token};expires=${expires};path=/`;

                sessionStorage.setItem('user_id', payload.user_id);
                sessionStorage.setItem('user_type', payload.role);

            }
            window.location.href = "../profile";
        } else if (response.code) {
            console.warn(response.message)
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
