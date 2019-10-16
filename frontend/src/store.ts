import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Network from './models/Network';
import Ability from './models/Ability';
import Experience from './models/Experience';
import Education from './models/Education';
import Project from './models/Project';
import Timeline from './models/Timeline';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    networks: [] as Network[],
    abilities: [] as Ability[],
    educations: [] as Education[],
    experiences: [] as Experience[],
    projects: [] as Project[],
    timeline: [] as Timeline[],
    selectedAbility: {} as Ability,
    reverse: false,
  },
  mutations: {
    setNetworks: (state, networks) => state.networks = networks,
    setAbilities: (state, abilities) => state.abilities = abilities,
    setEducations: (state, educations) => {
      state.educations = educations;

      if (state.reverse) {
        state.educations.reverse();
      }
    },
    setExperiences: (state, experiences) => {
      state.experiences = experiences;

      if (state.reverse) {
        state.experiences.reverse();
      }
    },
    setTimeline: (state, timeline) => {
      state.timeline = timeline;

      if (state.reverse) {
        state.timeline.reverse();
      }
    },
    setProjects: (state, projects) => {
      state.projects = projects;

      if (state.reverse) {
        state.projects.reverse();
      }
    },
    setSelectedAbility: (state, ability) => state.selectedAbility = ability,
    setReverse: (state, reverse) => {
      state.reverse = reverse;

      state.educations.reverse();
      state.experiences.reverse();
      state.timeline.reverse();
      state.projects.reverse();
    },
  },
  actions: {
    loadNetworks({ commit }) {
      axios.get('public/network')
        .then((res) => commit('setNetworks', res.data.data));
    },
    loadAbilities({ commit }) {
      axios.get('public/ability')
        .then((res) => commit('setAbilities', res.data.data));
    },
    loadEducations({ commit, state }) {
      const url = state.selectedAbility._id ? `public/education/${ state.selectedAbility._id }` : 'public/education';
      axios.get(url)
        .then((res) => commit('setEducations', res.data.data));
    },
    loadExperiences({ commit, state }) {
      const url = state.selectedAbility._id ? `public/experience/${ state.selectedAbility._id }` : 'public/experience';
      axios.get(url)
        .then((res) => commit('setExperiences', res.data.data));
    },
    loadTimeline({ commit, state }) {
      const url = state.selectedAbility._id ?
        `public/my-timeline/${ state.selectedAbility._id }` : 'public/my-timeline';
      axios.get(url)
        .then((res) => commit('setTimeline', res.data.data));
    },
    loadProjects({ commit, state }) {
      const url = state.selectedAbility._id ? `public/project/${ state.selectedAbility._id }` : 'public/project';
      axios.get(url)
        .then((res) => commit('setProjects', res.data.data));
    },
    filterAbility({ commit, dispatch}, ability: Ability) {
      commit('setSelectedAbility', ability);

      dispatch('loadEducations');
      dispatch('loadExperiences');
      dispatch('loadTimeline');
      dispatch('loadProjects');
    },
  },
});
