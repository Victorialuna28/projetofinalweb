console.log("APP.JS CARREGADO!");



function fazerLogin(event) {
    event.preventDefault();

    let login = document.getElementById("login").value.trim();
    let senha = document.getElementById("senha").value.trim();

    let usuariosFixos = [
       
        { login: "admin", senha: "123", cargo: "Administrador", tipo: "admin" } 
    ];

    
    let usuariosCriados = JSON.parse(localStorage.getItem("usuarios")) || [];

    let todosUsuarios = [...usuariosFixos, ...usuariosCriados];

    let usuario = todosUsuarios.find(u => u.login === login && u.senha === senha);

    if (!usuario) {
        
        console.error("Usuário ou senha incorretos!");
       
        return;
    }

  
    localStorage.setItem("logado", JSON.stringify(usuario));
    
    
    window.location.href = "dashboard.html";
}


function proteger() {
   
    let usuario = JSON.parse(localStorage.getItem("logado"));

    if (!usuario) {
        
        console.warn("Usuário não autenticado. Redirecionando para login.");
        window.location.href = "index.html";
        return;
    }

    const userInfoElement = document.getElementById("usuarioInfo");
    if (userInfoElement) {
        userInfoElement.textContent =
            "Logado como: " + usuario.login + " (" + (usuario.cargo || usuario.tipo) + ")";
    }
}


function logout() {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
}


function salvarFuncionario(event) {
    event.preventDefault();

    // 1. Captura de dados
    let nome = document.getElementById("Nome").value;
    let conselho = document.getElementById("Conselho").value;
    let email = document.getElementById("Email").value;
    let cargo = document.getElementById("Cargo").value;
    let login = document.getElementById("Login").value;
    let senha = document.getElementById("Senha").value; 

    if (!senha || !login) {
        console.error("O login e a senha são obrigatórios!");
        return;
    }

    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

   
    if (usuarios.some(u => u.login === login)) {
        console.warn("Este login já está em uso!");
        return;
    }

    
    let funcionario = {
        nome: nome,
        conselho: conselho,
        email: email,
        cargo: cargo,
        login: login,
    };
    lista.push(funcionario);
    localStorage.setItem("listaFuncionarios", JSON.stringify(lista));

    
    let usuarioCriado = {
        login: login,
        senha: senha, 
        cargo: cargo,
        email: email
    };
    usuarios.push(usuarioCriado);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Funcionário cadastrado com sucesso!"); 

    document.getElementById("formFuncionario").reset();
    carregarFuncionarios();
}


function carregarFuncionarios() {
    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];

    let tabela = document.querySelector("#tabelaFuncionarios tbody");
    if (!tabela) return; 

   
    let linhasHTML = []; 

    lista.forEach((f, index) => {
        let linha = `
        <tr>
          <td>${f.nome}</td>
          <td>${f.conselho ?? "-"}</td>
          <td>${f.email}</td>
          <td>${f.login}</td>
          <td>${f.cargo}</td>
          <td>
            <button onclick="removerFuncionario(${index})">Excluir</button>
          </td>
        </tr>
        `;
        linhasHTML.push(linha);
    });
    
    tabela.innerHTML = linhasHTML.join(''); 
}


function removerFuncionario(indice) {
    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    console.log(`Tentando remover o funcionário no índice: ${indice}`);

    let removido = lista[indice];
    if (!removido) return; 

    
    usuarios = usuarios.filter(u => u.login !== removido.login);

    
    lista.splice(indice, 1);

    localStorage.setItem("listaFuncionarios", JSON.stringify(lista));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    carregarFuncionarios();
}