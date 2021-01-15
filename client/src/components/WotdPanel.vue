<template>
  <panel title="Wine of The Day">
    <v-layout>
      <v-flex>
        <v-card class="text-sm-left">
          <v-img :src="require('../assets/wine_1.jpg')"></v-img>
        </v-card>
      </v-flex>
      <v-flex>
        <div class="ml-2">
          <p class="text-sm-left">
            <strong>Winery:</strong>
            {{ wotd.winery.wineryName }}
          </p>
          <p class="text-sm-left">
            <strong>Vintage:</strong>
            {{ wotd.wineYear }}
          </p>
          <p class="text-sm-left">
            <strong>Varietal:</strong>
            {{ wotd.varietal.varietalName }}
          </p>
          <p class="text-sm-left">
            <strong>Name:</strong>
            {{ wotd.wineName }}
          </p>

          <p class="text-sm-left">
            <strong>Score:</strong>
            {{ wotd.overallRating }}
          </p>
          <div class="text-xs-center">
            <v-rating half-increments v-model="rating"></v-rating>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import WinesService from "@/services/WinesService";

export default {
  data() {
    return {
      wotd: {}
    };
  },
  computed: {
    rating: function() {
      var localRating = 0;
      if (this.wotd.overallRating >= 99) {
        localRating = 5;
      } else if (
        this.wotd.overallRating < 99 &&
        this.wotd.overallRating >= 97
      ) {
        localRating = 4.5;
      } else if (
        this.wotd.overallRating < 97 &&
        this.wotd.overallRating >= 95
      ) {
        localRating = 4;
      } else if (
        this.wotd.overallRating < 95 &&
        this.wotd.overallRating >= 93
      ) {
        localRating = 3.5;
      } else if (
        this.wotd.overallRating < 93 &&
        this.wotd.overallRating >= 91
      ) {
        localRating = 3;
      } else if (
        this.wotd.overallRating < 91 &&
        this.wotd.overallRating >= 89
      ) {
        localRating = 2.5;
      } else if (
        this.wotd.overallRating < 89 &&
        this.wotd.overallRating >= 87
      ) {
        localRating = 2;
      } else if (
        this.wotd.overallRating < 87 &&
        this.wotd.overallRating >= 85
      ) {
        localRating = 1.5;
      } else if (
        this.wotd.overallRating < 85 &&
        this.wotd.overallRating >= 83
      ) {
        localRating = 1;
      } else if (
        this.wotd.overallRating < 83 &&
        this.wotd.overallRating >= 81
      ) {
        localRating = 1;
      } else {
        localRating = 0;
      }
      return localRating;
    }
  },
  async created() {
    await WinesService.wotd().then(wotd => {
      this.wotd = wotd.data;
    });
  }
};
</script>
<style scoped>
</style>
