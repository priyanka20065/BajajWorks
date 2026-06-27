const express = require("express");

const router = express.Router();

const buildHierarchy = require("../utils/hierarchy");

router.post("/", (req, res) => {

    try {

        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                error: "data must be an array"
            });
        }

        const result = buildHierarchy(data);

        res.json({

            user_id: "priyanka_120302006",

            email_id: "priyanka2499.be23@chitkara.edu.in",

            college_roll_number: "",

            hierarchies: result.hierarchies,

            invalid_entries: result.invalid_entries,

            duplicate_edges: result.duplicate_edges,

            summary: result.summary

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;