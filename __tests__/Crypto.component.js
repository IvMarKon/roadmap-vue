// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Crypto from '../src/Crypto'

describe('Crypto.vue', () => {
  const wrapper = mount(Crypto)

  it('should be rendered Crypto', () => {
    expect(Crypto).toBeTruthy();
  })

  it('should contain current currency amount', () => {
    const currencies = wrapper.findAll('.amount .highlight');
    expect(currencies.length).toBe(3);
  })

  it('should contain Sell component', () => {
    wrapper.find('.header .sell a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .sell-component").exists()).toBe(true);
      });
  });

  it('should contain Buy component', () => {
    wrapper.find('.header .buy a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .buy-component").exists()).toBe(true);
      });
  });

  it('should contain History component', () => {
    wrapper.find('.header .history a').trigger('click');
    wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".widgets .history-component").exists()).toBe(true);
      });
  });

  it('should contain Footer component', () => {
    expect(wrapper.find('.footer').element).toBeTruthy();
  });
})
