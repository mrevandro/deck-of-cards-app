import deckApi from '@/api/DeckApi'
import pileApi from '@/api/PileApi'

export default {
    async createAndDrawCards({commit}, cards) {
        const {data} = await deckApi.createAndDraw(cards, cards.length)
        commit('setDeckId', data.deck_id)
        commit('setCards', cards)
    },

    async createAndDrawRotationCard({commit}, rotationCard) {
        const {data} = await deckApi.createAndDraw([rotationCard], 1)
        commit('setRotationCardDeckId', data.deck_id)
        commit('setRotationCard', rotationCard)
    },

    async addCardsToPile({state}) {
        await pileApi.createAndAddCardsToPile(state.cards, 'cards', state.deckId)
    },

    async addRotationCardToPile({state}) {
        await pileApi.createAndAddCardsToPile(state.rotationCard, 'rotation', state.rotationCardDeckId)
    },

    async getPileCards({commit, state}, pileName) {
        const {data} = await pileApi.getPileCards(state.deckId, pileName)
        let cardCodes = []
        data.piles[pileName].cards.forEach(card => cardCodes.push(card.code))
        commit('setCards', cardCodes)
    },

    async getRotationCard({commit, state}, pileName) {
        const {data} = await pileApi.getPileCards(state.rotationCardDeckId, pileName)
        commit('setRotationCard', data.piles[pileName].cards[0].code)
    }
}