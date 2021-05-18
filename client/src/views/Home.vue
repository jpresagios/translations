<template>
  <v-card width="100%">
    <v-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab to="/" class="pa-5">
        <v-icon size="20" class="mr-2">mdi-magnify</v-icon>Search Results
      </v-tab>
      <v-tab to="history" class="pa-5">
        <v-icon size="20" class="mr-2">mdi-chart-timeline</v-icon>History
      </v-tab>
    </v-tabs>
    <v-card-text>
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "home"
};
</script>
