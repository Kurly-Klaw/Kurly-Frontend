import { getUser, createUser } from '../routes/UserRoutes.js'

let form = document.getElementById('cadastrar');

function logar(email, senha) {
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let nome = document.getElementById('idName');
    let telefone = document.getElementById('idTel');
    let email = document.getElementById('idEmail');
    let senha = document.getElementById('idSenha');
    let confirmaSenha = document.getElementById('idConfirmaSenha');
    let bamgiarra = false
    if (senha.value === confirmaSenha.value) {
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
            sessionStorage.setItem('user_id', response.user_id);
            window.location.href = "profile.html";
        }
    }
})