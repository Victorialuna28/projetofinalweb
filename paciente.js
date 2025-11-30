function mostrarCampoPlano() {
  const tipoAtendimento = document.getElementById('TipoAtendimento').value;
  const campoNomePlano = document.getElementById('campoNomePlano');
  const inputNomePlano = document.getElementById('NomePlano');

  if (tipoAtendimento === 'Plano') {
    campoNomePlano.style.display = 'block';
    inputNomePlano.setAttribute('required', 'required');
  } else {
    campoNomePlano.style.display = 'none';
    inputNomePlano.removeAttribute('required');
    inputNomePlano.value = '';
  }
}

function carregarPacientes() {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const tabelaBody = document.querySelector('#tabelaPacientes tbody');

  if (!tabelaBody) return;

  tabelaBody.innerHTML = '';

  pacientes.forEach((paciente, index) => {
    const row = tabelaBody.insertRow();

    row.insertCell().textContent = paciente.Nome;
    row.insertCell().textContent = paciente.CPF;
    row.insertCell().textContent = paciente.Telefone;
    row.insertCell().textContent = paciente.DataNascimento;
    row.insertCell().textContent = paciente.TipoAtendimento;
    row.insertCell().textContent = paciente.NomePlano || '-';
    row.insertCell().textContent = paciente.Tratamento;
    row.insertCell().textContent = paciente.Endereco;

    const acoesCell = row.insertCell();

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => editarPaciente(index);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = () => excluirPaciente(index);

    acoesCell.appendChild(btnEditar);
    acoesCell.appendChild(btnExcluir);
  });
}

function salvarPaciente(event) {
  event.preventDefault();

  const novoPaciente = {
    Nome: document.getElementById('Nome').value.trim(),
    CPF: document.getElementById('CPF').value.trim(),
    Telefone: document.getElementById('Telefone').value.trim(),
    DataNascimento: document.getElementById('DataNascimento').value,
    TipoAtendimento: document.getElementById('TipoAtendimento').value,
    NomePlano: document.getElementById('NomePlano').value.trim(),
    Tratamento: document.getElementById('Tratamento').value.trim(),
    Endereco: document.getElementById('Endereco').value.trim()
  };

  if (!novoPaciente.Nome || !novoPaciente.CPF || !novoPaciente.DataNascimento || !novoPaciente.Tratamento) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const indiceEditando = localStorage.getItem('editando');

  if (indiceEditando !== null && indiceEditando !== "") {
    pacientes[parseInt(indiceEditando)] = novoPaciente;
    localStorage.removeItem("editando");
  } else {
    pacientes.push(novoPaciente);
  }

  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  alert("Paciente salvo!");

  document.getElementById('formPaciente').reset();
  mostrarCampoPlano();
}

function excluirPaciente(index) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  pacientes.splice(index, 1);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  carregarPacientes();
}

function editarPaciente(index) {
  localStorage.setItem("editando", index);
  window.location.href = "../html/pacientes.html";
}

function carregarEdicao() {
  const indice = localStorage.getItem("editando");
  if (indice === null || indice === "") return;

  const pacientes = JSON.parse(localStorage.getItem("pacientes"));
  const p = pacientes[indice];

  document.getElementById('Nome').value = p.Nome;
  document.getElementById('CPF').value = p.CPF;
  document.getElementById('Telefone').value = p.Telefone;
  document.getElementById('DataNascimento').value = p.DataNascimento;
  document.getElementById('TipoAtendimento').value = p.TipoAtendimento;
  document.getElementById('NomePlano').value = p.NomePlano;
  document.getElementById('Tratamento').value = p.Tratamento;
  document.getElementById('Endereco').value = p.Endereco;

  mostrarCampoPlano();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPaciente");
  if (form) form.addEventListener("submit", salvarPaciente);

  carregarEdicao();
});
