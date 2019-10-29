<template>
<v-expansion-panels dark>
  <v-expansion-panel
    class="primary"
    v-for="(project, index) in projects" :key="index"
  >
    <v-expansion-panel-header>
      <div style="max-width: 24px">
        <a :href="project.url"><v-icon>mdi-link</v-icon></a>
      </div>
      <div class="text-center">{{ project.name }}</div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card color="secondary">
        <v-card-text v-html="project.description">
        </v-card-text>
        <v-card-actions class="text-center">
          <v-container>
            <ability-chip :abilities="project.abilities"></ability-chip>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import AbilityChip from '../components/AbilityChip.vue';

export default Vue.extend({
  name: 'Projects',
  components: {
    AbilityChip,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['projects']),
  },
  methods: {
    ...mapActions(['loadProjects']),
  },
  created() {
    this.loadProjects();
  },
});
</script>