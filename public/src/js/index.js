const charactersModule = (function () {

    let charactersList = []
    let extraInfo = []
    let currentIndex = 0
    let currentExtraIndex = 0

    function updateExtraInfo() {
        document.getElementById('extra_info_text').textContent = extraInfo[currentExtraIndex].text
        document.getElementById('extra_info_title').textContent = extraInfo[currentExtraIndex].name
        document.getElementById('extra_info_img').src = extraInfo[currentExtraIndex].image
    }

    function updateCharacter() {
        const currentCharacter = charactersList[currentIndex]

        document.getElementById('character_name').textContent = currentCharacter.name
        document.getElementById('profile_img').src = currentCharacter.profile_img
        document.getElementById('village').textContent = currentCharacter.village
        document.getElementById('resume_img').src = currentCharacter.resume_img
        document.getElementById('resume_txt').textContent = currentCharacter.resume
        document.getElementById('more_title').textContent = `Mais Curiosidades sobre ${currentCharacter.name}!`

        document.getElementById('father').innerHTML = `<span>Pai:</span> ${currentCharacter.additional.father}`
        document.getElementById('mother').innerHTML = `<span>Mãe:</span> ${currentCharacter.additional.mother}`
        document.getElementById('jutsu').innerHTML = `<span>Jutsu:</span> ${currentCharacter.additional.jutsu}`
        document.getElementById('more').innerHTML = `<span>${currentCharacter.additional.more}</span>`

        extraInfo = currentCharacter.extras
        currentExtraIndex = 0
        updateExtraInfo()
    }

    async function fetchCharacters() {
        const url = 'https://backend-naruto-info.vercel.app/characters'

        try {
            const response = await fetch(url)
            const data = await response.json()

            charactersList = data.characters
            extraInfo = charactersList[0].extras
            
        } catch (error) {
            console.error('Erro ao buscar personagens:', error)
        }
    }

    function addEventListeners() {

        document.getElementById('character_next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % charactersList.length
            updateCharacter()
        })

        // Event listener for previous character button
        document.getElementById('character_prev').addEventListener('click', () => {

            if (currentIndex === 0) {

                // if current index = 0, move on to the last character
                currentIndex = charactersList.length - 1

            } else {
                // return to previous character
                currentIndex--
            }

            // update character display
            updateCharacter()
        })

        document.getElementById('extra_info_previous').addEventListener('click', () => {
            if (currentExtraIndex === 0) {

                // if current index = 0, move on to the last character
                currentExtraIndex = extraInfo.length - 1

            } else {
                // return to previous character
                currentExtraIndex--
            }
            updateExtraInfo()
        })

        document.getElementById('extra_info_next').addEventListener('click', () => {
            currentExtraIndex = (currentExtraIndex + 1) % extraInfo.length
            updateExtraInfo()
        })

    }

    return {
        fetchCharacters,
        addEventListeners,
    }
})()

charactersModule.fetchCharacters()
charactersModule.addEventListeners()


