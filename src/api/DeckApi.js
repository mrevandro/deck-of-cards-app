import axios from 'axios'

const url = 'https://deckofcardsapi.com/api/deck'

class DeckApi {

    async createAndDraw(cards, deckCount) {
        const {data} =  await axios.get(`${url}/new/?cards=${cards}`)
        return await axios.get(`${url}/${data.deck_id}/draw/?count=${deckCount}`)
    }
}

export default new DeckApi()