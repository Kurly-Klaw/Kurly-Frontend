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
        if (includes) carrinho.adicionais = includes
        
        
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
      total: 0,
      data: new Date().toISOString(),
    })
  );
}
