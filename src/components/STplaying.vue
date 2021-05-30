<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="first-letter">
      <button @click="start">Start</button>
      <button @click="reset">Reset</button>
      <h1>{{ firstLetter }}</h1>
    </div>
    <div class="timer">{{ time }}</div>
    <div class="input">
      <input type="text" v-model="input" @keydown.enter="submit" />
    </div>
    <div class="answers">
      <div v-for="(answer, index) in answers" :key="index">
        <div class="answer-card">
          <p>{{ index + 1 }}: {{ answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Shiritori",
      time: 10,
      letters: ["s", "h", "i", "t", "o", "r", "i"],
      firstLetter: "",
      input: "",
      answers: [],
      intervalId: "",
    };
  },
  methods: {
    start: function() {
      const index = Math.floor(Math.random() * 7);
      this.firstLetter = this.letters[index];
      this.title = "GOGOGO~~~";
      this.timer();
    },
    submit: function() {
      if (this.input[0] === this.firstLetter && this.time !== 0) {
        const indexLast = this.input.length - 1;
        this.answers.push(this.input);
        this.firstLetter = this.input.charAt(indexLast);
        this.input = "";
        clearInterval(this.intervalId);
        this.timer();
      }
    },
    reset: function() {
      this.firstLetter = "";
      this.input = "";
      this.answers = [];
      this.title = "Shiritori";
      clearInterval(this.intervalId);
    },
    timer: function() {
      this.time = 10;
      this.intervalId = setInterval(() => {
        this.time -= 1;
      }, 1000);
    },
  },
  computed: {},
  watch: {
    answers: function() {
      if (this.answers.length === 10) {
        this.title = "CLEAR!!!!!";
        clearInterval(this.intervalId);
      }
    },
    time: function() {
      if (this.time === 0) {
        clearInterval(this.intervalId);
        this.title = "GAME OVER!!!";
      }
    },
  },
};
</script>
