// const express = require("express");

import express from "express";
const router = express.Router();

import {
  chipsData,
  totalGenderRatio,
  getEnrollmentStatus,
} from "../controller/analytics.js";

router.route("/chipsData").get(chipsData);
router.route("/gender").get(totalGenderRatio);
router.route("/studentStatus").get(getEnrollmentStatus);

export default router;
