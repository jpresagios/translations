<template>
  <nav>
    <v-app-bar color="primary" app dark>
      <v-container>
        <v-toolbar color="primary" elevation="0">
          <v-toolbar-title>Translation Management System</v-toolbar-title>
          <v-toolbar-items class="ml-6">
            <v-btn to="/" text :class="[$route.fullPath === '/history' ? 'v-btn--active' : '']">
              <v-icon class="mr-2">mdi-home</v-icon>Home
            </v-btn>
            <v-btn to="import" text>
              <v-icon class="mr-2">mdi-cloud-upload</v-icon>Import
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <div xs4 md4 class="pr-2 mx-4">
            <v-img src="../assets/logo.svg" />
          </div>
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </nav>
</template>