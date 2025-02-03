if (!localStorage.getItem("carrinho")) {
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

function adicionarAoCarrinho(idItem, isPromo = false) {
  // Recupera o carrinho atual
  console.log(localStorage.getItem("carrinho"));
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  
  if (isPromo) {
    // Atualiza o serviço principal (combo)
    carrinho.servicoPrincipal = idItem;
    
  } else {
    console.log("Oi")
    // Adiciona um acréscimo (serviço unitário)
    if (!carrinho.adicionais.includes(idItem)) {
        
      carrinho.adicionais.push(idItem);
    }
  }
  
  // Atualiza o total
  //carrinho.total = calcularTotal(carrinho);

  // Salva no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function calcularTotal(carrinho) {
  let total = 0;

  // Preço do serviço principal
  if (carrinho.servicoPrincipal) {
    const id = carrinho.servicoPrincipal.replace("promo-", "combo-");
    total += data.promos[id].preco; // Assume que "data" é seu JSON carregado
  }

  // Preço dos acréscimos
  carrinho.acrescimos.forEach((id) => {
    total += data.servicos[id].preco;
  });

  return total;
}

function attachEventListeners() {
  const btn_agendar = document.querySelectorAll(".btn-agendar");
  const btn_adicionar = document.querySelectorAll(".btn-agendar");

  btn_agendar.forEach((botao) => {
    botao.addEventListener("click", function () {
      // Recupera o id específico do botão (do atributo data-id)
      const idSelecionado = this.getAttribute("data-id");

      try {
        // Salva no localStorage
        localStorage.setItem("servicoSelecionado", idSelecionado);
        adicionarAoCarrinho(idSelecionado);

        //window.location.href = "adicional.html";
      } catch (error) {
        console.error(error);
      }
    });
  });
}
