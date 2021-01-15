<template>
  <v-dialog>
    <v-btn slot="activator" class="success">Add a Winery</v-btn>
    <v-card>
      <v-card-title> </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Winery Name" v-model="wineryName"></v-text-field>
          <v-text-field
            label="Proprietor-Owner"
            v-model="proprietorName"
          ></v-text-field>
          <v-text-field
            label="Wine Maker"
            v-model="wineMakerName"
          ></v-text-field>
          <v-text-field label="phone" v-model="phone":rules="inputRules"></v-text-field>
          <v-text-field label="website" v-model="website"></v-text-field>
          <v-text-field label="Description" v-model="wineryDesc"></v-text-field>
          <v-text-field
            label="Appellation"
            v-model="defaultAppellationId"
          ></v-text-field>
          <v-btn class="success mx-0 mt-3" @click="submit">Save</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewWineryPopup",
  data: () => ({
    winery: {
      wineryName: "",
      proprietorName: "",
      wineMakerName: "",
      phone: "",
      website: "",
      wineryDesc: "",
      defaultAppellationId: null,
      inputRules: [
        v => v.length >=3 || 'Minimum length is 3'
      ]
    }
  }),
  methods: () => ({
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.winery)
      }
    }
  })
};
</script>