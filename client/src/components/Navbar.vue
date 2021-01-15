<template>
  <nav>
    <v-toolbar flat app src="../assets/winecellarHeader.jpg">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">my</span>
        <span>WineCellar</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat dark color="grey lighten-4">
        <span class="grey--text">Sign Out</span>
        <v-icon class="grey--text" right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer height="400" dark app v-model="drawer" class="indigo">
      <v-list nav dense>
        <v-subheader>Cellar Options</v-subheader>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(link, l) in links"
            :key="l"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-glass-flute", text: "My wines", route: "/mywines" },
      { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
      { icon: "mdi-flag", text: "Admin", route: "/admin" }
    ]
  })
};
</script>

<style></style>
