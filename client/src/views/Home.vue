<template>
  <div class="home">
    <!-- <h1>This is the homepage</h1> -->
    <v-container>
      <v-layout row wrap>
        <v-flex lg4>
          <wotd-panel class="mt-2" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import WotdPanel from "@/components/WotdPanel";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    WotdPanel
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  data: () => ({})
};
</script>
