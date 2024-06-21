// const express = require("express");

import express from "express";

const router = express.Router();
import {
  test,
  addAllStudents,
  addStudent,
  studentCount,
  getStudents,
} from "../controller/students.js";
router.route("/test").get(test);
router.route("/addAllStudents").post(addAllStudents);
router.route("/addStudent").post(addStudent);
router.route("/studentCount").get(studentCount);
router.route("/allStudents").get(getStudents);
export default router;
