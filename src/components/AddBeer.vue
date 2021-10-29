<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="beer.name"
          name="name"
        />
      </div>

      <!--<div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="beer.description"
          name="description"
        />
      </div>-->

      <button @click="saveBeer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBeer">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BeerService from "@/services/BeerService";
import Beer from "@/types/Beer";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-beer",
  data() {
    return {
      beer: {
        id: null,
        name: "",
      } as Beer,
      submitted: false,
    };
  },
  methods: {
    saveBeer() {
      let data = {
        name: this.beer.name,
      };

      BeerService.create(data)
        .then((response: ResponseData) => {
          this.beer.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newBeer() {
      this.submitted = false;
      this.beer = {} as Beer;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
