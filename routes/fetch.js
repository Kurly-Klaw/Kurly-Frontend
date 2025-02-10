class Fetch {
    constructor() {
        this.baseURL = '';  // A baseURL será configurada aqui
        this.headers = {};   // Os headers também serão configurados aqui
    }

    // Método 'create' que recebe os parâmetros e os atribui a 'this'
    create(parameters) {
        const { baseURL, headers } = parameters;  // Desestrutura os parâmetros passados
        this.baseURL = baseURL || this.baseURL;  // Se 'baseURL' for passada, usa ela, caso contrário, mantém a anterior
        this.headers = headers || this.headers;  // O mesmo para 'headers'
        return this;
    }

    // Método GET para fazer uma requisição
    async get(path, headers = {}) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'GET',
            headers: {
                ...this.headers,
                ...headers
            }
        });
        const data = await response.json();
        return data;
    }

    // Método POST com suporte para headers adicionais
    async post(path, body, headers = {}) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'POST',
            headers: {
                ...this.headers,
                ...headers,
                'Content-Type': 'application/json'  // Garante que o Content-Type esteja presente
            },
            body: JSON.stringify(body), // Corpo da requisição convertido para JSON
        });

        const data = await response.json();
        return data;
    }

    // Método PUT com suporte para headers adicionais
    async put(path, body, headers = {}) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'PUT',
            headers: {
                ...this.headers,
                ...headers,
                'Content-Type': 'application/json'  // Garante que o Content-Type esteja presente
            },
            body: JSON.stringify(body), // Corpo da requisição convertido para JSON
        });

        const data = await response.json();
        return data;
    }

    // Método DELETE com suporte para headers adicionais
    async delete(path, headers = {}) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                ...headers
            }
        });

        const data = await response.json();
        return data;
    }
}

export default Fetch;
