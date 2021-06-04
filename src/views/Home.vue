<template>
  <div class="container">
    <h1>Weekly Rankings</h1>
    <div class="row">
      <section class="col-8 offset-2">
        <h2 class="text-center">Monster Slayer</h2>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th class="text-center">Rank</th>
              <th class="text-center">Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" class="fs-3">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ user.name }}</td>
              <td>{{ user.record }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      users: [],
    };
  },

  created() {
    firebase
      .firestore()
      .collection("users")
      .orderBy("record")
      .limit(5)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.users.push({
            ...doc.data(),
          });
        });
      });
  },
};
</script>
