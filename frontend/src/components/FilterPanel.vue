<template>
<v-row>
  <v-col cols="6" class="pl-4 pl-sm-12">
    <div v-if="selectedAbility._id">
      Filtro
      <v-chip
        close color="primary" class="ma-1"
        @click:close="filterAbility({})"
      >
        <v-avatar left color="accent">
          <v-icon>{{ selectedAbility.icon }}</v-icon>
        </v-avatar>
        {{ selectedAbility.name }}
      </v-chip>
    </div>
  </v-col>
  <v-col cols="6" class="pr-0 pr-sm-12">
    <v-switch
      v-model="localReverse" @change="setReverse(localReverse)"
      class="justify-end mt-0" label="Invertir listados" color="accent"
    ></v-switch>
  </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'FilterPanel',
  data() {
    return {
      localReverse: false,
    };
  },
  computed: {
    ...mapState(['selectedAbility', 'reverse']),
  },
  methods: {
    ...mapMutations(['setReverse']),
    ...mapActions(['filterAbility']),
  },
  created() {
    this.localReverse = this.reverse;
  },
});
</script>