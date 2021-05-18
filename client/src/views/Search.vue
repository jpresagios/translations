<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md10>
        <v-text-field
          @keypress.enter="doSearch"
          @click:clear="clearSearch"
          v-model="search"
          color="blue darken-2"
          label="Search"
          required
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md2>
        <v-btn
          :disabled="!search"
          depressed
          color="primary"
          class="ml-5 mt-3 mb-3"
          @click="doSearch"
          :loading="isLoading"
        >
          <v-icon>mdi-magnify</v-icon>Search
        </v-btn>
      </v-flex>
    </v-layout>
    <SourceTargetHeader v-if="items && items.length" />
    <SearchResults :results="items" v-if="items && items.length" />
    <div v-if="notFound">Results not found for the criteria</div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SourceTargetHeader from "../components/SourceTargetHeader";
import SearchResults from "../components/SearchResults";

export default {
  components: {
    SourceTargetHeader,
    SearchResults
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    ...mapState({
      items: state => state.search.items,
      isLoading: state => state.search.isLoading,
      error: state => state.search.error,
      notFound: state => state.search.notFound
    }),
    search: {
      get() {
        return this.$store.state.search.criteria;
      },
      set(value) {
        this.$store.commit("search/updateCriteria", value);
        if(!value) {
          this.$store.commit("search/updateNotFound", false);
        }
      }
    }
  },
  methods: {
    async doSearch() {
      await this["search/query"]();
    },
    ...mapActions(["search/query"]),
    clearSearch() {
      this.$store.commit("search/clearSearch");
    }
  }
};
</script>
