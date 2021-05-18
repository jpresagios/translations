<template>
  <v-layout wrap>
    <v-card class="mb-4" v-if="isMobile" elevation="2" width="100%">
      <v-card-title class="text-center headline pb-4">Source / Target</v-card-title>
    </v-card>
    <v-card class="mb-4" v-if="!isMobile" elevation="2" width="100%">
      <v-layout row py-0 px-5>
        <v-flex xs12 md5 class="text-center">
          <div class="text-center headline py-3">Source</div>
        </v-flex>
        <v-flex xs12 md2 class="text-center">
          <v-divider :vertical="!isMobile"></v-divider>
        </v-flex>
        <v-flex xs12 md5>
          <div class="text-center headline py-3">Target</div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
