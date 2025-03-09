const express = require("express");
const mysql = require("../../connection/connection.mysql2");
const { content_data } = require("../../function/function");
const router = express.Router();

router.get("/list", (req, res) => {
  mysql.query("SELECT * FROM online_course", (err, result) => {
    if (!err) {
      res.status(200).json({ OnlineCourse: result });
    } else {
      res.status(500).json({ OnlineCourse: [] });
    }
  });
});

router.get("/search/id/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  mysql.query(
    "SELECT * FROM `online_course` WHERE `course_id`=?",
    courseId,
    (err, result) => {
      if (!err) {
        res.status(200).json({ OnlineCourse: result });
      } else {
        res.status(500).json({ OnlineCourse: [] });
      }
    }
  );
});

router.get("/promote", (req, res) => {
  const promote = true;
  mysql.query(
    "SELECT * FROM `online_course` WHERE `promote`=?",
    promote,
    (err, result) => {
      if (!err) {
        res.status(200).json({ OnlineCourse: result });
      } else {
        res.status(500).json({ OnlineCourse: [] });
      }
    }
  );
});

router.post("/create", (req, res) => {
  const content = content_data(req.body);
  mysql.execute(
    "INSERT INTO `online_course`(`course_id`, `title`, `description`, `duration`, `lecturer`, `category`, `promote`, `course_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    content,
    (err, result) => {
      if (!err) {
        res.status(200).json({ result: 1 });
      } else {
        res.status(500).json({ result: 0 });
      }
    }
  );
});

router.put("/update", (req, res) => {
  const content = content_data(req.body);
  content.push(req.body.course_id);
  mysql.execute(
    "UPDATE `online_course` SET `course_id`=?,`title`=?,`description`=?,`duration`=?,`lecturer`=?,`category`=?,`promote`=?,`course_image`=? WHERE `course_id`=?",
    content,
    (err, result) => {
      if (!err) {
        res.status(200).json({ result: 1 });
      } else {
        res.status(500).json({ result: 0 });
      }
    }
  );
});

router.delete("/delete", (req, res) => {
  const content = content_data(req.body.course_id);
  mysql.execute(
    "DELETE FROM `online_course` WHERE `course_id`=?",
    content,
    (err, result) => {
      if (!err) {
        res.status(200).json({ result: 1 });
      } else {
        res.status(500).json({ result: 0 });
      }
    }
  );
});

module.exports = router;
