<template>
  <v-data-table
    :headers="dashboardHeaders"
    :items="reviewsByYear"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="year"
    class="elevation-1"
  >
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
        { text: "YEAR GROUP", value: "year" },
        { text: "TOTAL CADETS", value: "totalCadets" },
        { text: "TOTAL TO REVIEW", value: "totalToReview" },
        { text: "Available Actions" }, // does the value have to be "View Details"?
      ],
      isGetCadets: false,
      reviewsByYear: [],
    };
  },
  methods: {
    getCadets() {
      this.isGetCadets = true;
    },
  },
  created() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:5000/years/summary");
    // xhr.setRequestHeader("Accept", "application/json");
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
