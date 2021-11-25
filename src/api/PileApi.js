import axios from 'axios'

const url = 'https://deckofcardsapi.com/api/deck'

class PileApi {

    async createAndAddCardsToPile(cards, pileName, deckId) {
        return await axios.get(`${url}/${deckId}/pile/${pileName}/add/?cards=${cards}`)
    }

    async getPileCards(deckId, pileName) {
        return await axios.get(`${url}/${deckId}/pile/${pileName}/list/`)
    }
}

export default new PileApi()