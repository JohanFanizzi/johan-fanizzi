<template>
<v-card color="accent" class="text-center ability pa-2">
  <v-card-text>

    <v-tooltip
      bottom color="primary" dark
      v-for="(ability, index) in abilities" :key="index"
    >
      <template v-slot:activator="{ on }">
        <v-icon
          exact color="primary" class="ma-1" v-on="on"
          @click="filterAbility(ability)"
        >
          {{ ability.icon }}
        </v-icon>
      </template>
      <span>{{ ability.name }}</span>
    </v-tooltip>

  </v-card-text>
</v-card>
</template>

<style lang="scss" scoped>
.ability {
  border-radius: 70px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'AbilityBubble',
  computed: {
    ...mapState(['abilities']),
  },
  methods: {
    ...mapActions(['loadAbilities', 'filterAbility']),
  },
  created() {
    this.loadAbilities();
  },
});
</script>