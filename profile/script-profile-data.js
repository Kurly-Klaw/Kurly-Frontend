import { getUser, updateUser } from '../routes/UserRoutes.js'
const infos = document.getElementById("infos")
const botaoLogin = document.getElementById("btn-login-btn")
const nome = document.getElementById('user-name');
const contato = document.getElementById('user-phone_number');
const email = document.getElementById('user-email');
const id = document.getElementById('user-id');
let formulario = document.getElementById('formulario');



document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');
    console.log(userId);
    const mainElement = document.getElementById("profile");
    if (!userId) {
        //mainElement.style.display = "none";
        infos.classList.add("rounded-b-lg")
    } else if (userId) {
        mainElement.style.display = "flex";
        infos.classList.remove("rounded-b-lg")
        botaoLogin.style.display = "none";
        let get = await getUser(userId);
        console.warn(get.name)
        nome.textContent = get.name;
        contato.textContent = get.phone_number
        email.textContent = get.email
        id.textContent = userId

    }
});

formulario.addEventListener('submit', async (e) => {
    const userId = sessionStorage.getItem('user_id')

    //Previne o recarregamento da página
    e.preventDefault();
    console.log(userId)
    //Pega os dados do formulario
    let hairType = document.querySelector('input[name="hairType"]:checked').value;
    let size = document.querySelector('#hair-size');
    let issues = document.querySelectorAll('input[name="issues"]:checked');
    size = { 1: "Curto", 2: "Médio", 3: "Longo" }[size.value]

    let temp = []
    for (let i = 0; i < issues.length; i++) temp.push(issues[i].value)
    issues = temp
    console.warn(hairType, size, issues);

    let get = await updateUser({
            "hair_size": `${size}`,
            "hair_type": `${size}`,
            "hair_problems": issues}, userId)
    console.error("AAAAAAAAAA", await getUser(userId))
}
)
