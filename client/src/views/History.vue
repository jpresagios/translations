<template>
  <v-card elevation="0">
    <v-card-title>Search history</v-card-title>
    <v-container>
      <v-layout justify-center>
        <v-expansion-panels accordion v-if="historySearch.length !== 0">
          <v-expansion-panel v-for="(item,i) in historySearch" :key="i">
            <v-expansion-panel-header>{{item.date.toLocaleString()}} - {{item.criteria}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <SourceTargetHeader v-if="item.results.length" />
              <SearchResults :results="item.results" v-if="item.results.length" />
              <div v-if="item.results.length === 0">Results not found for the criteria</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-flex>
          <div v-if="historySearch.length === 0">Nothing search until now</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
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
    historySearch() {
      return this.$store.state.search.historySearch;
    }
  }
};
</script>
