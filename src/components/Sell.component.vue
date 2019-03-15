<template>
  <div class="cbox fleft">
    <h3>Sell LTC for BTC</h3>
    <p>Sell Litecoins for Bitcoins.</p>
    <p></p>
    <div class="flist">
      <p>LTC Amount:</p>
      <input type="text" :class="{error: errors.amountOverflow}" v-model="ltcToBtc" placeholder="0">
    </div>
    <div class="flist">
      <p>Rate:</p>
      <input disabled type="text" :value="btcRate | addBtcSign" placeholder="$ 0.01">
    </div>
    <div class="flist">
      <p>&nbsp;</p>
      <button v-on:click="this.triggerSellTransaction" class="button blue">Sell LTC</button>
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
  name: "SellComponent",
  props: {
    "ltc-price": Number,
    "btc-price": Number,
    "litecoin-amount": Number,
    "bitcoin-amount": Number
  },
  filters: {
    addDollarSign: filter.addDollarSign,
    addBtcSign: filter.addBtcSign
  },
  data() {
    return {
      ltcToBtc: null,
      btcRate: 0,
      errors: {
        amountOverflow: false
      }
    };
  },
  methods: {
    triggerSellTransaction() {
      if (!this.errors.amountOverflow) {
        if (this.btcRate && this.ltcToBtc) {
          this.$emit("sellTransaction", {
            ltc: parseInt(this.ltcToBtc),
            btc: this.btcRate,
            dollars: Math.round(this.btcRate * this.btcPrice),
            type: "Sell LTC buy BTC",
            time: new Date()
          });

          this.ltcToBtc = null;
        }
      } else {
        alert("Error: LTC amount overflow");
      }
    }
  },
  watch: {
    ltcToBtc: function(ltc) {
      if (ltc <= this.litecoinAmount) {
        this.errors.amountOverflow = false;
        this.btcRate =
          Math.round((Math.round(ltc * this.ltcPrice) / this.btcPrice) * 100) /
          100;
      } else {
        this.errors.amountOverflow = true;
        this.btcRate =
          Math.round(
            (Math.round(this.litecoinAmount * this.ltcPrice) / this.btcPrice) *
              100
          ) / 100;
      }
    }
  }
};
</script>

