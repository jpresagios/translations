<template>
  <v-layout wrap>
    <v-flex xs12 v-for="(item, i) in results" :key="i">
      <v-card class="mb-2" elevation="1">
        <v-layout row py-0 px-5>
          <v-flex xs12 md5>
            <div class="text--primary mt-2">
              <div class="text-center mb-3">{{item.source}}</div>
            </div>
          </v-flex>
          <v-flex xs12 md2 class="text-center">
            <v-divider :vertical="!isMobile"></v-divider>
          </v-flex>
          <v-flex xs12 md5>
            <div class="text--primary mt-2">
              <div class="text-center mb-3">{{item.target}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["results"],
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
