function protegerMenu() {
    let usuario = JSON.parse(localStorage.getItem("Logado"));

    if (!usuario) {
        alert("Voce precisa fazer login");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("usuarioInfo").textContent =
    "Logado como: " + usuario.email + " (" +usuario.cargo + ")";
}