const express = require("express");
const { check, validationResult } = require("express-validator");
const { async } = require("regenerator-runtime");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const router = express.Router();


const listValidators = [
  check("listName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide List Name")
    .isLength({ max: 50 })
    .withMessage("List Name must not be more than 50 characters long"),
];

router.post(
  "/lists/new",
  requireAuth,
  csrfProtection,
  listValidators,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    console.log(userId);
    const { listName } = req.body;


  if (listName) {
    const newList = await db.List.create({ listName, userId });
    // await newList.save()


    if (!validatorErrors.isEmpty()) {
      const list = await db.List.create({
        listName,
        userId: userId,
      });
      // console.log("we're here")
      return res.redirect("/");
    } else if (validatorErrors.isEmpty()) {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.redirect("/", {
        title: "List",
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/lists/:id",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    // console.log(id)
    const { userId } = req.session.auth;
    const tasks = await db.Task.findAll({
      where: {
        listId: id,
      },
    });
    // console.log(tasks)
    const lists = await db.List.findAll({ where: { userId } });
    const selectedList = await db.List.findByPk(id);
    res.render("homepage", {
      title: "Dashboard",
      lists,
      tasks,
      listHeader: selectedList.listName,
      csrfToken: req.csrfToken(),
    });
  })
);

const taskValidators = [
  check("taskName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide Task Description")
    .isLength({ max: 150 })
    .withMessage("Task description must not be more than 150 characters long"),
];

router.post(
  "/tasks/new",
  requireAuth,
  csrfProtection,
  taskValidators,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { taskName, timeEstimate, list } = req.body;
    // console.log(req.body)

    const validatorErrors = validationResult(req);


    if (taskName) {
      // console.log(listObject)

      const listId = listObject.id;


      const task = await db.Task.create({
        taskName,
        taskTime: timeEstimate,
        userId: userId,
        listId: listId,
      });
      // console.log("we're here")

      return res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.redirect("/", {
        title: "List",
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);


module.exports = router;
