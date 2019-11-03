<template>
  <v-app>
    <navbar></navbar>

    <v-sheet width="100%" height="100%" class="py-12 mt-12" color="secondary" dark>
      <v-container>
        <filter-panel class="pt-12 mt-12 pt-md-4 mt-md-4"></filter-panel>
        <v-divider></v-divider>
        <v-content class="pa-0 mt-2">
          <router-view/>
        </v-content>

        <GoTop></GoTop>

      </v-container>
    </v-sheet>

    <v-footer color="primary" dark class="py-4 text-center">
      <networks></networks>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
// Modificación de estilos base
.v-application{
  background-color: var(--v-secondary-base) !important;
}

.v-card__title {
  word-break: break-word;
}

.v-list-item__title, .v-list-item__subtitle {
  white-space: pre-line;
}

// Ancho del scroll
::-webkit-scrollbar {
  width: 5px;
}

// Background del scroll
::-webkit-scrollbar-track {
  background: var(--v-primary-base);
}

// Color del Manejador
::-webkit-scrollbar-thumb {
  background: var(--v-accent-base);
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
import Networks from './components/Networks.vue';
import FilterPanel from './components/FilterPanel.vue';
import GoTop from './components/GoTop.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Navbar,
    Networks,
    FilterPanel,
    GoTop,
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['loadNetworks']),
  },
  created() {
    this.loadNetworks();
  },
});
</script>
