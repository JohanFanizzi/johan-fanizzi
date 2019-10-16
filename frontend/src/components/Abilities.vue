<template>
  <div>
    <ability-chip :abilities="abilities"></ability-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import AbilityChip from '../components/AbilityChip.vue';

export default Vue.extend({
  name: 'Abilities',
  components: {
    AbilityChip,
  },
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
