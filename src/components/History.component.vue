<template>
  <div class="cbox history-component" style="margin-bottom:20px;">
    <h3>History</h3>
    <p>View history of your transactions.</p>
    <p></p>
    <div class="ultable transactions">
      <ul class="lister lheader transactions__header-row">
        <li>Time</li>
        <li>Type</li>
        <li>Litecoins</li>
        <li>Bitcoins</li>
        <li>Dollars</li>
      </ul>
      <template v-for="(transaction, index) in transactions">
        <ul :key="'transaction' + index" class="lister transactions__body-row">
          <li>
            <clock-component :start="transaction.time"></clock-component>
          </li>
          <li>{{transaction.type}}</li>
          <li>{{transaction.ltc}} LTC</li>
          <li>{{transaction.btc}} BTC</li>
          <li>$ {{transaction.dollars}}</li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import ClockComponent from "./Clock.component.vue";

export default {
  name: "History",
  components: {
    "clock-component": ClockComponent
  },
  props: {
    transactions: Array
  }
};
</script>

