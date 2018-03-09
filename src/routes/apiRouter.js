const Router = require("express").Router;
const Week = require("../models/Week.js");
const Student = require("../models/Student.js");
const Days = require("../models/Days.js");

const apiRouter = Router();

function daysIndex(req, res) {
  Days.query()
    .then(data => {
      return res.json(data);
    })
    .catch(e => {
      res.send("Error: ", e).status(500);
    });
}

function singleDay(req, res) {
  Days.query()
    .findById(req.params.id)
    .then(data => {
      return res.json(data).status(200);
    })
    .catch(e => {
      res.send("Error: ", e).status(500);
    });
}

function createDay(req, res) {
  Days.query()
    .insert(req.body)
    .then(newRecord => {
      return res.json(newRecord).status(200);
    })
    .catch(err => res.send(err).status(500));
}

function updateDay(req, res) {
  Days.query()
    .updateAndFetchById(req.params.id, req.body)
    .then(updated => {
      return res.json(updated).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
}

function deleteDay(req, res) {
  Days.query()
    .deleteById(req.params.id)
    .then(data => {
      return res.json({ rowsDeleted: data }).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
}

function weekIndex(req, res) {
  Week.query()
    .eager("days")
    .then(data => {
      return res.json(data);
    })
    .catch(e => {
      res.send("Error: ", e).status(500);
    });
}

function weekSingle(req, res) {
  Week.query()
    .findById(req.params.id)
    .eager("days")
    .then(data => {
      return res.json(data).status(200);
    })
    .catch(e => {
      res.send("Error: ", e).status(500);
    });
}

function createWeek(req, res) {
  Week.query()
    .insert(req.body)
    .then(newRecord => {
      return res.json(newRecord).status(200);
    })
    .catch(err => res.send(err).status(500));
}

function updateWeek(req, res) {
  Week.query()
    .updateAndFetchById(req.params.id, req.body)
    .then(updated => {
      return res.json(updated).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
}

function deleteWeek(req, res) {
  Week.query()
    .where("id", req.params.id)
    .first()
    .returning("*")
    .then(recordToDelete => {
      return recordToDelete
        .$relatedQuery("weeks")
        .delete()
        .where("studentId", recordToDelete.id)
        .returning("*")
        .then(data => {
          console.log("deleting records:", data);
          return recordToDelete;
        })
        .catch(err => {
          // console.log(err)
          return res.send(err).status(500);
        });
    })
    .then(d => {
      return Week.query()
        .deleteById(d.id)
        .then(() => {
          return d;
        });
    })
    .then(d => res.json(d).status(200))
    .catch(err => {
      return res.send(err).status(500);
    });
}

function studentsIndex(req, res) {
  Student.query()
    .eager("[weeks, weeks.days]")
    .then(data => {
      console.log(req.params);
      return res.json(data);
    });
}

function createStudent(req, res) {
  Student.query()
    .insert(req.body)
    .then(newRecord => {
      return res.json(newRecord).status(200);
    })
    .catch(err => res.send(err).status(500));
}

function singleStudent(req, res) {
  Student.query()
    .findById(req.params.id)
    .eager("[weeks, weeks.days]")
    .then(data => {
      return res.json(data).status(200);
    })
    .catch(e => {
      res.send("Error: ", e).status(500);
    });
}

function updateStudent(req, res) {
  Student.query()
    .updateAndFetchById(req.params.id, req.body)
    .then(updated => {
      return res.json(updated).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
}

function studentsDelete(req, res) {
  Student.query()
    .where("id", req.params.id)
    .first()
    .returning("*")
    .then(recordToDelete => {
      return recordToDelete
        .$relatedQuery("weeks")
        .delete()
        .where("studentId", recordToDelete.id)
        .returning("*")
        .then(data => {
          console.log("deleting records:", data);
          return recordToDelete;
        })
        .catch(err => {
          // console.log(err)
          return res.send(err).status(500);
        });
    })
    .then(d => {
      return Student.query()
        .deleteById(d.id)
        .then(() => {
          return d;
        });
    })
    .then(d => res.json(d).status(200))
    .catch(err => {
      return res.send(err).status(500);
    });
}

apiRouter
  .get("/days", daysIndex)
  .get("/days/:id", singleDay)
  .post("/days", createDay)
  .put("/days/:id", updateDay)
  .delete("/days/:id", deleteDay);

apiRouter
  .get("/weeks", weekIndex)
  .get("/weeks/:id", weekSingle)
  .post("/weeks", createWeek)
  .put("/weeks/:id", updateWeek)
  .delete("/weeks/:id", deleteWeek);

apiRouter
  .get("/students", studentsIndex)
  .get("/students/:id", singleStudent)
  .post("/students", createStudent)
  .put("/students/:id", updateStudent)
  .delete("/students/:id", studentsDelete);

module.exports = apiRouter;
