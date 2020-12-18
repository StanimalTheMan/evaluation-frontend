<template>
  <v-data-table
    :headers="dashboardHeaders"
    :items="reviewsByYear"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="year"
    class="elevation-1"
  >
    <!-- <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
        <v-data-table :headers="cadetsHeaders" :items="cadets"> </v-data-table>
      </td>
    </template> -->

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
              getCadets(item.year_id);
            "
            text
            >View Details</v-btn
          >
        </td>
      </tr>
    </template>

    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
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
                    getCadetDataAndCourses(item.cadet_id);
                  "
                  text
                  ><v-icon>mdi-magnify</v-icon></v-btn
                >
              </td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ headers, item }"
            ><td :colspan="headers.length">
              <v-card>
                {{ cadets[item.cadet_id - 1].SATM }}
              </v-card>
              <v-data-table
                :headers="cadetCoursesTakenHeaders"
                :items="cadetData"
              >
              </v-data-table></td
          ></template>
        </v-data-table>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
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
      cadetsHeaders: [
        {
          text: "CADET NAME",
          value: "cadetName",
          class: "grey ligthen-5 black--text",
        },
        { text: "YEAR", value: "year", class: "grey ligthen-5 black--text" },
        { text: "VIEW", class: "grey ligthen-5 black--text" },
      ],
      cadetCoursesTakenHeaders: [
        {
          text: "Course ID",
          value: "courseID",
        },
        {
          text: "Course Description",
          value: "courseDescription",
        },
        {
          text: "Grade",
          value: "courseGrade",
        },
      ],
      // cadetsHeaders: [
      //   { text: "CADET NAME", value: "name" },
      //   { text: "STATUS", value: "status" },
      //   { text: "YEAR", value: "year" },
      //   { text: "TERM", value: "term" },
      //   { text: "DR", value: "DR" },
      //   { text: "CR", value: "CR" },
      //   { text: "CS", value: "CS" },
      //   { text: "DS", value: "DS" },
      //   { text: "TOT. VOTES", value: "totalVotes" },
      //   { text: "D.H. REC.", value: "departmentHeadRec" },
      //   { text: "BOARD REC.", value: "boardRec" },
      //   { text: "VIEW" },
      // ],
      reviewsByYear: [],
      cadets: [],
      cadetData: [],
      // hardcode data for now
      // cadets: [
      //   {
      //     name: "Bob (2020)",
      //     status: "Yellow",
      //     year: 2020,
      //     term: 2,
      //     DR: 2,
      //     CR: 4,
      //     CS: 2,
      //     DS: 0,
      //     totalVotes: 8,
      //     departmentHeadRec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      //   {
      //     name: "Kim (2020)",
      //     status: "Yellow",
      //     year: 2020,
      //     term: 2,
      //     DR: 0,
      //     CR: 5,
      //     CS: 1,
      //     DS: 0,
      //     totalVotes: 6,
      //     departmentHeadRec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      //   {
      //     name: "Seunho (2020)",
      //     status: "Red",
      //     year: 2020,
      //     term: 2,
      //     DR: 0,
      //     CR: 2,
      //     CS: 0,
      //     DS: 0,
      //     totalVotes: 2,
      //     departmentHeadRec: "No Decision",
      //     boardRec: "No Decision",
      //   },
      // ],
    };
  },
  methods: {
    getCadets(yearID) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `http://127.0.0.1:5000/years/${yearID}/cadets`);
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
    getCadetDataAndCourses(cadetID) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `http://127.0.0.1:5000/cadets/${cadetID}/info`);
      xhr.responseType = "json";

      xhr.send();

      let that = this;
      xhr.onload = function() {
        if (xhr.status != 200) {
          console.log(xhr.status);
        } else {
          that.cadetData = xhr.response.cadet_data;
        }
      };

      xhr.onerror = function() {
        alert("Request failed");
      };
    },
  },
  mounted() {
    this.reviewsByYear = this.reviewsByYear.map((entry) => {
      return {
        // inefficient when there's a lot of data?
        ...entry,
        availableActions: "View Details",
      };
    });
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
