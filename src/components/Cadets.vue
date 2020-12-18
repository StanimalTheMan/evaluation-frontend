<template>
  <v-data-table
    :headers="cadetsHeaders"
    :items="cadets"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="cadet_id"
    class="elevation-1"
  >
    <template v-slot:item="{ item, expand, isExpanded }">
      <tr>
        <td>{{ item.cadetName }}</td>
        <td>{{ item.year }}</td>
        <td>
          <v-btn
            @click="
              expand(!isExpanded);
              getCadetDataAndCourses();
            "
            text
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td v-if="isGetCadetDataAndCourses" :colspan="headers.length">
        <v-card>
          {{ cadets[item.cadet_id - 1].SATM }}
        </v-card>
        <cadet-courses-data :cadetID="item.cadet_id"></cadet-courses-data>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import CadetCoursesData from "./CadetCoursesData";

export default {
  props: ["yearID"],
  components: {
    CadetCoursesData,
  },
  data() {
    return {
      expanded: [],
      singleExpand: true,
      cadetsHeaders: [
        {
          text: "CADET NAME",
          value: "cadetName",
          class: "grey black--text",
        },
        { text: "YEAR", value: "year", class: "grey black--text" },
        { text: "VIEW", class: "grey black--text" },
      ],
      isGetCadetDataAndCourses: false,
      cadets: [],
    };
  },
  methods: {
    getCadetDataAndCourses() {
      this.isGetCadetDataAndCourses = true;
    },
  },
  created() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://127.0.0.1:5000/years/${this.yearID}/cadets`);
    xhr.responseType = "json";

    xhr.send();

    let that = this;
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log(xhr.status);
      } else {
        that.cadets = xhr.response.cadets_data;
      }
    };

    xhr.onerror = function() {
      alert("Request failed");
    };
  },
};
</script>

<style scoped></style>
