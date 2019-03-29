import { mount } from "@vue/test-utils";
import Clock from "../src/components/Clock.component";

describe("Clock.component.vue", () => {
  const wrapper = mount(Clock);
  wrapper.setProps({ start: new Date() });
  wrapper.setData({ timeString: "3 Minutes ago" });

  it("should be rendered Clock", () => {
    expect(Clock).toBeTruthy();
  });

  it("should contain <span /> and correct time", () => {
    expect(wrapper.find("span").exists()).toBe(true);
    expect(wrapper.text()).toBe("3 Minutes ago");
  });
});
