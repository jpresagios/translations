import fileImportApi from "../../api/file-import.api";
import {
  getFileBase64,
  getFileJsonText,
  validateJsonFormat
} from "../utils/file.utils";

// initial state
const state = {
  itemsImported: [],
  base64: "",
  text: "",
  selectedFile: null,
  loadedFile: false,
  isLoading: false,
  error: null,
  errorUploading: null,
  badJson: false
};

// getters
const getters = {};

// actions
const actions = {
  async selectFile({ commit }, file) {
    try {
      commit("saveFile", file);
      const data = await Promise.all([
        await getFileBase64(file),
        await getFileJsonText(file)
      ]);
      if (!validateJsonFormat(data[1])) {
        commit("badFormat");
      }
      commit("saveBase64", data[0]);
      commit("saveText", data[1]);
    } catch (error) {
      commit("error", error);
    }
  },
  async uploadFile({ commit, state }) {
    try {
      commit("isLoading", true);
      const result = await fileImportApi.uploadFile({
        name: state.selectedFile.name,
        data: state.base64
      });
      const resultData = result.data.data;
      commit("updateHistory", {
        name: resultData.file,
        data: JSON.stringify(
          resultData.data.map(t => ({ source: t.source, target: t.target })),
          null,
          "\t"
        ),
        date: resultData.createdAt ? new Date(resultData.createdAt) : new Date()
      });
    } catch (error) {
      commit("errorUploading", error);
    } finally {
      commit("isLoading", false);
    }
  }
};

// mutations
const mutations = {
  saveBase64(state, data) {
    state.base64 = data;
  },
  saveText(state, text) {
    state.text = text;
  },
  saveFile(state, file) {
    state.selectedFile = file;
    state.loadedFile = true;
    state.badJson = false;
    state.error = null;
  },
  removeFileSelection(state) {
    state.selectedFile = null;
    state.base64 = "";
    state.text = "";
    state.loadedFile = false;
    state.error = null;
    state.badJson = false;
  },
  isLoading(state, loading) {
    state.isLoading = loading;
  },
  updateHistory(state, result) {
    state.itemsImported = [result, ...state.itemsImported];
    state.selectedFile = null;
    state.base64 = "";
    state.text = "";
    state.loadedFile = false;
  },
  error(state, error) {
    state.error = error;
  },
  errorUploading(state, error) {
    state.errorUploading = error;
  },
  badFormat(state) {
    state.badJson = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
