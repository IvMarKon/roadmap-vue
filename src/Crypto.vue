<template>
  <div class="wrapper">
    <header-component v-on:tabChange="selectTab"></header-component>

    <div class="cwrapper">
      <div class="content amount">
        <h1>
          LiteCoin amount:
          <span
            class="highlight"
          >{{ amount.litecoin | roundToHundreds | addLtcSign}}</span>
        </h1>
        <h1>
          BitCoin amount:
          <span class="highlight">{{amount.bitcoin | roundToHundreds | addBtcSign}}</span>
        </h1>
        <h1>
          Dollar amount:
          <span class="highlight">{{dollarAmount | roundToHundreds | addDollarSign}}</span>
        </h1>
      </div>
    </div>

    <div class="cwrapper alt">
      <div class="content widgets">
        <keep-alive>
          <component
            :is="tab"
            @sellTransaction="sellLTCbuyBTC"
            @buyTransaction="sellBTCbuyLTC"
            :ltc-price="market.ltc"
            :btc-price="market.btc"
            :litecoin-amount="amount.litecoin"
            :bitcoin-amount="amount.bitcoin"
            :transactions="transactions"
          ></component>
        </keep-alive>
        <div class="clear"></div>
      </div>
    </div>

    <div class="fwrapper">
      <div class="footer">
        <ul class="fnav">
          <li>
            <a href="#">2014 &copy; CTrade.com</a>
          </li>
          <li>
            <a href="#">All Rights Reserved.</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./css/crypto.scss";
</style>


<script>
import axios from "axios";

import HeaderComponent from "./components/Header.component.vue";
import SellComponent from "./components/Sell.component.vue";
import BuyComponent from "./components/Buy.component.vue";
import History from "./components/History.component.vue";

import api from "./api.config.js";
import filter from "./filters.js";
import filters from "./filters.js";

export default {
  name: "widget",
  components: {
    "header-component": HeaderComponent,
    "sell-component": SellComponent,
    "buy-component": BuyComponent,
    "history-component": History
  },
  data() {
    return {
      amount: {
        litecoin: 10000,
        bitcoin: 2,
        dollar: 0
      },
      market: {
        btc: 0,
        ltc: 0
      },
      transactions: [],
      tab: "sell-component"
    };
  },
  filters: {
    addDollarSign: filter.addDollarSign,
    addBtcSign: filter.addBtcSign,
    addLtcSign: filter.addLtcSign,
    roundToHundreds: filters.roundToHundreds
  },
  mounted() {
    this.getCryptoAmount("BTC");
    this.getCryptoAmount("LTC");
  },
  computed: {
    dollarAmount: function() {
      return (
        this.amount.litecoin * this.market.ltc +
        this.amount.bitcoin * this.market.btc
      );
    }
  },
  methods: {
    getCryptoAmount: function(base) {
      const self = this;
      switch (base) {
        case "BTC":
          axios
            .get(api.getBTC, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              self.market.btc = Math.ceil(response.data.ticker.price);
            })
            .catch(error => {
              self.market.btc = 3200;
            });
          break;
        case "LTC":
          axios
            .get(api.getLTC, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              self.market.ltc = Math.ceil(response.data.ticker.price);
            })
            .catch(error => {
              self.market.ltc = 330;
            });
          break;
        default:
          break;
      }
    },
    sellLTCbuyBTC: function(transactionInfo) {
      this.amount.litecoin -= transactionInfo.ltc;
      this.amount.bitcoin += transactionInfo.btc;
      this.transactions.push(transactionInfo);
    },
    sellBTCbuyLTC: function(transactionInfo) {
      this.amount.litecoin += transactionInfo.ltc;
      this.amount.bitcoin -= transactionInfo.btc;
      this.transactions.push(transactionInfo);
    },
    selectTab: function(tab) {
      this.tab = tab + "-component";
    }
  }
};
</script>