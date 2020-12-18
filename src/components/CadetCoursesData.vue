<template>
  <v-data-table :headers="cadetCoursesTakenHeaders" :items="cadetData">
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
      ],
      cadetData: [],
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
