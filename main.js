
// declare sections and global variables

const menuSection = document.querySelector(".menu")
const addCardSection = document.querySelector(".add-card")
const randomCardSection = document.querySelector(".random-card")
const allCardsSection = document.querySelector(".all-cards")
const viewSingleCardSection = document.querySelector(".view-single-card")

let flashcardArray = []

// back to menu button

const backToMenuButtons = document.querySelectorAll(".back-to-menu-btn")

backToMenuButtons.forEach(btn => {
    btn.addEventListener("click", (x) => {
        addCardSection.classList.add("hide")
        randomCardSection.classList.add("hide")
        allCardsSection.classList.add("hide")
        menuSection.classList.remove("hide")

        nameInput.value = ""
        descriptionInput.value = ""

        nameCardSection.classList.remove("hide")
        describeCardSection.classList.add("hide")

        card.innerHTML = ""
        card.classList.remove("flip-animation")
    })
})

// menu section
// declare buttons

const addNewCardButton = document.querySelector(".add-new-card-btn")
const showRandomCardButton = document.querySelector(".show-random-card-btn")
const seeAllCardsButton = document.querySelector(".see-all-cards-btn")

// add new card section
// declare variables

const nameCardSection = document.querySelector(".name-card")
const describeCardSection = document.querySelector(".describe-card")

const nameInput = document.querySelector("#name-input")
const descriptionInput = document.querySelector("#description-input")

const toDescriptionButton = document.querySelector(".to-description-btn")
const storeCardButton = document.querySelector(".store-card-btn")

// navigate to section

addNewCardButton.addEventListener("click", (x) => {
    menuSection.classList.add("hide")
    addCardSection.classList.remove("hide")
})

// add listener for next (to description) button

toDescriptionButton.addEventListener("click", (x) => {

    if (nameInput.value == ""){
        nameInput.classList.add("error")
        setTimeout(() => {
            nameInput.classList.remove("error")
        }, 400);
    } else {
        nameCardSection.classList.add("hide")
        describeCardSection.classList.remove("hide")
    }
})

// add listener for store-card button (+ save card to local storage)

storeCardButton.addEventListener("click", (x) => {

    if (descriptionInput.value == ""){
        descriptionInput.classList.add("error")
        setTimeout(() => {
            descriptionInput.classList.remove("error")
        }, 400);
    } else {
        let flashcardObject = {
            name: nameInput.value,
            description: descriptionInput.value
        }

        flashcardArray.push(flashcardObject)
        localStorage.setItem("flashcards", JSON.stringify(flashcardArray))

        nameInput.value = ""
        descriptionInput.value = ""

        nameCardSection.classList.remove("hide")
        describeCardSection.classList.add("hide")

        addCardSection.classList.add("hide")
        randomCardSection.classList.add("hide")
        allCardsSection.classList.add("hide")
        menuSection.classList.remove("hide")
    }
})

// random card section
// declare variables

const card = document.querySelector(".card")
const nextRandomCardButton = document.querySelector(".next-random-card-btn")

// navigate to section and take random card

showRandomCardButton.addEventListener("click", (x) => {
    menuSection.classList.add("hide")
    randomCardSection.classList.remove("hide")

    // get local storage

    let storedCards = JSON.parse(localStorage.getItem("flashcards"))
    if (storedCards.length > 0){
        card.innerHTML = ""
        
        flashcardArray = [...storedCards]

        displayRandomCard()

    } else {
        // let errorMessage = document.createElement("p")
        // errorMessage.innerText = "there are no saved cards"
        // errorMessage.style.marginTop = "30px"

        // allCardsSection.prepend(errorMessage)
    }
})

// create function for displaying random card

