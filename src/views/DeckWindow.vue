<template>
    <div>
        <div style="text-align: left">
          <router-link :to="{ name: 'Deck' }">Go back</router-link>
        </div>
        <h1 class="title">Deck of Cards</h1>
        <div class="pile">
            <div class="cards" v-if="sort === 'input'">
                <card
                    v-for="c in cards"
                    v-bind:key="c"
                    :value="c[0]"
                    :suit="c[1]"
                />
            </div>
            <div class="cards" v-else>
                <card
                    v-for="c in cardsRotation"
                    v-bind:key="c"
                    :value="c[0]"
                    :suit="c[1]"
                />
            </div>
            <div class="rotation-card">
                <div class="title">Rotation Card</div>
                <card :value="rotationCard[0]" :suit="rotationCard[1]" />
            </div>
        </div>
        <div class="sort-footer">
          <div class="title">Sort cards by</div>
          <div style="display: flex">
            <div class="box" :style="sort === 'input' ? 'color: #ffffff;border: 0.5px solid #ffffff;' : ''" @click="sort = 'input'">Input order</div>
            <div class="box" :style="sort === 'rotation' ? 'color: #ffffff;border: 0.5px solid #ffffff;' : ''" @click="sort = 'rotation'">Rotation order</div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Card from "@/components/Card";

export default {
    name: "DeckWindow",
    components: { Card },
    data() {
        return {
          sort: 'rotation',
          cardsRotation: [],
          strongSuitsSequence: ['H', 'D', 'C', 'S'],
          strongValuesSequence: ['2', 'A', 'K', 'Q', 'J', '0', '9', '8', '7', '6', '5', '4', '3']
        }
    },
    computed: {
        ...mapState(["deckId", "rotationCardDeckId", "cards", "rotationCard"]),
    },
    async mounted() {
        this.setDeckIds();
        await this.getPileCards("cards");
        await this.getRotationCard("rotation")
        this.sortCardsRotationOrder()
    },
    methods: {
        ...mapActions(["getPileCards", "getRotationCard"]),
        ...mapMutations(["setRotationCardDeckId", "setDeckId"]),
        setDeckIds() {
            if (!this.$route.params.deck_ids) return;
            const ids = this.$route.params.deck_ids.split(",")
            this.setDeckId(ids[0]);
            this.setRotationCardDeckId(ids[1]);
        },
        sortCardsRotationOrder() {
          const suitsSeq = this.buildStrongSequenceBasedOnValueOrSuit(this.rotationCard[1], this.strongSuitsSequence)
          const valuesSeq = this.buildStrongSequenceBasedOnValueOrSuit(this.rotationCard[0], this.strongValuesSequence)
          let cardsOrdered = []
          
          suitsSeq.forEach(suit => this.cards.forEach(card => {
            if (card[1] === suit) {
              const isValueStrongerThanLastValueInserted = cardsOrdered.length > 0 
              && cardsOrdered[cardsOrdered.length - 1][1] === card[1]
              && valuesSeq.indexOf(cardsOrdered[cardsOrdered.length - 1][0]) > valuesSeq.indexOf(card[0])
              if (isValueStrongerThanLastValueInserted) {
                cardsOrdered.push(cardsOrdered[cardsOrdered.length - 1])
                cardsOrdered[cardsOrdered.length - 2] = card
              } else {
                cardsOrdered.push(card)
              }
            }
          }))
          this.cardsRotation = cardsOrdered
        },
        buildStrongSequenceBasedOnValueOrSuit(val, array) {
          let newArr = []
          for (let i = array.indexOf(val); i < array.length; i++) {
            newArr.push(array[i])
          }
          for (let i = 0; i < array.indexOf(val); i++) {
            newArr.push(array[i])
          }
          return newArr
        }
    },
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
  height: 600px;
  margin-left: 100px;
  margin-right: 100px;
  padding: 30px;
  background: #1b3e1b;
}

.cards {
  height: 50%;
  display: flex;
}

.rotation-card {
  height: 45%;
}

.rotation-card .title {
  display: table-cell;
  color: #ffff40;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
}

.sort-footer {
  margin-top: 10px;
  width: 250px;
  display: inline-block;
  text-align: -webkit-center;
}

.sort-footer .box {
  display: flex;
  width: 50%;
  height: 30px;
  padding-top: 10px;
  font-size: 12.5px;
  font-weight: bold;
  color: #acabab;
  border: 0.5px solid #acabab;
  background: #2bcf2b;
  justify-content: center;
  cursor: pointer;
}

.sort-footer .box:hover {
  background: #3f8a3f;
}

.sort-footer .title {
  display: table-cell;
  color: #ffffff;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  padding: 5px;
}
</style>
