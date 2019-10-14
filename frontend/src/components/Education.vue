<template>
<v-row>
  <v-col
    cols="12" class="text-left"
    v-for="(education, index) in educations" :key="index"
  >
    <v-card class="secondary">
      <v-card-title>
        {{ education.degree }}
      </v-card-title>
      <v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              {{ getDateString(new Date(education.dateStart)) }} - {{ education.dateEnd ? getDateString(new Date(education.dateEnd)) : 'Actualidad' }} - {{ education.institution }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ education.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-chip
          pill color="primary" class="ma-1"
          v-for="(ability, index) in education.abilities" :key="index">
          <v-avatar left color="accent"><v-icon>{{ ability.icon }}</v-icon></v-avatar>
          {{ ability.name }}
        </v-chip>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { getDateString } from '../lib/Utility';

export default Vue.extend({
  name: 'Experience',
  computed: {
    ...mapState(['educations']),
  },
  methods: {
    ...mapActions(['loadEducations']),
    getDateString,
  },
  created() {
    this.loadEducations();
  },
});
</script>