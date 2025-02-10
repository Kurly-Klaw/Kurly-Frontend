import { getUser } from '../routes/UserRoutes.js'
const infos = document.getElementById("infos")
const botaoLogin = document.getElementById("btn-login-btn")
document.addEventListener("DOMContentLoaded",async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');
    console.log(userId);
    const mainElement = document.getElementById("main");
    
    if (!userId) {
        mainElement.style.display = "none";
        infos.classList.add("rounded-b-lg")
    } else {
        mainElement.style.display = "block";
        infos.classList.remove("rounded-b-lg")
        botaoLogin.style.display = "none";
        let get = await getUser(userId);
        let contato = document.getElementById('user-phone_number');
        let nome = document.getElementById('user-name');
        nome.textContent = get.name;
        contato.textContent = get.phone_number
    }
});

