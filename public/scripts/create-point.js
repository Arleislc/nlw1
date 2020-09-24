function populateUFs () {
    const ufSelect=document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( res => res.json())
        .then( states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
            }
        })
}

function getCities (event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
   
 
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = `<option value=""> Carregando as cidades </option>`
    citySelect.disabled= true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
        .then( res => res.json())
        .then( cities => {
            citySelect.innerHTML = ""
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
                
            }  
            citySelect.disabled= false
        })
    
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




//items de coleta

//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")
let selectedItems = []

function handleSelectedItem(event){
    // const itemId = event.target.dataset.id-1
    // let item = itemsToCollect[itemId]
    // const selected = item.className == "selected"
    // selected ? item.className = "" : item.className = "selected"

    //adicionar ou remover uma classe com javascript
    const itemLi = event.target
    itemLi.classList.toggle('selected')
    itemId = itemLi.dataset.id

    //para debugar
    // console.log('itemID: ',  itemId)

    //verificar se existem itens selecionados
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item=>{
        const itemFound = item==itemId
        return itemFound
    })
        //se já estiver selecionado
    // alreadySelected ? selectedItems.pop(itemLi):selectedItems.push(itemLi)
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item !=itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems
        //se não estiver selecionado
    } else {
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //para debugar
    // console.log('selectedItems: ', selectedItems)

    //atualizar o item escondido com os itens selecionados
    
    collectedItems.value = selectedItems
  
}
