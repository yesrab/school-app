// const express = require("express");

import express from "express";

const router = express.Router();

import {
  test,
  addTeacher,
  addAllTeachers,
  findByKYC,
  teacherCount,
  allTeachers,
} from "../controller/teachers.js";

router.route("/test").get(test).post(findByKYC);
router.route("/addTeacher").post(addTeacher);
router.route("/addAllTeachers").post(addAllTeachers);
router.route("/count").get(teacherCount);
router.route("/allTeachers").get(allTeachers);
export default router;


