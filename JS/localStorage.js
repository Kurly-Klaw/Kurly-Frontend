function btnEventListeners() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));

  if (!carrinho) {
    defineCarrinho();
  }
  const btnAgendar = document.querySelectorAll(".btnAgendar");
  const btnAdicionar = document.querySelectorAll(".btnAdicionar");

  btnAgendar.forEach((btn) => {
    btn.addEventListener("click", function () {
      const includes = this.getAttribute("data-includes");
      const idSelecionado = this.getAttribute("data-id");
      console.warn(`Agendando o pedido ${idSelecionado}`);
      try {
        carrinho.servicoSelecionado = idSelecionado;
        carrinho.adicionais = includes.replace(/[\[\]]/g, "").split(",")
        carrinho.selection = []
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        console.log(localStorage.getItem("carrinho"));
        window.location.href = "adicional.html";
      } catch (error) {
        
        console.error("Ocorreu um erro ao agendar o pedido", error);
      }
    });
  });
}

function defineCarrinho() {
  localStorage.setItem(
    "carrinho",
    JSON.stringify({
      servicoSelecionado: null,
      adicionais: [],
      selection:[],
      total: 0,
      data: new Date().toISOString(),
    })
  );
}

function addServiceCart(cart,dataId){
    let index = cart.adicionais.indexOf(dataId)
    if(index == -1){
        cart.selection.push(dataId);
    }
}

function rmvServiceCart(cart,dataId){
    let index = cart.adicionais.indexOf(dataId)
    if(index == -1){
        cart.selection.splice(cart.selection.indexOf(dataId),1);
    }
}
