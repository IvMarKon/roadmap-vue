import { mount } from "@vue/test-utils";
import Buy from "../src/components/Buy.component";

describe("Buy.vue", () => {
  const wrapper = mount(Buy, {
    propsData: {
      ltcPrice: 330,
      btcPrice: 3200,
      litecoinAmount: 1000,
      bitcoinAmount: 1000
    }
  });

  it("component rendered", () => {
    expect(Buy).toBeTruthy();
  });

  let input = wrapper.find(".value input");
  input.element.value = 1000;
  input.trigger("input");

  it("input field updates", () => {
    expect(wrapper.vm.btcToLtc).toBe("1000");
  });

  it("convert result updates", () => {
    expect(wrapper.vm.ltcRate > 0).toBe(true);
  });

  it("trigger submits with correct values", () => {
    let button = wrapper.find(".submit button");
    button.trigger("click");
    expect(wrapper.emitted().buyTransaction[0][0].btc).toBe(1000);
    expect(wrapper.emitted().buyTransaction[0][0].dollars).toBe(3200000);
    expect(wrapper.emitted().buyTransaction[0][0].ltc).toBe(9696.97);
    expect(typeof wrapper.emitted().buyTransaction[0][0].time).toBe('object');
    expect(wrapper.emitted().buyTransaction[0][0].type).toBe("Sell BTC buy LTC");
  });
});
