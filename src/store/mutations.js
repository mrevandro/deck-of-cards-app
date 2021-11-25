export default {
    setDeckId (state, deckId) {
        state.deckId = deckId
    },

    setCards(state, cards) {
        state.cards = cards
    },

    setRotationCard(state, rotationCard) {
        state.rotationCard = rotationCard
    },

    setRotationCardDeckId (state, deckId) {
        state.rotationCardDeckId = deckId
    }
}