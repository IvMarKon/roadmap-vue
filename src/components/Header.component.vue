<template>
  <div class="hwrapper">
    <div class="header">
      <div class="logo">
        <span>CTrade</span>
      </div>
      <ul class="hnav">
        <li class="sell">
          <a v-on:click.prevent="triggerChangeTab('sell')" href="#">Sell</a>
        </li>
        <li class="buy">
          <a v-on:click.prevent="triggerChangeTab('buy')" href="#">Buy</a>
        </li>
        <li class="history">
          <a v-on:click.prevent="triggerChangeTab('history')" href="#">History</a>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {};
  },
  methods: {
    triggerChangeTab: function(tab) {
      this.$emit("tabChange", tab);
    }
  }
};
</script>
