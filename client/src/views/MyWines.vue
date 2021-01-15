<template>
  <div class="mywines">
    <h1>My Wines</h1>
    <v-container class="my-5">
      <v-card v-for="wine in wines" :key="wine.wineID">
        <v-layout row wrap :class="`pa-3 wine ${wine.wineColor}`">
          <v-flex xs12 md2>
            <div class="caption grey--text">Winery</div>
            <div>{{ wine.winery.wineryName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Vintage</div>
            <div>{{ wine.wineYear }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Varietal</div>
            <div>{{ wine.varietal.varietalName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Wine Name</div>
            <div>{{ wine.wineName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Rating</div>
            <div>{{ wine.overallRating }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import WinesService from "@/services/WinesService";

export default {
  name: "MyWines",
  data: () => ({
    wines: []
  }),
  async created() {
    await WinesService.index().then(wines => {
      this.wines = wines.data;
    });
  }
};
</script>

<style>
.wine.Red {
  border-left: 4px solid red;
}
.wine.White {
  border-left: 4px solid yellow;
}
</style>
