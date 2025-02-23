import { getUser, updateUser } from "../routes/UserRoutes.js";
import { pushForm } from "./script-profile-form.js";
const infos = document.getElementById("infos");
const botaoLogin = document.getElementById("btn-login-btn");
const nome = document.getElementById("user-name");
const contato = document.getElementById("user-phone_number");
const email = document.getElementById("user-email");
const id = document.getElementById("user-id");
const popup = document.getElementById('doLogin')
let formulario = document.getElementById("formulario");

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const userId = sessionStorage.getItem("user_id");
  //console.log(userId);
  const mainElement = document.getElementById("profile");
  if (!userId) {
    //mainElement.style.display = "none";
    popup.showModal()
    infos.classList.add("rounded-b-lg");
  } else if (userId) {
    popup.close()
    infos.classList.remove("rounded-b-lg");
    botaoLogin.style.display = "none";

    let get = await getUser(userId);
    //console.log(get);
    nome.textContent = get.name;
    email.textContent = get.email;
    id.textContent = userId;
    console.log(get.imagem)
    pushForm(get.hair_problems, get.hair_size, get.hair_type, get.phone_number,get.imagem)
  }
});

formulario.addEventListener("submit", async (e) => {
  const userId = sessionStorage.getItem("user_id");

  //Previne o recarregamento da página
  e.preventDefault();
  //console.log(userId);
  //Pega os dados do formulario
  let hairType = document.querySelector('input[name="hairType"]:checked').value;
  let size = document.querySelector("#hair-size");
  let issues = document.querySelectorAll('input[name="issues"]:checked');
  let phone = document.querySelector('#user-phone_number').value
  let file = document.querySelector('#input-user-img').files[0]
  let blobURL

  if (file) {

    blobURL = URL.createObjectURL(file);
    
    localStorage.setItem("image", blobURL);
      // Exiba a imagem no frontend
      document.getElementById("imagePreview").src = blobURL;
    
    
  }

  size = { 0: "Curto", 1: "Médio", 2: "Longo" }[size.value];

  let temp = [];
  for (let i = 0; i < issues.length; i++) temp.push(issues[i].value);
  issues = temp;
  // //console.warn(hairType, size, issues);

  await updateUser(
    {
      "hair_size": `${size}`,
      "hair_type": `${hairType}`,
      "hair_problems": issues,
      "phone_number": phone,
      "imagem": blobURL,
    },
    userId
  );
  //console.log(get);
});



