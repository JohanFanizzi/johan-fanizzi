<template>
  <v-app>
    <navbar></navbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer color="primary" dark class="py-4 text-center">
      <networks></networks>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.v-application{
  background-color: var(--v-secondary-base) !important;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
import Networks from './components/Networks.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Navbar,
    Networks,
  },
  data: () => ({
    //
  }),
  created() {
    this.loadNetworks();
  },
  methods: {
    ...mapActions(['loadNetworks']),
  },
});
</script>
