<template>
  <div class="hwrapper">
    <div class="header">
      <div class="logo">
        <span>CTrade</span>
      </div>
      <ul class="hnav">
        <li class="dash">
          <a v-on:click.prevent="triggerChangeTab('sell')" href="#">Sell</a>
        </li>
        <li class="settings">
          <a v-on:click.prevent="triggerChangeTab('buy')" href="#">Buy</a>
        </li>
        <li class="admin">
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
