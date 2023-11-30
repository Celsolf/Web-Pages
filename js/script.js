var personList = [];
var count = 1;

function addPerson(name, email, cellphone) {
  var newPerson = {
    id: count++,
    name: name,
    email: email,
    cellphone: cellphone,
  };

  personList.push(newPerson);
  saveToLocalStorage();
  renderPersonList();
}

function deletePerson(personId) {
  var updatedPersonList = personList.filter(function (person) {
    return person.id !== personId;
  });

  if (updatedPersonList.length < personList.length) {
    personList = updatedPersonList;
    saveToLocalStorage();
    renderPersonList();
  } else {
    alert("Pessoa não encontrada.");
  }
}

function findPerson() {
  var nome = document.getElementById("nome").value;
  var foundPerson = personList.find(function (person) {
    return person.name === nome;
  });

  if (foundPerson) {
    // Se a pessoa for encontrada, exibe um alerta com os dados
    alert(
      "Nome: " +
        foundPerson.name +
        "\nEmail: " +
        foundPerson.email +
        "\nTelefone: " +
        foundPerson.cellphone
    );
  } else {
    alert("Pessoa não encontrada.");
    return null;
  }
}

function getPersonList() {
  var storedList = JSON.parse(localStorage.getItem("personList"));
  personList = storedList || [];
}

function renderPersonList() {
  var personListElement = document.getElementById("personList");
  personListElement.innerHTML = "";

  personList.forEach(function (person) {
    var listItem = document.createElement("li");
    listItem.innerHTML =
      'Nome: <span class="person-name">' +
      person.name +
      "</span> | Email: " +
      person.email +
      " | Telefone:" +
      person.cellphone +
      ' <button class="delete-button" onclick="deletePerson(' +
      person.id +
      ') ">Excluir</button>';
    personListElement.appendChild(listItem);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("personList", JSON.stringify(personList));
}

getPersonList();
renderPersonList();

document
  .getElementById("personForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;

    // Verifica se a pessoa já existe na lista
    var existingPerson = personList.find(function (person) {
      return person.name === nome;
    });

    if (existingPerson) {
      alert("Essa pessoa já está na lista.");
      return;
    }

    // Se não existe, adiciona a pessoa
    addPerson(nome, email, telefone);
    limparInputs();
  });

document.getElementById("btn-reset").addEventListener("click", function () {
  limparInputs();
});

document
  .getElementById("pesquisarButton")
  .addEventListener("click", function () {
    findPerson();
  });

document
  .getElementById("excluirTodosButton")
  .addEventListener("click", function () {
    excluirTudo();
  });

function limparInputs() {
  var nome = document.getElementById("nome");
  var email = document.getElementById("email");
  var telefone = document.getElementById("telefone");
  nome.value = "";
  email.value = "";
  telefone.value = "";
}

function excluirTudo() {
  localStorage.clear();
  personList = [];
  renderPersonList();
}
