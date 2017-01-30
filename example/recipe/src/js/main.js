import Vue from 'vue';

const app = new Vue({
  el: '#app',
  data: {
    counter: 0
  },
  methods: {
    increment(){
      this.counter++;
    },
    decrement(){
      this.counter--;
    }
  }
});
