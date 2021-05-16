import searchApi from "../../api/search.api";

// initial state
const state = {
  items: [],
  isLoading: false,
  error: null,
  historySearch: [],
  criteria: "",
  notFound: false
};

// getters
const getters = {};

// actions
const actions = {
  async query({ commit, state }) {
    try {
      if (state.criteria) {
        commit("setLoading", true);
        commit("updateNotFound", false);
        const results = await searchApi.search(state.criteria);
        commit("addHistoryRecord", {
          criteria: state.criteria,
          date: new Date(),
          results: results.data
        });
        commit("searchResults", results.data);
        commit("updateNotFound", results.data.length === 0);
      }
    } catch (error) {
      commit("error", error);
    } finally {
      commit("setLoading", false);
    }
  }
};

// mutations
const mutations = {
  setLoading(state, loading) {
    state.isLoading = loading;
  },
  searchResults(state, results) {
    state.items = results;
  },
  error(state, msg) {
    state.error = msg;
  },
  addHistoryRecord(state, record) {
    state.historySearch = [record, ...state.historySearch];
  },
  updateCriteria(state, criteria) {
    state.criteria = criteria;
  },
  clearSearch(state) {
    state.items = [];
    state.notFound = false;
  },
  updateNotFound(state, found) {
    state.notFound = found;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
