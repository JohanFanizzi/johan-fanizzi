<template>
<v-timeline align-top class="timeline" :dense="this.$vuetify.breakpoint.xsOnly">
  <v-timeline-item
    small color="accent"
    v-for="(elment, index) in timeline" :key="index" :icon="elment.education ? 'mdi-school' : 'mdi-briefcase'"
  >
    <span slot="opposite">
      {{ getDateString(new Date(elment.date)) }}
    </span>
    <v-card color="primary" class="elevation-2">
      <div v-if="$vuetify.breakpoint.xsOnly" class="caption pt-2 text-center">{{ getDateString(new Date(elment.date)) }}</div>
      <v-card-title>
        {{ elment.title }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="flex-nowrap">
            <v-col cols="9">
              {{ elment.description }}
            </v-col>
            <v-col cols="3" class="text-right">
              <router-link to="cv">
                <v-icon color="accent">mdi-file-document-box-multiple</v-icon>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-timeline-item>
</v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { getDateString } from '../lib/Utility';

export default Vue.extend({
  name: 'Timeline',
  computed: {
    ...mapState(['timeline']),
  },
  methods: {
    ...mapActions(['loadTimeline']),
    getDateString,
  },
  created() {
    this.loadTimeline();
  },
});
</script>