import Vue from "vue";
import Vuex from "vuex";
import search from "./modules/search";
import fileImport from "./modules/file-import";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    search,
    fileImport
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
