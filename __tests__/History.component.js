import { mount } from "@vue/test-utils";
import History from "../src/components/History.component";

describe("History.vue", () => {
  const transactions = {
      transactions: [
        {
          ltc: 1000,
          btc: 103.13,
          dollars: 330016,
          type: "Sell LTC buy BTC",
          time: new Date(
            "Sat Apr 06 2019 22:18:41 GMT+0300 (Eastern European Summer Time)"
          )
        }
      ]
    },
    wrapper = mount(History, {
      propsData: transactions
    });

  it("component rendered", () => {
    expect(History).toBeTruthy();
  });

  const row = wrapper.findAll(".transactions .transactions__body-row");

  it("row rendered", () => {
    expect(row.length).toBe(1);
  });

  const props = transactions.transactions[0];

  it("collumns rendered", () => {
    expect(row.at(0).findAll("li").length).toBe(Object.keys(props).length);
  });

  it("values are valid", () => {
    const collumns = row.at(0).findAll("li");
    expect(props.time.getTime()).toBe(1554578321000);
    expect(collumns.at(1).text()).toBe("Sell LTC buy BTC");
    expect(collumns.at(2).text()).toBe(`${props.ltc} LTC`);
    expect(collumns.at(3).text()).toBe(`${props.btc} BTC`);
    expect(collumns.at(4).text()).toBe(`$ ${props.dollars}`);
  });
});
