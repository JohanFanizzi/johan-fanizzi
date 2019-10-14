<template>
  <v-app-bar
    collapse :src="require('../assets/background.jpg')"
    collapse-on-scroll app color="primary" dark extended class="justofy-center"
  >
    <div class="text-center" style="width: 100%" v-if="!onTop">
      <v-menu offset-y open-on-hover close-on-click close-on-content-click transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark text icon v-on="on">
            <v-img
              :src="require('../assets/logo.svg')"
              contain height="30" class="ma-0 pa-0" width="50" max-width="50"
            ></v-img>
          </v-btn>
        </template>
        <v-list color="primary">
          <v-list-item
            class="pa-0"
            v-for="menu in menuList" :key="menu.name"
          >
            <v-list-item-content class="py-0">
              <v-btn
                color="accent" block tile height="auto" text class="py-4 px-6"
                :to="menu.to"
              >
                {{ menu.name }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-card
      v-if="onTop"
      class="mx-auto" style="margin-top: 160px" color="primary" dark width="25%" max-width="500" min-width="290px"
    >
      <v-container class="pb-0">
        <v-row justify="space-between">
          <v-col cols="12" class="d-flex flex-nowrap justify-center pt-4 pb-3">
            <v-img
              :src="require('../assets/logo.svg')"
              contain height="35" width="50" max-width="50" class="ma-0 pa-0"
            ></v-img>
            <div class="display-1 mr-4 text-no-wrap">Johan Fanizzi</div>
          </v-col>
        </v-row>

        <networks></networks>

        <v-row justify="space-around" class="pt-3">
          <div
            v-for="menu in menuList" :key="menu.name"
            :style="`width: ${ 100 / menuList.length }%`"
          >
            <v-btn
              color="accent" block tile height="auto" text class="pa-4"
              :to="menu.to"
            >
              {{ menu.name }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Networks from './Networks.vue';

interface IMenu {
  name: string;
  to: string;
}

export default Vue.extend({
  name: 'Navbar',
  data() {
    return {
      menuList: []as IMenu[],
      onTop: true,
    };
  },
  components: {
    Networks,
  },
  created() {
    this.menuList = [
      {
        name: 'Home',
        to: '/',
      },
      {
        name: 'CV',
        to: '/cv',
      },
      {
        name: 'Proyectos',
        to: '/projects',
      },
    ];
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.onTop = window.scrollY === 0;
    },
  },
});
</script>