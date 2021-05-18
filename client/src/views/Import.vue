<template>
  <v-card width="100%">
    <v-card-title>Upload file</v-card-title>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 md10>
          <v-file-input
            :value="selectedFile "
            accept="application/json"
            placeholder="Upload your documents"
            label="File input"
            prepend-icon="mdi-paperclip"
            chips
            @change="fileSelect"
            :error="badFile"
            :error-messages="badFile ? 'Invalid JSON format' : ''"
          ></v-file-input>
        </v-flex>
        <v-flex xs12 md2>
          <v-btn
            :disabled="!selectedFile || badFile || badJson"
            depressed
            color="primary"
            class="ml-5 mt-3 mb-3"
            @click="uploadFile"
            :loading="isLoading"
          >
            <v-icon>mdi-upload</v-icon>Upload
          </v-btn>
        </v-flex>
      </v-layout>

      <Editor v-if="loadedFile && !badFile" :content="fileContent" />
      <div v-if="badJson">The data is not correct</div>
      <v-card elevation="0" v-if="itemsImported.length">
        <v-card-title>Upload history</v-card-title>
        <v-container>
          <v-layout justify-center>
            <v-expansion-panels accordion>
              <v-expansion-panel v-for="(item,i) in itemsImported" :key="i">
                <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Date and time: {{item.date && item.date.toLocaleString()}}
                  <Editor :content="item.data" v-if="item.data && item.data !== '[]'" />
                  <div v-if="item.data && item.data === '[]'">No data imported</div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-layout>
        </v-container>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import Editor from "../components/Editor";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "import",
  computed: {
    ...mapState({
      selectedFile: state => state.fileImport.selectedFile,
      fileContent: state => state.fileImport.text,
      badFile: state => state.fileImport.error !== null,
      loadedFile: state => state.fileImport.loadedFile,
      itemsImported: state => state.fileImport.itemsImported,
      badJson: state => state.fileImport.badJson,
      isLoading: state => state.fileImport.isLoading
    })
  },
  components: {
    Editor
  },
  methods: {
    ...mapActions(["fileImport/selectFile", "fileImport/uploadFile"]),
    ...mapMutations(["fileImport/removeFileSelection"]),
    fileSelect(file) {
      if (file) {
        this["fileImport/selectFile"](file);
      } else {
        this["fileImport/removeFileSelection"]();
      }
    },
    uploadFile() {
      this["fileImport/uploadFile"]();
    }
  }
};
</script>