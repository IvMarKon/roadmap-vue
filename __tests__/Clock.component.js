import { mount } from "@vue/test-utils";
import Clock from "../src/components/Clock.component";

describe("Clock.component.vue", () => {
  const wrapper = mount(Clock);
  wrapper.setProps({ start: new Date() });
  wrapper.setData({ timeString: "3 Minutes ago" });

  it("component rendered", () => {
    expect(Clock).toBeTruthy();
  });

  it("contains <span /> and correct time", () => {
    expect(wrapper.find("span").exists()).toBe(true);
    expect(wrapper.text()).toBe("3 Minutes ago");
  });
});
