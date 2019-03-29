import { mount } from '@vue/test-utils'
import Header from '../src/components/Header.component'

describe('Header.component.vue', () => {
  const wrapper = mount(Header)

  it('should be rendered Header', () => {
    expect(Header).toBeTruthy();
  });

  it('should contain 3 widget selector options', () => {
    const widgets = wrapper.findAll('.hnav li');
    expect(widgets.length).toBe(3);
  });
});