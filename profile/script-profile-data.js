import { getUser, updateUser } from "../routes/UserRoutes.js";
import { pushForm } from "./script-profile-form.js";
import { chanceIconHair } from "./script-hairicon.js";

const infos = document.getElementById("infos");
const botaoLogin = document.getElementById("btn-login-btn");
const nome = document.getElementById("user-name");
const contato = document.getElementById("user-phone_number");
const email = document.getElementById("user-email");

let formulario = document.getElementById("formulario");

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const userId = sessionStorage.getItem("user_id");
  const authorization = document.cookie
  const mainElement = document.getElementById("profile");
  if (!authorization) {
    //mainElement.style.display = "none";

    infos.classList.add("rounded-b-lg");
  } else if (authorization) {
    infos.classList.remove("rounded-b-lg");
    let get = await getUser(userId);
    //console.log(get);
    nome.textContent = get.name;
    email.textContent = get.email;
    console.log(get.image)
    chanceIconHair(get.hair_type)
    pushForm(get.hair_problems, get.hair_size, get.hair_type, get.phone_number, get.image)
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
      const reader = new FileReader();
      reader.onloadend = function() {
          const base64Image = reader.result;
          // Salve a imagem em algum lugar (por exemplo, no localStorage ou em um servidor)
          sessionStorage.setItem("image", base64Image);
          // Exiba a imagem no frontend
          let a = '.assets/src/icons/User-icon.png'
          document.getElementById("imagePreview").src = base64Image;
      };
      reader.readAsDataURL(file); // Converte a imagem para Base64
  }




  // if (file) {
  //   blobURL = URL.createObjectURL(file);

  //   localStorage.setItem("image", blobURL);
  //   // Exiba a imagem no frontend
  //   document.getElementById("imagePreview").src = blobURL;


  // }

  size = { 0: "Curto", 1: "Médio", 2: "Longo" }[size.value];

  let temp = [];
  for (let i = 0; i < issues.length; i++) temp.push(issues[i].value);
  issues = temp;
  // //console.warn(hairType, size, issues);

  //Envia para o back as informações
  await updateUser(
    {
      "hair_size": `${size}`,
      "hair_type": `${hairType}`,
      "hair_problems": issues,
      "phone_number": phone,
      "image": sessionStorage.getItem('image'),
    },
    userId
  );
  //console.log(get);
});



