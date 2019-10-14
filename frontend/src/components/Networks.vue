<template>
<v-row :justify="justify">
  <div
    class="px-2"
    v-for="(network, index) in networks" :key="index"
  >
    <a :href="network.url">
      <v-icon color="accent">{{ network.icon }}</v-icon>
    </a>
  </div>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'networks',
  props: {
    justify: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    ...mapState(['networks']),
  },
});
</script>
