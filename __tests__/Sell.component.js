import { mount } from "@vue/test-utils";
import Sell from "../src/components/Sell.component";

describe("Sell.vue", () => {
  const wrapper = mount(Sell, {
    propsData: {
      ltcPrice: 330,
      btcPrice: 3200,
      litecoinAmount: 1000,
      bitcoinAmount: 1000
    }
  });

  it("should be rendered Sell", () => {
    expect(Sell).toBeTruthy();
  });

  let input = wrapper.find(".value input");
  input.element.value = 1000;
  input.trigger("input");

  it("user able to input value", () => {
    expect(wrapper.vm.ltcToBtc).toBe("1000");
  });

  it("should show result in real time", () => {
    expect(wrapper.vm.btcRate > 0).toBe(true);
  });

  it("should trigger submit with correct values", () => {
    let button = wrapper.find(".submit button");
    button.trigger("click");
    expect(wrapper.emitted().sellTransaction[0][0].btc).toBe(103.13);
    expect(wrapper.emitted().sellTransaction[0][0].dollars).toBe(330016);
    expect(wrapper.emitted().sellTransaction[0][0].ltc).toBe(1000);
    expect(typeof wrapper.emitted().sellTransaction[0][0].time).toBe('object');
    expect(wrapper.emitted().sellTransaction[0][0].type).toBe("Sell LTC buy BTC");
  });
});
