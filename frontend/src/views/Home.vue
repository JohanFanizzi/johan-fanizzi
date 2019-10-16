<template>
<v-row justify="center">
  <v-col
    cols="12" sm="8" md="8" lg="8" xl="6"
    class="pb-0"
  >
    <ability-bubble></ability-bubble>
  </v-col>
  <v-col
    cols="12"
    class="pt-0 pb-8"
  >
    <timeline></timeline>
  </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import AbilityBubble from '../components/AbilityBubble.vue';
import Timeline from '../components/Timeline.vue';

export default Vue.extend({
  components: {
    AbilityBubble,
    Timeline,
  },
});
</script>
