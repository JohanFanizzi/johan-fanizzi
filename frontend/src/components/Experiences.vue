<template>
<v-row>
  <v-col
    cols="12"
    v-for="(experience, index) in experiences" :key="index"
  >
    <v-card color="secondary" dark>
      <v-card-title>
        <div style="width: 100%">
          {{ experience.position }}
        </div>
        <div style="width: 100%" class="pa-2 subtitle-2">
          {{ experience.company }} - {{ getDateString(new Date(experience.dateStart)) }} - {{ experience.dateEnd ? getDateString(new Date(experience.dateEnd)) : 'Actualidad' }}
        </div>
      </v-card-title>

      <v-card-text class="text-left px-12">
        <v-container v-html="experience.description">
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-chip
            pill color="primary" class="ma-1"
            v-for="(ability, index) in experience.abilities" :key="index">
            <v-avatar left color="accent"><v-icon>{{ ability.icon }}</v-icon></v-avatar>
            {{ ability.name }}
          </v-chip>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { getDateString } from '../lib/Utility';

export default Vue.extend({
  name: 'Experience',
  computed: {
    ...mapState(['experiences']),
  },
  methods: {
    ...mapActions(['loadExperiences']),
    getDateString,
  },
  created() {
    this.loadExperiences();
  },
});
</script>