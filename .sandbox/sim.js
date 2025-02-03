fetch("./dados.json")
  .then((response) => response.json())
  .then((data) => {
    // Carrega promoções

    const promocoes = document.getElementById("promos");
    //Verifica se existe um elemento com id "promos"
    if (promocoes) {
      console.warn("Processando as informações.");
      
      Object.keys(data.servicos).forEach((algo) => {
        console.warn(data.servicos[algo])
      })
      Object.keys(data.promos).forEach((algo) => {
        console.warn(data.promos[algo])
      })

    } else {
      console.error("Não tem elemento com o ID 'promos' na página!");
    }
  });
