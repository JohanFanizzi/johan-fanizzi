<template>
<v-sheet width="100%" height="100%" class="py-12 mt-12 text-center" color="secondary" dark>
  <v-container>
    <projects></projects>
  </v-container>
</v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import Projects from '../components/Projects.vue';

export default Vue.extend({
  components: {
    Projects,
  },
});
</script>
