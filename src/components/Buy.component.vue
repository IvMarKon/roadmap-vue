<template>
  <div class="cbox fleft">
    <h3>Sell BTC for LTC</h3>
    <p>Sell Bitcoins for Litecoins.</p>
    <p></p>
    <div class="flist">
      <p>BTC Amount:</p>
      <input type="text" :class="{error: errors.amountOverflow}" v-model="btcToLtc" placeholder="0">
    </div>
    <div class="flist">
      <p>Rate:</p>
      <input disabled type="text" :value="ltcRate | addLtcSign" placeholder="$ 0.01">
    </div>
    <div class="flist">
      <p>&nbsp;</p>
      <button v-on:click="this.triggerBuyTransaction" class="button blue">Sell BTC</button>
    </div>
  </div>
</template>

<style lang="scss">
.error {
  background: #ef4f50;
  color: white;
  border-color: brown;
}
</style>


<script>
import filter from "../filters.js";

export default {
  name: "BuyComponent",
  props: {
    "ltc-price": Number,
    "btc-price": Number,
    "litecoin-amount": Number,
    "bitcoin-amount": Number
  },
  filters: {
    addDollarSign: filter.addDollarSign,
    addLtcSign: filter.addLtcSign
  },
  data() {
    return {
      btcToLtc: null,
      ltcRate: 0,
      errors: {
        amountOverflow: false
      }
    };
  },
  methods: {
    triggerBuyTransaction() {
      if (!this.errors.amountOverflow) {
        this.$emit("buyTransaction", {
          btc: parseInt(this.btcToLtc),
          ltc: this.ltcRate,
          dollars: Math.round(this.ltcRate * this.ltcPrice),
          type: "Sell BTC buy LTC",
          time: new Date()
        });
        this.btcToLtc = null;
      } else {
        alert("Error: LTC amount overflow");
      }
    }
  },
  watch: {
    btcToLtc: function(btc) {
      if (btc <= this.bitcoinAmount) {
        this.errors.amountOverflow = false;
        this.ltcRate =
          Math.round((Math.round(btc * this.btcPrice) / this.ltcPrice) * 100) /
          100;
      } else {
        this.errors.amountOverflow = true;
        this.ltcRate =
          Math.round(
            (Math.round(this.bitcoinAmount * this.btcPrice) / this.ltcPrice) *
              100
          ) / 100;
      }
    }
  }
};
</script>

