import Vue from 'vue'
import VueRouter from 'vue-router'
import Deck from '@/views/Deck'
import DeckWindow from '@/views/DeckWindow'

Vue.use(VueRouter)

const routes = [
  {
    path: '/deck/new',
    name: 'Deck',
    component: Deck
  },
  {
    path: '/deck/:deck_ids',
    name: 'DeckWindow',
    component: DeckWindow
  }
]

const router = new VueRouter({
  routes
})

export default router