function displayRandomCard(){
    card.innerHTML = ""

    let randomNumber = Math.floor(Math.random()*flashcardArray.length)
    let randomCard = flashcardArray[randomNumber]

    let frontside = document.createElement("p")
    let backside = document.createElement("p")

    frontside.innerText = randomCard.name
    backside.innerText = randomCard.description

    backside.classList.add("hide")

    card.append(frontside)
    card.append(backside)

    // flip card on click

    card.addEventListener("click", (x) => {
        card.classList.toggle("flip-animation")
        if (backside.classList.contains("hide")){
            setTimeout(() => {
                backside.classList.remove("hide")
                frontside.classList.add("hide")
            }, 250)
        } else {
            setTimeout(() => {
                frontside.classList.remove("hide")
                backside.classList.add("hide")
            }, 250)
        }
    })
}

// display new random card

nextRandomCardButton.addEventListener("click", (x) => {
    displayRandomCard()
})


// all cards section
// declare variables

const allCardsContainer = document.querySelector(".all-cards-container")

// navigate to section and get local storage

seeAllCardsButton.addEventListener("click", (x) => {

    if (allCardsSection.firstElementChild.innerText == "there are no saved cards"){
        allCardsSection.firstElementChild.remove()
    }

    menuSection.classList.add("hide")
    allCardsSection.classList.remove("hide")

    // get local storage

    let storedCards = JSON.parse(localStorage.getItem("flashcards"))
    if (storedCards.length > 0){
        card.innerHTML = ""
        
        flashcardArray = [...storedCards]

        displayStoredCards()

    } else {
        let errorMessage = document.createElement("p")
        errorMessage.innerText = "there are no saved cards"
        errorMessage.style.marginTop = "30px"

        allCardsSection.prepend(errorMessage)
    }

})

// function for displaying all stored cards

function displayStoredCards(){
    allCardsContainer.innerHTML = ""

    flashcardArray.forEach(object => {
        let newCard = document.createElement("div")
        let cardName = document.createElement("p")
        let cardDescription = document.createElement("p")
        let seeCardButton = document.createElement("button")
        let removeButton = document.createElement("button")

        newCard.classList.add("miniature-card")
        removeButton.classList.add("remove-btn")
        seeCardButton.classList.add("see-card-btn")
        cardDescription.classList.add("hide")

        cardName.innerText = object.name
        cardDescription.innerText = object.description
        seeCardButton.innerText = "see card"
        removeButton.innerText = "remove card"

        newCard.append(cardName)
        newCard.append(cardDescription)
        newCard.append(seeCardButton)
        newCard.append(removeButton)

        allCardsContainer.append(newCard)

        // see card button

        seeCardButton.addEventListener("click", (x) => {
            viewSingleCardSection.innerHTML = ""

            let singleCard = x.target.parentElement.cloneNode(true);
            let backButton = document.createElement("button")

            backButton.innerText = "back to cards"

            let front = singleCard.children[0]
            let back = singleCard.children[1]

            singleCard.lastElementChild.remove()
            singleCard.lastElementChild.remove()

            viewSingleCardSection.append(singleCard)
            viewSingleCardSection.append(backButton)

            allCardsSection.classList.add("hide")
            viewSingleCardSection.classList.remove("hide")

            // flip button
            
            singleCard.addEventListener("click", (x) => {
                singleCard.classList.toggle("flip-animation")
                if (back.classList.contains("hide")){
                    setTimeout(() => {
                        back.classList.remove("hide")
                        front.classList.add("hide")
                    }, 250)
                } else {
                    setTimeout(() => {
                        front.classList.remove("hide")
                        back.classList.add("hide")
                    }, 250)
                }
            })

            // back to all cards

            backButton.addEventListener("click", (x) => {
                allCardsSection.classList.remove("hide")
                viewSingleCardSection.classList.add("hide")
            })
        })

        // remove card button

        removeButton.addEventListener("click", (x) => {
            let parent = x.target.parentElement
            let name = parent.children[0].innerText
            parent.remove()
            
            let index = flashcardArray.findIndex(object => {
                return object.name == name
            })

            flashcardArray.splice(index, 1)
            localStorage.setItem("flashcards", JSON.stringify(flashcardArray))

        })
    })
}