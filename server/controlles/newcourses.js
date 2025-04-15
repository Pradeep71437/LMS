const newcoursesschema = require("../models/newcoursesschema")
const { catchAsync } = require('../cmn');

const newcorses = catchAsync(async (req, res) => {
    const { title, description, language, creater, duration, subject, numberOfSlides, slides } = req.body
    console.log("Creating course with data:", req.body)
    const { id } = req.user

    if (!title || !description || !creater || !subject) {
        return res.status(400).send("Required fields: title, description, creator, and subject")
    }

    try {
        const course = await newcoursesschema.create({
            user: id,
            title,
            subject,
            description,
            language,
            creater,
            duration,
            numberOfSlides: numberOfSlides || 0,
            slides: slides || []
        });

        res.status(200).json({
            message: "Course created successfully",
            courseId: course._id
        });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).send("Error creating course");
    }
});

module.exports = newcorses