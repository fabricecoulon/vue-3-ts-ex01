<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Beers List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(beer, index) in beers"
          :key="index"
          @click="setActiveBeer(beer, index)"
        >
          {{ beer.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBeers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBeer.id">
        <h4>Beer</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentBeer.name }}
        </div>
        <!--<div>
          <label><strong>Description:</strong></label>
          {{ currentBeer.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentBeer.published ? "Published" : "Pending" }}
        </div>-->

        <router-link
          :to="'/beers/' + currentBeer.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Beer...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BeerService from "@/services/BeerService";
import Beer from "@/types/Beer";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "beers-list",
  data() {
    return {
      beers: [] as Beer[],
      currentBeer: {} as Beer,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveBeers() {
      BeerService.getAll()
        .then((response: ResponseData) => {
          this.beers = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBeers();
      this.currentBeer = {} as Beer;
      this.currentIndex = -1;
    },

    setActiveBeer(beer: Beer, index = -1) {
      this.currentBeer = beer;
      this.currentIndex = index;
    },

    removeAllBeers() {
      /*BerrService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
      */
    },

    searchName() {
      BeerService.findByName(this.name)
        .then((response: ResponseData) => {
          this.beers = response.data;
          this.setActiveBeer({} as Beer);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveBeers();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
