<template>
  <div>
    <h1 v-if="!isPlaying">{{ title }}</h1>
    <div>
      <button @click="start" v-if="!isPlaying">Start</button>
      <button @click="reset" v-if="isPlaying">Reset</button>
    </div>
    <h1 v-if="isPlaying">Start with: "{{ firstLetter }}"</h1>
    <div class="timer">{{ time }}</div>
    <div class="answers">
      <div v-for="(answer, index) in answers" :key="index">
        <div class="answer-card">
          <p>{{ index + 1 }}.</p>
          <p>
            {{ answer.body }}<b>{{ answer.lastCharacter }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="input">
      <input type="text" v-model="input" @keydown.enter="submit" />
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
      isPlaying: false,
    };
  },
  methods: {
    start: function() {
      const index = Math.floor(Math.random() * 7);
      this.firstLetter = this.letters[index];
      this.isPlaying = true;
      this.timer();
    },
    submit: function() {
      if (this.input[0] === this.firstLetter) {
        const indexLast = this.input.length - 1;
        const answer = {
          body: this.input.slice(0, indexLast),
          lastCharacter: this.input[indexLast],
        };
        this.answers.push(answer);
        this.firstLetter = answer.lastCharacter;
        this.input = answer.lastCharacter;
        clearInterval(this.intervalId);
        this.timer();
      }
    },
    reset: function() {
      this.time = 10;
      this.firstLetter = "";
      this.input = "";
      this.answers = [];
      this.isPlaying = false;
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
        alert("Congratulation!!");
        clearInterval(this.intervalId);
      }
    },
    time: function() {
      if (this.time === 0) {
        alert("GAME OVER...");
        this.reset();
      }
    },
  },
};
</script>
