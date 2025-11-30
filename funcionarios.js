function carregarFuncionarios() {
    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];

    let tabela = document.querySelector("#tabelaFuncionarios tbody");
    tabela.innerHTML = "";

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
        tabela.innerHTML += linha;
    });
}

function salvarFuncionario(event) {
    event.preventDefault();

    let nome = document.getElementById("Nome").value;
    let conselho = document.getElementById("Conselho").value;
    let email = document.getElementById("Email").value;
    let cargo = document.getElementById("Cargo").value;
    let login = document.getElementById("Login").value;
    let senha = document.getElementById("Senha").value;

    if (!senha || !login) {
        alert("O login e a senha são obrigatórios!");
        return;
    }

    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se login já existe
    if (usuarios.some(u => u.login === login)) {
        alert("Este login já está em uso!");
        return;
    }

    let funcionario = {
        nome: nome,
        conselho: conselho,
        email: email,
        cargo: cargo,
        login: login,
        senha: senha
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

    alert("Funcionário cadastrado com sucesso!");

    document.getElementById("formFuncionario").reset();
    carregarFuncionarios();
}

function removerFuncionario(indice) {
    let lista = JSON.parse(localStorage.getItem("listaFuncionarios")) || [];
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!confirm("Deseja realmente excluir este funcionário?")) return;

    let removido = lista[indice];

    usuarios = usuarios.filter(u => u.login !== removido.login);

    lista.splice(indice, 1);

    localStorage.setItem("listaFuncionarios", JSON.stringify(lista));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    carregarFuncionarios();
}

function fazerLogin(event) {
    event.preventDefault();

    let login = document.getElementById("login").value.trim();
    let senha = document.getElementById("senha").value.trim();

    let usuariosFixos = [
        { login: "admin", senha: "123", cargo: "admin" }
    ];

    let usuariosCriados = JSON.parse(localStorage.getItem("usuarios")) || [];

    let todosUsuarios = [...usuariosFixos, ...usuariosCriados];

    let usuario = todosUsuarios.find(u => u.login === login && u.senha === senha);

    if (!usuario) {
        alert("Usuário ou senha incorretos!");
        return;
    }

    if (!usuario) {
        alert("Usuário ou senha incorretos!");
        return;
    }

  
    localStorage.setItem("logado", JSON.stringify(usuario)); 
    
    window.location.href = "../html/dashboard.html";
}


 