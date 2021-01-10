<template>
  <v-data-table
    :headers="cadetsHeaders"
    :items="cadets"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :hide-default-footer="true"
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
              getCadetDataAndCourses(item.cadet_id);
            "
            text
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td v-if="isGetCadetDataAndCourses" :colspan="headers.length">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <v-card>
                <v-row>
                  <v-col cols="3">
                    <v-card-text>Class Year: 2020</v-card-text>
                    <v-card-text>Company: B | Regiment: 2</v-card-text>
                    <v-card-text
                      >Major 1: SYSTEMS ENGINEERING MAJOR</v-card-text
                    >
                    <v-card-text>Major 2: None Selected</v-card-text>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-card>
                      <v-card-title>FAILURE STATUS</v-card-title>
                      <v-card-text
                        >Low Academic Score:
                        {{ cadetGraybookFailure.course_failure }}</v-card-text
                      >
                      <v-card-text
                        >Course Failure:
                        {{
                          cadetGraybookFailure.low_academic_score
                        }}</v-card-text
                      >
                      <v-card-text
                        >Pending Honor Case:
                        {{
                          cadetGraybookFailure.pending_honor_case
                        }}</v-card-text
                      >
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-card-text
                    ><span class="font-weight-bold">SAT-MATH:</span>
                    <!-- {{ cadets[item.cadet_id - 1].SATM }}-->530</v-card-text
                  >
                  <v-card-text>SAT-VERB: 530</v-card-text>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon>mdi-help</v-icon>
              Department Head Recommendations
              <v-select label="-- Select --"></v-select>
            </v-col>
            <v-col cols="6">
              <v-icon>mdi-help</v-icon>
              Board Decision
              <v-select label="-- Select --"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              Department Head Comments (characters remaining = 700)
              <v-textarea outlined></v-textarea>
            </v-col>
            <v-col cols="6">
              Board Decision Comments (characters remaining = 700)
              <v-textarea outlined></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn>Submit</v-btn>
          </v-row>
          <cadet-courses-data :cadetID="item.cadet_id"></cadet-courses-data>
        </v-container>
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
      // cadetsHeaders: [
      //   { text: "CADET NAME", value: "cadetName", class: "grey black--text" },
      //   { text: "STATUS", value: "status", class: "grey black--text" },
      //   { text: "YEAR", value: "year", class: "grey black--text" },
      //   { text: "TERM", value: "term", class: "grey black--text" },
      //   { text: "DR", value: "dr", class: "grey black--text" },
      //   { text: "CR", value: "cr", class: "grey black--text" },
      //   { text: "CS", value: "cs", class: "grey black--text" },
      //   { text: "DS", value: "ds", class: "grey black--text" },
      //   { text: "TOT. VOTES", value: "totalVotes", class: "grey black--text" },
      //   { text: "D.H. REC.", value: "dhrec", class: "grey black--text" },
      //   { text: "BOARD REC.", value: "boardRec", class: "grey black--text" },
      //   { text: "VIEW", class: "grey black--text" },
      // ],
      isGetCadetDataAndCourses: false,
      cadets: [],
      // cadets: [
      //   {
      //     cadetName: "Bob Jones",
      //     status: "yellow",
      //     year: 2020,
      //     term: 2,
      //     dr: 2,
      //     cr: 4,
      //     cs: 2,
      //     ds: 0,
      //     totalVotes: 8,
      //     dhrec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      //   {
      //     cadetName: "Joelle Jones",
      //     status: "yellow",
      //     year: 2020,
      //     term: 2,
      //     dr: 0,
      //     cr: 5,
      //     cs: 1,
      //     ds: 0,
      //     totalVotes: 6,
      //     dhrec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      //   {
      //     cadetName: "Patrick Milone",
      //     status: "yellow",
      //     year: 2020,
      //     term: 2,
      //     dr: 0,
      //     cr: 2,
      //     cs: 0,
      //     ds: 0,
      //     totalVotes: 2,
      //     dhrec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      // ],
      cadetGraybookFailure: [],
    };
  },
  methods: {
    getCadetDataAndCourses(cadet_id) {
      this.isGetCadetDataAndCourses = true;
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `http://127.0.0.1:5000/cadets/${cadet_id}/failure`);
      xhr.responseType = "json";

      xhr.send();

      let that = this;
      xhr.onload = function() {
        if (xhr.status != 200) {
          console.log(xhr.status);
        } else {
          that.cadetGraybookFailure = xhr.response.failure;
        }
      };

      xhr.onerror = function() {
        alert("Request failed");
      };
    },
  },
  async created() {
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
