<template>
  <span>{{timeString}}</span>
</template>

<script>
export default {
  name: "ClockComponent",
  props: {
    start: Date
  },
  data() {
    return {
      time: new Date().getTime(),
      timeString: "",
      clock: null,
      intervalTime: 1000
    };
  },
  methods: {
    transactionTime(date) {
      return setInterval(() => {
        let result = this.time - date.getTime();
        if (result / 60000 > 1) {
          this.timeString = `${Math.round(result / 60000)} Minutes ago`;
          this.intervalTime = 60000;
        } else {
          this.timeString = `${Math.round(result / 1000)} Seconds ago`;
        }
        this.time += 1000;
      }, this.intervalTime);
    }
  },
  mounted: function() {
    this.clock = this.transactionTime(this.start);
  }
};
</script>

