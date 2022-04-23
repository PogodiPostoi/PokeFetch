const image = document.getElementById('img')
const imageFront = document.getElementById('front-side-image')
const imageBack = document.getElementById('back-side-image')
const pokemonName = document.getElementById('name')
const pokemonNameSpan = document.getElementById('name_span')
const pokemonHp = document.getElementById('hp')
const descText = document.querySelectorAll('.pokemon-card__description-text')
const pokeListImages = document.querySelectorAll('.pokemon-list__item-image')

const dittoUrl = 'https://pokeapi.co/api/v2/pokemon/1/' // max pokemon = 898

/* pokemons ids to loading in list */
let pokeIds = [1,2,3,4,5,6,7,8,9,10];
pokeIds = pokeIds.map(e => e*60)

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
        alert('К сожалению, покемонов не будет :(')
    }
}
getPokemonCard(dittoUrl)

async function getPokemons(pokeIds) {    
    const iterablePokeListImages = Array.from(pokeListImages)           
    for (let id of pokeIds) {           
        const url = "https://pokeapi.co/api/v2/pokemon/" + id       // с ошибкой
        try {
            let response = await fetch(url) // отдельный сетевой запрос
            let json = await response.json()
            iterablePokeListImages[0].src = json.sprites.front_default
            iterablePokeListImages.shift()
        } catch {
            console.log(error)
        }
    }        
}
getPokemons(pokeIds)



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