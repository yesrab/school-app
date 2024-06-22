// const express = require("express");

import express from "express";

const router = express.Router();
import {
  test,
  addAllStudents,
  addStudent,
  studentCount,
  getStudents,
  getStudentDetails,
  changeStatus,
  changeClass,
  removeStudent,
} from "../controller/students.js";
router.route("/test").get(test);
router.route("/addAllStudents").post(addAllStudents);
router.route("/addStudent").post(addStudent);
router.route("/studentCount").get(studentCount);
router.route("/allStudents").get(getStudents);
router.route("/status").patch(changeStatus);
router.route("/changeClass").patch(changeClass);
router.route("/:studentId").get(getStudentDetails);
router.route("/delete/:studentId").delete(removeStudent);
export default router;
