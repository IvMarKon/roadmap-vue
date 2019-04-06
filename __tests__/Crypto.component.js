import { mount } from '@vue/test-utils'
import Crypto from '../src/Crypto'

describe('Crypto.vue', () => {
  const wrapper = mount(Crypto)

  it('component rendered', () => {
    expect(Crypto).toBeTruthy();
  })

  it('contains current currency amount', () => {
    const currencies = wrapper.findAll('.amount .highlight');
    expect(currencies.length).toBe(3);
  })

  it('contains Sell component', () => {
    wrapper.find('.header .sell a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .sell-component").exists()).toBe(true);
      });
  });

  it('contains Buy component', () => {
    wrapper.find('.header .buy a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .buy-component").exists()).toBe(true);
      });
  });

  it('contains History component', () => {
    wrapper.find('.header .history a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .history-component").exists()).toBe(true);
      });
  });

  it('contains Footer component', () => {
    expect(wrapper.find('.footer').element).toBeTruthy();
  });
})
