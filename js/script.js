const image = document.getElementById('img')
const imageFront = document.getElementById('front-side-image')
const imageBack = document.getElementById('back-side-image')
const pokemonName = document.getElementById('name')
const pokemonNameSpan = document.getElementById('name_span')
const pokemonHp = document.getElementById('hp')
const descText = document.querySelectorAll('.pokemon-card__description-text')
const pokeListImages = document.querySelectorAll('.pokemon-list__item-image')
const pokeListElements = document.querySelectorAll('.pokemon-list__item-element')
const pokeListHP = document.querySelectorAll('.pokemon-list__item-hp')
const pokeListName = document.querySelectorAll('.pokemon-list__item-name')
const pokeListItems = document.querySelectorAll('.pokemon-list__block-item')
const chevronLeft = document.querySelector('.pokemon-list__chevron--left')
const chevronRight = document.querySelector('.pokemon-list__chevron--right')
const pageCounter = document.getElementById('page-counter')

let currentPage = 89
let clickedPokemon = 1
let currentUrl = `https://pokeapi.co/api/v2/pokemon/` // max pokemon = 898


/* pokemons ids to loading in list */
let pokeIds = [1,2,3,4,5,6,7,8,9,10];
let pokeIdPage = pokeIds.map(e => e + Number(`${currentPage}0`)) 

const pokeIdPageChanger = () => pokeIdPage = pokeIds.map(e => e + Number(`${currentPage}0`)) 

chevronLeft.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--
        pageCounterChanger()
        pokeIdPageChanger()
        getPokemonList(pokeIdPage)
    } else {
        alert('There are nothing to watch')
    }
})
chevronRight.addEventListener('click', () => {
    if (currentPage < 89) {
        currentPage++
        pageCounterChanger()
        pokeIdPageChanger()
        getPokemonList(pokeIdPage)
    } else {
        alert('There are nothing to watch')
    }
})

const pageCounterChanger = () => {
    pageCounter.value = currentPage
}
pageCounterChanger()

pageCounter.addEventListener('change', () => {
    if (pageCounter.value >= 0 && pageCounter.value <= 89) {
        currentPage = pageCounter.value
        pageCounterChanger()
        pokeIdPageChanger()
        getPokemonList(pokeIdPage)
    } else {
        alert('There are nothing to watch')
        pageCounterChanger()
    }
})


for (let i = 0; i < pokeListItems.length; i++) {
    pokeListItems[i].addEventListener('click', () => {
        clickedPokemon = pokeIdPage[i] 
        pokemonCardNull()
        getPokemonCard(currentUrl + clickedPokemon)
    })
}


const getPokemonCard = async (url) => {
    try {
        const response = await fetch(url)
        const json = await response.json()
        image.src = json.sprites.front_default
        pokemonName.append(json.name)
        pokemonNameSpan.textContent = `${json.types[0].type.name} pokemon`
        image.alt = `${json.name} pokemon image`
        pokemonHp.textContent = `${json.stats[0].base_stat} HP`
        imageFront.src = json.sprites.front_default
        imageBack.src = json.sprites.back_default
        for (let i = 0; i < 5; i++) {
            descText[i].textContent = `${json.stats[i].stat.name}: ${json.stats[i].base_stat}`
        }
        if (json.sprites.back_default == null) {
            imageBack.src = 'img/pokemon-card/bg-null.jpeg'
        }
        if (json.sprites.front_default == null) {
            imageFront.src = 'img/pokemon-card/bg-null.jpeg'
        }
    } catch (error) {
        imageBack.src = 'img/pokemon-card/bg-null.jpeg'
        imageFront.src = 'img/pokemon-card/bg-null.jpeg'
        console.log(error)
    }
}
getPokemonCard(currentUrl + clickedPokemon)

const pokemonCardNull = () => {
    image.src = ''
    pokemonName.textContent = ''
    pokemonNameSpan.textContent = ''
    image.alt = ''
    pokemonHp.textContent = ''
    imageFront.src = ''
    imageBack.src = ''
    for (let i = 0; i < 5; i++) {
        descText[i].textContent = ''
    }
}


async function getPokemonList(ids) {    
    const iterablePokeListImages = Array.from(pokeListImages)  
    const iterablePokeListElements = Array.from(pokeListElements)
    const iterablePokeListHP = Array.from(pokeListHP)
    const iterablePokeListName = Array.from(pokeListName)
    const iterablePokeListItems = Array.from(pokeListItems)
    let i = 0
    for (let id of ids) {           
        const url = "https://pokeapi.co/api/v2/pokemon/" + id
        let response
        try {
            response = await fetch(url)
        } catch {
            console.log(error)
        }
        if (response.ok) {
            let json = await response.json()
            iterablePokeListImages[0].src = json.sprites.front_default
            iterablePokeListImages.shift()
            iterablePokeListElements[0].textContent = json.types[0].type.name
            iterablePokeListElements.shift()
            iterablePokeListHP[0].textContent = `${json.stats[0].base_stat} hp`
            iterablePokeListHP.shift()
            iterablePokeListName[0].textContent = json.name
            iterablePokeListName.shift()
            if (iterablePokeListItems[i].classList.contains('hidden')) {
                iterablePokeListItems[i].classList.remove('hidden')
            }
            i++
        } else {
            iterablePokeListItems[i].classList.add('hidden')
            i++
        }
        
        
    }        
}
getPokemonList(pokeIdPage)





/* Исходная функция с обработкой ошибок */

// async function getUsers(names) {
//     let res = [];                        // массив для объектов с данными о пользователях
//     for (let name of names) {            // перебираем логины в цикле
//         //let url = "https://api.github.com/users/" + name; // правильно
//         let url = "https://pokeapi.co/api/v2/pokemon/" + name;       // с ошибкой
//         let response;
//         try {
//             response = await fetch(url); // отдельный сетевой запрос
//         } catch {
//             res.push(null);
//             continue;
//         }
//         if (response.ok) {
//             let json = await response.json();
//             res.push(json);              // помещаем в массив объект с данными о пользователе
//         } else {
//             res.push(null);              // помещаем в массив значение null, если
//                                          // пользователя с таким логином на веб-сервисе нет
//         }
//     }
//     return res;                          // возвращаем массив с объектами с данными
//                                          // о пользователях
// }