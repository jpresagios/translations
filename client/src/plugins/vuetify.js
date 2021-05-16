import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#1867c0",
        secondary: "#89b613",
        accent: "#f5f5f5",
        error: "#b71c1c"
      }
    }
  }
});
