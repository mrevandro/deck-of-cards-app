<template>
    <div>
        <h1 class="title">Deck of Cards</h1>
        <div class="pile">
            <div class="cards">
                <card
                    v-for="c in cards"
                    v-bind:key="c"
                    :value="c[0]"
                    :suit="c[1]"
                />
            </div>
            <div class="form">
                <span>Add cards to the pile</span>
                <input
                    type="text"
                    placeholder="Card name"
                    maxlength="2"
                    v-model="card"
                    @input="card = card.toUpperCase()"
                />
                <button @click="addCard">Add</button>
            </div>
        </div>
        <div class="form-rotation">
            <span>Rotation Card</span>
            <input
                type="text"
                placeholder="Card name"
                maxlength="2"
                v-model="rotationCard"
                @input="rotationCard = rotationCard.toUpperCase()"
            />
            <button @click="submitDeck">Submit Deck</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Card from "@/components/Card.vue";

export default {
    name: "Deck",
    components: { Card },
    data() {
        return {
            cards: [],
            card: '',
            rotationCard: '',
            validValues: ['2', 'A', 'K', 'Q', 'J', '0', '9', '8', '7', '6', '5', '4', '3'],
            validSuits: ['H', 'D', 'C', 'S']
        }
    },
    computed: {
        ...mapState(['deckId', 'rotationCardDeckId']),
        isCardAlreadyAdded() {
            return this.cards.includes(this.card)
        },
        isCardValid() {
            return this.card && this.card.length > 1 && this.validValues.indexOf(this.card[0]) !== -1 && this.validSuits.indexOf(this.card[1]) !== -1
        },
        isCardsWithMaxPermitted() {
            return this.cards.length === 10
        },
        isRotationCardValid() {
            return this.rotationCard && this.rotationCard.length > 1 && this.validValues.indexOf(this.rotationCard[0]) !== -1 && this.validSuits.indexOf(this.rotationCard[1]) !== -1
        }
    },
    methods: {
        ...mapActions(['createAndDrawCards', 'createAndDrawRotationCard', 'addCardsToPile', 'addRotationCardToPile']),
        addCard() {
            if (this.isCardsWithMaxPermitted || !this.isCardValid || this.isCardAlreadyAdded) return
            this.cards.push(this.card)
            this.card = ''
        },
        async submitDeck() {
            if (!this.isRotationCardValid) return
            await this.createAndDrawCards(this.cards)
            await this.addCardsToPile()
            await this.createAndDrawRotationCard(this.rotationCard)
            await this.addRotationCardToPile()
            this.$router.push({name: 'DeckWindow', params: {deck_ids: this.deckId + ',' + this.rotationCardDeckId}})
        }
    }
};
</script>

<style scoped>
.title {
    color: #ffff40;
    text-align: left;
    margin-left: 100px;
    font-size: 50px;
    margin-top: 0px;
}

.pile {
    border: 1.5px solid black;
    border-radius: 7px;
    height: 350px;
    margin-left: 100px;
    margin-right: 100px;
    padding: 30px;
    background: #1b3e1b;
}

.pile .form {
    text-align: left;
}

.pile .form span {
    color: #ffffff;
    display: flex;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 5px;
}

.pile .form input {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    height: 38px;
    border: none;
}

.pile .form input:focus-visible {
    outline: none;
}

.pile .form button {
    height: 40px;
    margin-left: -4px;
    background: #2bcf2b;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    border: 2px #6ae76a;
    cursor: pointer;
    color: #ffffff;
    font-weight: bold;
}

.pile .form button:hover {
    background: #3f8a3f;
}

.cards {
    height: 85%;
    display: flex;
}

.form-rotation {
    text-align: right;
    margin-left: 100px;
    margin-right: 100px;
    padding: 20px;
}

.form-rotation span {
    color: #ffffff;
    display: block;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 5px;
    margin-right: 260px;
}

.form-rotation input {
    border-radius: 8px;
    height: 38px;
    width: 200px;
    border: none;
    width: 150px;
}

.form-rotation input:focus-visible {
    outline: none;
}

.form-rotation button {
    height: 40px;
    margin-left: 15px;
    background: #2bcf2b;
    border-radius: 5px;
    border: 1.5px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
    font-weight: bold;
    width: 200px;
}

.form-rotation button:hover {
    background: #3f8a3f;
}
</style>
