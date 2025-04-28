const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');

const classroomlean = catchAsync(async (req, res) => {
    try {
        const { id, role } = req.user;
        console.log("User role:", role);
        console.log("User ID:", id);
        
        let classrooms;
        
        // Convert role to lowercase for case-insensitive comparison
        const userRole = role.toLowerCase();
        
        if (userRole === 'learner' || userRole === 'leaner') {
            // For learners, find classrooms where they are in studentlist
            console.log("Fetching classrooms for learner");
            classrooms = await classschema.find({ studentlist: id })
                .populate({
                    path: 'courses',
                    model: 'courses'
                });
        } else if (userRole === 'coordinator') {
            // For coordinators, find all classrooms
            console.log("Fetching all classrooms for coordinator");
            classrooms = await classschema.find()
                .populate({
                    path: 'courses',
                    model: 'courses'
                });
    } else {
            console.log("Unauthorized role:", role);
            return res.status(403).json({ message: "Unauthorized access" });
        }

        console.log("Found classrooms:", classrooms);

        if (!classrooms || classrooms.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(classrooms);
    } catch (error) {
        console.error("Error fetching classrooms:", error);
        res.status(500).json({ message: "Error fetching classrooms" });
    }
});

module.exports = classroomlean