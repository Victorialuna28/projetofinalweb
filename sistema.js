function salvarSessao(usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function getUsuario() {
    return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function logout() {
    localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
}

function proteger() {
    let usuario = getUsuario();

    if (!usuario) {
        alert("Faça login para continuar");
        window.location.href = "index.html";
        return;
    }
}

function protegerAdmin() {
    let usuario = getUsuario();

    if (!usuario || usuario.cargo !== "admin") {
        alert("Apenas ADMIN podem acessar");
        window.location.href = "../html/menu.html"
        return;
    }
}

function protegerFisio() {
    let usuario = getUsuario();

    if (!usuario || usuario.cargo !== "fisioterapeuta") {
        alert("Apenas FISIOTERAPEUTA podem acessar");
        window.location.href = "../html/menu.html"
        return;
    }
}
function protegerFuncionario() {
    let usuario = getUsuario();

    if (!usuario) {
        alert("Faça login");
        window.location.href = "index.html";
    }
}

let usuarios = [
    { email: "admin@clinica.com", senha:"123", cargo: "admin" },
    { email: "marian@clinica.com", senha:"123", cargo: "recepcionista" },
    { email: "joao@clinica.com", senha:"123", cargo: "fisioterapeuta" }
];

function fazerLogin(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        alert("Usuário ou senha incorretos!");
        return;
    }

    salvarSessao(usuario);

    window.location.href ="../html/dahsboard.html";
}