<template>
  <v-app>
    <!-- <Sidebar /> -->
    <Header />

    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fill-height>
        <v-layout>
          <slot></slot>
        </v-layout>
        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
      </v-container>
      <!-- Sizes your content based upon application components -->
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default {
  name: "Layout",
  components: {
    Header,
    // Sidebar,
    Footer
  },
  data: () => ({
    tab: null,
    tabs: 3,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  })
};
</script>