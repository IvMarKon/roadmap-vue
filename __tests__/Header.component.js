import { mount } from '@vue/test-utils'
import Header from '../src/components/Header.component'

describe('Header.vue', () => {
  const wrapper = mount(Header)

  it('component rendered', () => {
    expect(Header).toBeTruthy();
  });

  it('contains 3 selector option with widgets', () => {
    const widgets = wrapper.findAll('.hnav li');
    expect(widgets.length).toBe(3);
  });
});