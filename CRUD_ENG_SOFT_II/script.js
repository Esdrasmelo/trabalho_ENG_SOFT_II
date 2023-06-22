const createModal = document.querySelector("#modalCriar");
const editModal = document.querySelector("#modalEditar");
const tabBody = document.querySelector("#tabody");

const sNome = document.querySelector("#m-nome");
const sSalario = document.querySelector("#m-salario");
const sContato = document.querySelector("#m-contato");
const sAtivo = document.querySelector("#m-ativo");
const sNomeEdicao = document.getElementById("m-nome-editar");
const sSalarioEdicao = document.getElementById("m-salario-editar");
const sContatoEdicao = document.getElementById("m-contato-editar");
const sAtivoEdicao = document.getElementById("m-ativo-editar");
const sEmailEdicao = document.getElementById("m-email-editar");

const btnSalvar = document.getElementById("btnSalvar");
const btnSalvarEditar = document.getElementById("btnSalvarEditar");

var editUserIndex = null;

const url = "http://localhost:3000/users";


function carregarTela() {
  axios
    .get(url)
    .then((response) => {
      const itens = response.data;
      tabBody.innerHTML = "";
      itens.forEach((item, index) => {
        addItem(item, item.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function addItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.employee_name}</td>
    <td>${item.email}</td>
    <td>Barbeiro</td>
    <td>R$${item.salary}</td>
    <td>${item.phone_number}</td>
    <td>${item.is_active}</td>   
    <td><button onclick="openEditModal('${index}')" id="btnEditar">Editar</button></td>
    <td><button onclick="deleteEmployee('${index}')" id="btnDeletar">Deletar</button></td>
    `;
  tabBody.appendChild(tr);
}

function saveData() {
  event.preventDefault();

  let employee_name = document.getElementById("m-nome").value;
  let salary = document.getElementById("m-salario").value;
  let phone_number = document.getElementById("m-contato").value;
  let is_active = document.getElementById("m-ativo").value;
  let email = document.getElementById("m-email").value;
  let password = document.getElementById("m-senha").value;
  is_active = is_active === "Sim" ? true : false;
  salary = Number(salary);

  const data = {
    employee_name: employee_name,
    salary: salary,
    phone_number: phone_number,
    is_active: is_active,
    email: email,
    password: password
  };
  console.log(data);

  return axios
    .post(url, data)
    .then((response) => {
      console.log(response);  
      carregarTela();
      closeModal();
    })
    .catch(function (error) {
      console.log();
      error.response.data.forEach(element => {
        switch (element.field) {
          case 'email':
            alert("Digite um email válido");
            break;
          case 'password':
            alert("Digite uma senha maior que oito, caracter especial, letra maiuscula e minúscula");
            break;
          case 'phone_number':
            alert("Digite um número de telefone válido");
            break;
          default:
            break;
        }
      });
    });
}

function editItem() {
  event.preventDefault();

  let employee_name = document.getElementById("m-nome-editar").value;
  let salary = document.getElementById("m-salario-editar").value;
  let phone_number = document.getElementById("m-contato-editar").value;
  let is_active = document.getElementById("m-ativo-editar").value;
  let email = document.getElementById("m-email-editar").value;

  employee_name =
    employee_name && employee_name !== "" ? employee_name : undefined;
  salary = salary && salary !== "" ? Number(salary) : undefined;
  phone_number = phone_number && phone_number !== "" ? phone_number : undefined;
  is_active = is_active && is_active !== "" ? is_active : undefined;
  email = email && email !== "" ? email : undefined;
  is_active = is_active && is_active !== "" ? is_active : undefined;

  if (is_active) is_active = is_active === "Sim" ? true : false;

  const data = {
    employee_name,
    salary,
    phone_number,
    is_active,
    email,
  };

  return axios
    .put(`${url}/${editUserIndex}`, data)
    .then((response) => {
      carregarTela();
      closeModal();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteItem(index) {
  axios
    .delete(`${url}/${index}`)
    .then((response) => {
      carregarTela();
    })
    .catch((error) => {
      console.error(error);
    });
}

function openCreateModal(edit = false, index = 0, item = null) {
  createModal.classList.add("active");
  createModal.onclick = (e) => {
    if (e.target.id.indexOf("btnSalvar") !== -1) {
      createModal.classList.remove("active");
    }
  };

  sNome.value = "";
  sSalario.value = "";
  sContato.value = "";
  sAtivo.value = "";
}

function openEditModal(index) {
  editModal.classList.add("active");

  editModal.onclick = (e) => {
    if (e.target.id.indexOf("btnEditar") !== -1) {
      editModal.classList.remove("active");
    }
  };

  sNomeEdicao.value = "";
  sSalarioEdicao.value = "";
  sContatoEdicao.value = "";
  sAtivoEdicao.value = "";
  sEmailEdicao.value = "";

  editUserIndex = index;
}

function deleteEmployee(index) {
  return axios
    .delete(`${url}/${index}`)
    .then((response) => {
      carregarTela();
      closeModal();
    })
    .catch((error) => {
      console.error(error);
    });
}

function closeModal() {
  createModal.classList.remove("active");
  editModal.classList.remove("active");
}

btnSalvar.addEventListener("click", saveData);
btnSalvarEditar.addEventListener("click", editItem);

carregarTela();
