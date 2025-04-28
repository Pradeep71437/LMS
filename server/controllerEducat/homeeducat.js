const classschema = require("../models/classschema")
const { catchAsync } = require('../cmn');

const homeeducat = catchAsync(async (req, res) => {
   try {
   const { id, role } = req.user
       console.log("User role:", role);
       console.log("User ID:", id);
   
       const userRole = role.toLowerCase();
   let classes;
       
       if (userRole === 'coordinator') {
           console.log("Fetching all classrooms for coordinator");
           // Coordinators can see all classrooms
           classes = await classschema.find()
               .populate({
                   path: 'courses',
                   model: 'courses'
               });
       } else if (userRole === 'learner' || userRole === 'leaner') {
           console.log("Fetching classrooms for learner");
     classes = await classschema.find({ studentlist: id })
               .populate({
                   path: 'courses',
                   model: 'courses'
               });
   } else {
           console.log("Unauthorized role:", role);
           return res.status(403).json({ message: 'Unauthorized role' });
   }

       console.log("Found classes:", classes);
       res.status(200).json(classes);
   } catch (error) {
       console.error("Error in homeeducat:", error);
       res.status(500).json({ message: "Error fetching classrooms" });
   }
});

module.exports = homeeducat