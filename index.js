let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: new Date(2024, 1, 5, 20, 20)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 19, 23),
    dataCheckIn: new Date(2024, 0, 20, 20, 20)
  },
  {
    nome: "Carlos Souza",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 19, 23),
    dataCheckIn: new Date(2024, 2, 12, 20, 20)
  },
  {
    nome: "Fernanda Oliveira",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 19, 23),
    dataCheckIn: new Date(2024, 2, 2, 20, 20)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 19, 23),
    dataCheckIn: new Date(2024, 0, 8, 20, 20)
  },
  {
    nome: "Marina Lima",
    email: "marina@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 19, 23),
    dataCheckIn: new Date(2024, 1, 25, 20, 20)
  },
  {
    nome: "Lucas Pereira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 19, 23),
    dataCheckIn: new Date(2024, 0, 15, 20, 20)
  },
  {
    nome: "Aline Costa",
    email: "aline@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 19, 23),
    dataCheckIn: new Date(2024, 2, 7, 20, 20)
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 19, 23),
    dataCheckIn: new Date(2024, 1, 8, 20, 20)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)

  }
  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }


  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}