<template>
<div>
  <v-chip
    pill color="primary" class="ma-1"
    v-for="(ability, index) in abilities" :key="index"
    @click="filterAbility(ability)"
  >
    <v-avatar left color="accent"><v-icon>{{ ability.icon }}</v-icon></v-avatar>
    {{ ability.name }}
  </v-chip>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Ability from '../models/Ability';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'AbilityChip',
  props: {
    abilities: {
      type: Array as () => Ability[],
      require: true,
    },
  },
  methods: {
    ...mapActions(['filterAbility']),
  },
});
</script>