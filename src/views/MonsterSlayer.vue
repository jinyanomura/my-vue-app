<template>
  <div>
    <div v-if="!isPlaying" class="container">
      <div class="row">
        <section class="col-6 offset-3">
          <div class="card" style="width: 100%;">
            <img src="../assets/MS_prof.png" class="card-img-top" alt="" />
            <div class="card-body">
              <h4 class="card-title text-danger">Monster Slayer</h4>
              <p class="card-text fs-5">
                Type your name and someone you wish to beat up below...
              </p>
              <form action="">
                <div class="input-group mb-3">
                  <input
                    class="col-5 form-control"
                    type="text"
                    v-model="playerName"
                    placeholder="Your name"
                    required
                  />
                  <input
                    class="col-5 form-control"
                    type="text"
                    v-model="monsterName"
                    placeholder="Monster name"
                    required
                  />
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    v-bind="{ disabled: !playerName || !monsterName }"
                    class="btn btn-lg btn-primary p-3"
                    @click="isPlaying = true"
                  >
                    START PLAYING
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
    <MSplaying
      v-if="isPlaying"
      :playerName="playerName"
      :monsterName="monsterName"
    ></MSplaying>
  </div>
</template>

<script>
import MSplaying from "../components/MSplaying";

export default {
  components: {
    MSplaying,
  },
  data() {
    return {
      isPlaying: false,
      playerName: "",
      monsterName: "",
    };
  },
};
</script>
