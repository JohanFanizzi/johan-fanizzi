<template>
  <div>
    <v-chip pill color="primary" class="ma-1" v-for="(ability, index) in abilities" :key="index">
      <v-avatar left color="accent"><v-icon>{{ ability.icon }}</v-icon></v-avatar>
      {{ ability.name }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'Abilities',
  computed: {
    ...mapState(['abilities']),
  },
  methods: {
    ...mapActions(['loadAbilities']),
  },
  created() {
    this.loadAbilities();
  },
});
</script>
