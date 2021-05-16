<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout";

export default {
  components: {
    Layout
  }
};
</script>
