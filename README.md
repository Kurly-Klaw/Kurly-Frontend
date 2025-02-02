# Kurly-Frontend

### Repositório de Frontend do Projeto da equipe Kurly Klaw


#### Siga os passos abaixo para iniciar o desenvolvimento font:

- Clone este repositório para o seu computador:

<pre>
<code>git clone https://github.com/Kurly-Klaw/Kurly-Frontend.git

cd kurly-frontend</code>
</pre>

 - Para utilizar o Tailwind no desenvolvimento da pagina:

<pre>
<code>//Instala tailwind no diretorio</code>    
npm install -D tailwindcss 

//Cria o arquivo "tailwind.config.js"
npx tailwindcss init 
</pre>

- Crie o arquivo *"tail.css"* e inclua as seguintes linhas:
<pre>@tailwind base;
@tailwind components;
@tailwind utilities;</pre>

- Crie o arquivo *"style.css"* e deixe em branco

- Edite o arquivo **"tailwind.config.js"** com esse conteúdo:

<pre>
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["pages/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
</pre>
- Após isso, inicie o framework
<pre><code>npx tailwindcss -i tail.css -o style.css --watch</code> 
</pre>


- Para padronizar elementos com estilos repetitivos, edite o arquivo *"tail.css"* seguindo o seguinte padrão:


<pre>
@tailwind base;
@tailwind components;
@tailwind utilities;

.class-from-element{
    @apply class-tail-1 class-from-tail-500;
}
</pre>


 ## Estrutura das páginas:

### Utilize esse padrão para manter o projeto organizado.
 <pre><code>./

├── src/ # Diretorio de imagens

│ └── img.png # Arquivo exemplo

├── scripts/ # Diretorio de scripts JavaScript

├── style.css # Arquivo CSS aplicado às páginas

├── tail.css # Arquivo CSS necessário ao tailwind

└── README.md # Este arquivo

</code></pre>
