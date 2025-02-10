function setSelected(event) {
  const thing = event.currentTarget;
  const a = JSON.parse(localStorage.getItem("carrinho"));
  console.log(a.adicionais);
  console.log(thing.dataset.id);
  thing.classList.toggle("selected");
  if (thing.classList.contains("selected")) {
    thing.textContent = "Adicionado";
    addServiceCart(a, thing.dataset.id);
    console.log(a);
  } else {
    rmvServiceCart(a, thing.dataset.id);
    thing.textContent = "Adicionar";
  }
  aaaa()
  localStorage.setItem("carrinho", JSON.stringify(a));
}

function aaaa(){
  
  console.warn(JSON.parse(localStorage.getItem("carrinho")))
}