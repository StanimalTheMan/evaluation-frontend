<template>
  <v-data-table
    :headers="cadetCoursesTakenHeaders"
    :items="cadetData"
    :hide-default-footer="true"
  >
    <v-data-table :headers="cadetCoursesTakenHeaders" :items="cadetData">
    </v-data-table>
  </v-data-table>
</template>

<script>
export default {
  props: ["cadetID"],
  data() {
    return {
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
        {
          text: "Faculty",
          value: "facultyName",
        },
      ],
      // cadetCoursesTakenHeaders: [
      //   {
      //     text: "Course ID",
      //     value: "courseID",
      //   },
      //   {
      //     text: "Course Description",
      //     value: "courseDescription",
      //   },
      //   {
      //     text: "Grade",
      //     value: "courseGrade",
      //   },
      //   {
      //     text: "Faculty",
      //     value: "facultyName",
      //   },
      //   {
      //     text: "Term",
      //     value: "term",
      //   },
      //   {
      //     text: "Year",
      //     value: "year",
      //   },
      // ],
      cadetData: [],
      // cadetData: [
      //   {
      //     courseID: "CY300",
      //     courseDescription: "PROGRAMMING FUNDAMENTALS",
      //     courseGrade: "C",
      //     facultyName: "JONES, TARZAN",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "LR204",
      //     courseDescription: "RUSSIAN II (STANDARD COURSE)",
      //     courseGrade: "A",
      //     facultyName: "CHIMES, CHIKORITA",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "MA205",
      //     courseDescription: "CALCULUS II",
      //     courseGrade: "B-",
      //     facultyName: "EVANS, NICK",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "MD301",
      //     courseDescription: "SECOND CLASS MILITARY PERFORMANCE I",
      //     courseGrade: "D",
      //     facultyName: "Not Available",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "MD302",
      //     courseDescription: "SECOND CLASS MILITARY PERFORMANCE II",
      //     courseGrade: "B-",
      //     facultyName: "Not Available",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "MS200",
      //     courseDescription: "FUNDAMENTALS OF SMALL UNIT OPERATIONS",
      //     courseGrade: "C",
      //     facultyName: "HARGS, JOSEPH",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "PE360",
      //     courseDescription: "COMBAT APPLICATIONS",
      //     courseGrade: "B",
      //     facultyName: "LARS, TYSON",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "SE302",
      //     courseDescription: "FUNDAMENTALS OF SYSTEMS ENGINEERING",
      //     courseGrade: "C",
      //     facultyName: "LONDON, DAVID",
      //     term: 2,
      //     year: 2020,
      //   },
      //   {
      //     courseID: "SE370",
      //     courseDescription: "COMPUTER AIDED SYSTEMS ENGINEERING",
      //     courseGrade: "C+",
      //     facultyName: "WASHINGTON, GEORGE",
      //     term: 2,
      //     year: 2020,
      //   },
      // ],
    };
  },
  created() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://127.0.0.1:5000/cadets/${this.cadetID}/info`);
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
};
</script>

<style scoped></style>
