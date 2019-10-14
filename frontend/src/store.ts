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
  },
  mutations: {
    setNetworks: (state, networks) => state.networks = networks,
    setAbilities: (state, abilities) => state.abilities = abilities,
    setEducations: (state, educations) => state.educations = educations,
    setExperiences: (state, experiences) => state.experiences = experiences,
    setTimeline: (state, timeline) => state.timeline = timeline,
    setProjects: (state, projects) => state.projects = projects,
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
    loadEducations({ commit }) {
      axios.get('public/education')
        .then((res) => commit('setEducations', res.data.data));
    },
    loadExperiences({ commit }) {
      axios.get('public/experience')
        .then((res) => commit('setExperiences', res.data.data));
    },
    loadTimeline({ commit }) {
      axios.get('public/my-timeline')
        .then((res) => commit('setTimeline', res.data.data));
    },
    loadProjects({ commit }) {
      axios.get('public/project')
        .then((res) => commit('setProjects', res.data.data));
    },
  },
});
