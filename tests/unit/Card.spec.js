import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {

  it('Should have card and suit values rendering as expected', () => {
    const value = '2'
    const wrapper = shallowMount(Card, {
      propsData: { suit: 'H', value: value }
    })

    expect(wrapper.find('.card-value').text()).toMatch(value)
    expect(wrapper.find('.card-suit-right').exists()).toBeTruthy()
  })

  it('Should have color red given "D" suit', () => {
    const wrapper = shallowMount(Card, {
      propsData: { suit: 'D', value: '5' }
    })

    expect(wrapper.vm.valueColor).toEqual('red')
  })

  it('Should have color red given "H" suit', () => {
    const wrapper = shallowMount(Card, {
      propsData: { suit: 'H', value: '7' }
    })

    expect(wrapper.vm.valueColor).toEqual('red')
  })

  it('Should have color black given "S" suit', () => {
    const wrapper = shallowMount(Card, {
      propsData: { suit: 'S', value: 'A' }
    })

    expect(wrapper.vm.valueColor).toEqual('black')
  })

  it('Should have color black given "C" suit', () => {
    const wrapper = shallowMount(Card, {
      propsData: { suit: 'C', value: '9' }
    })

    expect(wrapper.vm.valueColor).toEqual('black')
  })
})
