<template>
  <div v-if="currentBeer.id" class="edit-form">
    <h4>Beer</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentBeer.name"
        />
      </div>
      <!--<div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentBeer.description"
        />
      </div>-->

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentBeer.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentBeer.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteBeer">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateBeer">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Beer...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BeerService from "@/services/BeerService";
import Beer from "@/types/Beer";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "beer",
  data() {
    return {
      currentBeer: {} as Beer,
      message: "",
    };
  },
  methods: {
    getBeer(id: number) {
      BeerService.get(id)
        .then((response: ResponseData) => {
          this.currentBeer = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentBeer.id,
        name: this.currentBeer.name,
      };

      BeerService.update(this.currentBeer.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentBeer.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateBeer() {
      BeerService.update(this.currentBeer.id, this.currentBeer)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The beer was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteBeer() {
      BeerService.delete(this.currentBeer.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "beers" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getBeer(+this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
