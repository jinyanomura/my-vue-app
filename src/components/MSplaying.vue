<template>
  <div class="container">
    <section class="players row justify-content-between">
      <h2
        class="col-5 text-start"
        :class="{ winner: !monster.life, loser: !player.life }"
      >
        {{ player.name }}
      </h2>
      <h2
        class="col-5 text-end"
        :class="{ winner: !player.life, loser: !monster.life }"
      >
        {{ monster.name }}
      </h2>
    </section>
    <section class="life-bar row justify-content-between">
      <div class="col-5 progress p-0">
        <div
          class="players-life progress-bar"
          role="progressbar"
          :style="{ width: player.life + '%' }"
          :class="{ dying: isPlayerDying }"
        >
          {{ player.life }}
        </div>
      </div>
      <div class="col-5 progress p-0">
        <div
          class="players-life progress-bar"
          role="progressbar"
          :style="{ width: monster.life + '%' }"
          :class="{ dying: isMonsterDying }"
        >
          {{ monster.life }}
        </div>
      </div>
    </section>
    <section class="images row justify-content-between mx-5 my-3">
      <div class="player-img col-4">
        <transition :name="player.animation">
          <img
            :src="player.image"
            v-if="!player.isInAction && player.life"
            class="img-fluid"
          />
        </transition>
      </div>
      <div class="monster-img col-4">
        <transition :name="monster.animation" appear>
          <img
            :src="monster.image"
            v-if="!monster.isInAction && monster.isShown && monster.life"
            class="img-fluid rounded-circle"
          />
        </transition>
      </div>
    </section>
    <section class="log border shadow">
      <div class="px-4 py-4">
        <transition name="fade" appear>
          <p v-if="!logs.length && !isPlaying" class="text-center fs-3">
            {{ encounterMsg }}
          </p>
        </transition>
        <p
          class="fs-5 font-monospace my-2"
          v-for="(log, index) in currentLog"
          :key="index"
          :class="[
            { 'text-start': log.isPlayer },
            { 'text-end': !log.isPlayer },
          ]"
        >
          {{ log.text }}
        </p>
      </div>
    </section>
    <section class="position-absolute bottom-0 start-50 translate-middle">
      <div v-if="!isPlaying && !logs.length">
        <button class="btn btn-lg btn-dark" @click="isPlaying = true">
          たたかう
        </button>
        <button class="btn btn-lg btn-secondary" @click="encounter('べつの')">
          にげる
        </button>
      </div>
      <div v-else-if="isPlaying">
        <div class="btn-group-lg">
          <button
            class="btn btn-warning text-light"
            @click="attack"
            v-bind="{ disabled: !isClickable }"
          >
            こうげき
          </button>
          <button
            class="btn btn-info text-light"
            @click="heal"
            v-bind="{ disabled: !isClickable }"
          >
            かいふく
          </button>
        </div>
      </div>
      <div v-else>
        <button class="btn btn-lg btn-dark" @click="retry">リベンジ</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["playerName", "monsterName"],
  data: function() {
    return {
      player: {
        name: this.playerName,
        life: 100,
        image: require("../assets/player.png"),
        commands: ["給水した！", "昼寝した！", "平手打ち！", "飛び蹴り！"],
        animation: "player-attack",
        isInAction: false,
      },
      monster: {
        name: this.monsterName,
        life: 100,
        image: "",
        commands: ["舐めた...", "噛みついた！", "突進した！"],
        animation: "encounter",
        isInAction: false,
        isShown: false,
      },
      isPlaying: false,
      isClickable: true,
      logs: [],
      encounterMsg: `${this.monsterName} が あらわれた！！`,
      monsterImages: [
        require("../assets/monster1.png"),
        require("../assets/monster2.png"),
        require("../assets/monster3.png"),
        require("../assets/monster4.png"),
        require("../assets/monster5.png"),
      ],
    };
  },
  methods: {
    encounter(variety) {
      const index = this.calculater(5, 1) - 1;
      this.monster.isShown = false;
      this.monster.image = this.monsterImages[index];
      this.logs = [];
      this.encounterMsg = `${variety} ${this.monster.name} が あらわれた！！`;
      setTimeout(() => (this.monster.isShown = true), 500);
    },
    retry() {
      this.player.life = 100;
      this.monster.life = 100;
      this.player.animation = "player-attack";
      this.encounter("ふたたび");
    },
    attack() {
      const damage = this.calculater(5, 1);
      this.player.isInAction = true;
      this.isClickable = false;
      this.playerAction(damage, "attack");
      setTimeout(this.judge, 300, this.player, this.monster, damage);
      setTimeout(this.monsterAttack, 500);
    },
    monsterAttack() {
      const damage = this.calculater(10, 3);
      this.monster.isInAction = true;
      this.monsterAction(damage);
      setTimeout(this.judge, 200, this.monster, this.player, damage);
    },
    heal() {
      const restore = this.calculater(10, 5);
      this.player.life += restore;
      this.isClickable = false;
      if (this.player.life > 100) this.player.life = 100;
      this.playerAction(restore, "heal");
      setTimeout(this.monsterAttack, 500);
    },
    calculater(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    playerAction(amount, type) {
      let action = "";
      if (type === "attack" && amount <= 3) {
        action = this.player.commands[2];
      } else if (type === "attack" && amount > 3) {
        action = this.player.commands[3];
      } else if (type === "heal" && amount <= 8) {
        action = this.player.commands[0];
      } else {
        action = this.player.commands[1];
      }
      return this.addLog(true, amount, action, type);
    },
    monsterAction(amount) {
      let action = "";
      if (amount <= 5) {
        action = this.monster.commands[0];
      } else if (amount <= 8) {
        action = this.monster.commands[1];
      } else {
        action = this.monster.commands[2];
      }
      return this.addLog(false, amount, action);
    },
    addLog(isPlayer, amount, action, type) {
      if (type === "heal") {
        this.logs.unshift({
          isPlayer,
          text: `${this.player.name} が ${action} ${amount}回復！ `,
        });
      } else if (isPlayer === true) {
        this.logs.unshift({
          isPlayer,
          text: `${this.player.name} の ${action} ${this.monster.name} に ${amount}ダメージ！`,
        });
      } else {
        this.logs.unshift({
          isPlayer,
          text: `${this.monster.name} が ${action} ${this.player.name} に ${amount}ダメージ！`,
        });
      }
    },
    judge(player, opponent, damage) {
      player.isInAction = false;
      if (player === this.monster) this.isClickable = true;
      if (opponent.life <= damage) {
        opponent.animation = "lose";
        setTimeout(() => {
          alert(`${player.name} の勝利！！！`);
          opponent.life = 0;
          this.isPlaying = false;
        }, 100);
      } else {
        opponent.life -= damage;
      }
    },
  },
  computed: {
    currentLog() {
      return this.logs.slice(0, 2);
    },
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
  created() {
    this.encounter("野生の");
  },
  watch: {
    isPlaying() {
      if (this.isPlaying === false) {
        return (this.monster.animation = "encounter");
      } else if (this.isPlaying === true) {
        return (this.monster.animation = "monster-attack");
      }
    },
  },
};
</script>

<style scoped>
.players-life {
  height: 100%;
  background-color: lightgreen;
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

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.encounter-enter {
  transform: translateX(30px);
}
.encounter-enter-active {
  transition: 200ms;
}
.encounter-leave-to {
  opacity: 0;
}
.encounter-leave-active {
  transition: 500ms;
}

.player-attack-enter {
  opacity: 0;
}
.player-attack-enter-active {
  transition: 500ms;
}
.player-attack-leave-to {
  transform: translateX(300px);
}
.player-attack-leave-active {
  transition: 200ms;
}

.monster-attack-enter-active {
  animation: bounce-in 100ms;
}
.monster-attack-leave-active {
  animation: bounce-in 100ms reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.lose-leave-to {
  opacity: 0;
}
.lose-leave-active {
  transition: 1s;
  animation: drop-out 1s;
}
@keyframes drop-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
}
</style>
