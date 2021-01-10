<template>
  <v-data-table
    :headers="dashboardHeaders"
    :items="reviewsByYear"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :hide-default-footer="true"
    item-key="year"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-card>
        <v-card-text v-if="departmentHead"
          >Department Head Recommendation</v-card-text
        >
        <v-card-text v-else>Regular</v-card-text>
      </v-card>
    </template>
    <template v-slot:item="{ item, expand, isExpanded }">
      <tr>
        <td class="d-block d-sm-table-cell">
          {{ item.year }}
        </td>
        <td class="d-block d-sm-table-cell">
          {{ item.totalCadets }}
        </td>
        <td class="d-block d-sm-table-cell">
          {{ item.totalToReview }}
        </td>
        <td class="d-block d-sm-table-cell">
          <!-- probably separate into other components, empty cadets after you
          want to "de-extend" row? -->
          <v-btn
            @click="
              expand(!isExpanded);
              getCadets();
            "
            text
            >View Details</v-btn
          >
        </td>
      </tr>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td v-if="isGetCadets" :colspan="headers.length">
        <cadets :yearID="item.year_id"></cadets>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import Cadets from "../components/Cadets";

export default {
  components: {
    Cadets,
  },
  data() {
    return {
      expanded: [],
      singleExpand: true,
      dashboardHeaders: [
        { text: "YEAR GROUP", value: "year", class: "black white--text" },
        {
          text: "TOTAL CADETS",
          value: "totalCadets",
          class: "black white--text",
        },
        {
          text: "TOTAL TO REVIEW",
          value: "totalToReview",
          class: "black white--text",
        },
        { text: "Available Actions", class: "black white--text" }, // does the value have to be "View Details"?
      ],
      isGetCadets: false,
      reviewsByYear: [],
      // reviewsByYear: [
      //   { year: 2020, totalCadets: 29, totalToReview: 29 },
      //   { year: 2021, totalCadets: 67, totalToReview: 67 },
      //   { year: 2022, totalCadets: 122, totalToReview: 122 },
      //   { year: 2023, totalCadets: 157, totalToReview: 157 },
      // ],
    };
  },
  methods: {
    getCadets() {
      this.isGetCadets = true;
    },
  },
  computed: {
    ...mapGetters({
      departmentHead: "isDepartmentHead",
    }),
  },
  created() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:5000/years/summary");
    xhr.responseType = "json";

    xhr.send();

    let that = this;
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log(xhr.status);
      } else {
        that.reviewsByYear = xhr.response["review_data"];
      }
    };

    xhr.onerror = function() {
      alert("Request failed");
    };
  },
};
</script>

<style scoped></style>
