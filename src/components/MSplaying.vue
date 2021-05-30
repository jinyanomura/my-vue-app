<template>
  <div>
    <section class="players">
      <h2 :class="{ winner: !monster.life, loser: !player.life }">
        {{ player.name }}
      </h2>
      <h2 :class="{ winner: !player.life, loser: !monster.life }">
        {{ monster.name }}
      </h2>
    </section>
    <section class="life-bar">
      <div class="bar-outline">
        <div
          class="players-life"
          :style="{ width: player.life + '%' }"
          :class="{ dying: isPlayerDying }"
        >
          {{ player.life }}
        </div>
      </div>
      <div class="bar-outline">
        <div
          class="players-life"
          :style="{ width: monster.life + '%' }"
          :class="{ dying: isMonsterDying }"
        >
          {{ monster.life }}
        </div>
      </div>
    </section>
    <section class="actionButtons">
      <div v-if="!isPlaying && !logs.length">
        <!-- <input type="text" v-model="monster.name" /> -->
        <button @click="isPlaying = true">Start</button>
      </div>
      <div v-else-if="isPlaying">
        <button @click="attack" v-bind="{ disabled: !isClickable }">
          Attack
        </button>
        <button @click="heal" v-bind="{ disabled: !isClickable }">Heal</button>
        <button @click="giveUp" v-bind="{ disabled: !isClickable }">
          Give up
        </button>
      </div>
      <div v-else>
        <button @click="restart">Retry</button>
      </div>
    </section>
    <section class="battle-log" v-if="logs.length">
      <div v-for="(log, index) in logs" :key="index">
        <p
          :class="[
            { 'player-log': log.isPlayer },
            { 'monster-log': !log.isPlayer },
          ]"
        >
          {{ log.text }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["monsterName"],
  data: function() {
    return {
      player: {
        name: "You",
        life: 100,
      },
      monster: {
        name: this.monsterName,
        life: 100,
      },
      isPlaying: false,
      isClickable: true,
      logs: [],
    };
  },
  methods: {
    restart() {
      this.isPlaying = !this.isPlaying;
      this.player.life = 100;
      this.monster.life = 100;
      this.logs = [];
    },
    attack() {
      const damage = this.calculater(5, 1);
      this.monster.life -= damage;
      this.logs.unshift({
        isPlayer: true,
        text:
          this.player.name +
          " Hits " +
          this.monster.name +
          " for " +
          damage +
          "!",
      });
      this.isClickable = false;
      this.judge();
      setTimeout(this.monsterAttack, 300);
    },
    monsterAttack() {
      const damage = this.calculater(10, 3);
      this.player.life -= damage;
      this.logs.unshift({
        isPlayer: false,
        text:
          this.monster.name +
          " Hits " +
          this.player.name +
          " for " +
          damage +
          "!",
      });
      this.judge();
      this.isClickable = true;
    },
    calculater(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    heal() {
      const restore = this.calculater(10, 5);
      this.player.life += restore;
      if (this.player.life > 100) this.player.life = 100;
      this.logs.unshift({
        isPlayer: true,
        text: this.player.name + " got water! " + restore + " healed! ",
      });
      this.isClickable = false;
      setTimeout(this.monsterAttack, 300);
    },
    giveUp() {
      const confirmation = confirm("Really?");
      if (confirmation) {
        this.restart();
      } else alert("Never give up!!!");
    },
    judge() {
      if (this.player.life <= 0) {
        this.player.life = 0;
        alert("YOU LOSE...");
        return (this.isPlaying = false);
      } else if (this.monster.life <= 0) {
        this.monster.life = 0;
        alert("YOU WIN!!!");
        return (this.isPlaying = false);
      }
      return;
    },
  },
  computed: {
    isPlayerDying() {
      if (this.player.life < 30) {
        return true;
      } else return false;
    },
    isMonsterDying() {
      if (this.monster.life < 30) {
        return true;
      } else return false;
    },
  },
  watch: {
    logs() {
      if (this.logs.length > 10) {
        this.logs.pop();
      }
    },
  },
};
</script>

<style scoped>
.players,
.life-bar {
  display: flex;
  justify-content: space-around;
}

.bar-outline {
  height: 20px;
  width: 50%;
  margin: 10px;
  border: 3px solid black;
  text-align: center;
}

.players-life {
  height: 100%;
  background-color: lightgreen;
}

.actionButtons {
  display: flex;
  justify-content: space-around;
}

.battle-log {
  display: flex;
  flex-direction: column;
}

.player-log {
  text-align: left;
}

.monster-log {
  text-align: right;
}

.winner {
  color: lightgreen;
}

.loser {
  color: darkred;
}

.dying {
  background-color: red;
}
</style>
