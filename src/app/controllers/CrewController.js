const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Crew = require("../models/Crews");
class CrewController {
    index(req, res, next) {}
        //add group
    addCrew(req, res, next) {
        let crew_name = req.body.crew_name;
        let admin = req.cookies.username;
        let crew_title = req.body.crew_title || "";
        let avatar = req.file.path.split("\\").slice(3).join();
        console.log(req.body);
        console.log(admin);
        console.log(avatar);
        db.execute(
            Crew.save(crew_name, admin, crew_title, avatar),
            (err, result) => {
                res.redirect("back");
            }
        );
    }
    deleteCrew(req, res, next) {
        let crew_name = req.params.crew_name;
        db.execute(Crew.delete(crew_name), (err, result) => {
            res.redirect("back");
        });
    }
}
module.exports = new CrewController();