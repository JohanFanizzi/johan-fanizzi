<template>
<v-expansion-panels dark multiple v-model="panels">
  <v-expansion-panel class="primary">
    <v-expansion-panel-header class="title text-left">
      <div style="max-width: 30px;">
        <v-icon>mdi-powershell</v-icon>
      </div>
      Habilidades
    </v-expansion-panel-header>
    <v-expansion-panel-content class="secondary pt-3">
      <abilities></abilities>
    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel  class="primary">
    <v-expansion-panel-header class="title text-left">
      <div style="max-width: 30px;">
        <v-icon>mdi-briefcase</v-icon>
      </div>
      Experiencia
    </v-expansion-panel-header>
    <v-expansion-panel-content class="primary pt-3">
      <experience></experience>
    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel  class="primary">
    <v-expansion-panel-header class="title text-left">
      <div style="max-width: 30px;">
        <v-icon>mdi-school</v-icon>
      </div>
      Estudios
    </v-expansion-panel-header>
    <v-expansion-panel-content class="primary pt-3">
      <education></education>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';
import Abilities from '../components/Abilities.vue';
import Experience from '../components/Experiences.vue';
import Education from '../components/Education.vue';

export default Vue.extend({
  components: {
    Abilities,
    Experience,
    Education,
  },
  data() {
    return {
      panels: [0, 1, 2],
    };
  },
});
</script>
