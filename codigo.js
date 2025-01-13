function verificarLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

   
    if (email === "") {
        alert("Por favor, preencha o campo de e-mail.");
        return;
    }

    if (senha === "") {
        alert("Por favor, preencha o campo de senha.");
        return;
    }

    
    if (email.includes(" ")) {
        alert("Email inválido! Não deve conter espaços.");
        return;
    }

    
    alert("Verificação de login iniciada...");

   
    var dadosLogin = {
        email: email,
        senha: senha
    };

    var urlBackEnd = "https://jsonplaceholder.typicode.com/posts";

    fetch(urlBackEnd, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dadosLogin) 
    })
    .then(response => response.json()) 
    .then(data => {
 
        alert("Resposta da API: " + JSON.stringify(data));
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
}


/*
Cadastramento
*/


document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault(); 

    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;

    
    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

   
    if (!email.includes('@')) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    
    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    
    var dadosCadastro = {
        nome: nome,
        email: email,
        senha: senha
    };

    
    var urlBackEnd = "https://jsonplaceholder.typicode.com/posts"; // 

    fetch(urlBackEnd, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dadosCadastro) 
    })
    .then(response => response.json()) 
    .then(data => {
        alert("Cadastro realizado com sucesso!");
        console.log("Dados cadastrados:", data); 
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
});
