import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/src/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#18181b',
        secondary: '#212126',
        accent: '#9b58b6',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'mdi',
  },
});
