
import Modal from './modal.js'

const modal = Modal()
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')
const deleteButton = document.querySelectorAll('.actions a.delete')

//pegar todos os botões com a classe check
const checkButtons  = document.querySelectorAll('.actions a.check')

checkButtons.forEach( button => {
    // armazenar o evento no parâmetro "button"
    button.addEventListener('click', handleClick)
        
})

deleteButton.forEach(button => {
    button.addEventListener('click', (event) => handleClick (event, false))

})

function handleClick(event, check = true){

    const form = document.querySelector('.modal form')
    const roomId = document.querySelector('#room-id').dataset.id    
    const text = check ? "marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const questionId = event.target.dataset.id

    event.preventDefault()
    
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${text.toLowerCase()} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim ${text.toLowerCase()}`
    check? modalButton.classList.remove('red') : modalButton.classList.add('red')

    modal.open()
}