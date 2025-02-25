const telefoneInput = document.getElementById("user-phone_number");

      telefoneInput.addEventListener("input", function (e) {
        let valor = e.target.value;

        // Remove tudo que não for número
        valor = valor.replace(/\D/g, "");

        // Formata o DDD
        if (valor.length > 2) {
          valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        } else if (valor.length > 0) {
          valor = `(${valor}`;
        }

        // Adiciona o 9 automático após o DDD
        if (valor.length === 4) {
          valor += "9";
        }

        // Formata o restante do número (9XXXX-XXXX)
        if (valor.length > 10) {
          valor = valor.replace(/(\(\d{2}\)\s9\d{4})(\d{4}).*/, "$1-$2");
        }

        e.target.value = valor;
});