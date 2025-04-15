const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');

const classroomget = catchAsync(async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send("No classroom ID provided");
        }

        const classroom = await classschema.findById(req.params.id)
            .populate({
                path: 'courses',
                model: 'courses' // Updated to match the actual model name
            });

        if (!classroom) {
            return res.status(404).send("Classroom not found");
        }

        console.log("Found classroom:", classroom);
        res.status(200).json(classroom);
    } catch (error) {
        console.error("Error fetching classroom:", error);
        res.status(500).send("Error fetching classroom data");
    }
});

module.exports = classroomget;