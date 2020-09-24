

const modal = document.querySelector('#modal')


const buttonSearch = document.querySelector("#page-home main a")
buttonSearch.addEventListener('click', openModal)

function openModal(){
    modal.classList.remove('hide')
    
}


const closeButton = document.querySelector("#modal a")
closeButton.addEventListener("click", closeModal)
function closeModal () {
    modal.classList.toggle('hide')
}

