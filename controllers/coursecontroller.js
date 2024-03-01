const {default:mongoose}=require('mongoose');
const Course = require ('../Models/coursemodel');

const addCourse = async (req, res) => {
    const { name, duration } = req.body;
    try {
        const course = await Course.create({ name, duration });
        res.status(201).send({ message: "Course added." })
    } catch (error) {
        res.status(500).send({ message: 'error occured', error: error });
    }
}

const getCourse = async (req, res) =>{
    try {
        const course = await Course.find({});
        res.status(200).send({ course: course})
    } catch (error) {
        res.status(404).send({ message:'not found'})
    }
}

const getSingleCourse = async (req,res) =>{
    const {id} = req.params;
    const course = await Course.findById(id)
    if (!course) {
        res.status(404).send({ message:'user not found'})
        return
    }
    res.status(200).send({ course:course})
}

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: 'no such course' })
        return
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        res.status(404).send({ message: 'Course not found' })
        return
    }
    res.status(202).send({ message: 'Course deleted' });

}
const updateCourse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: 'no such Course' })
        return
    }
    const course = await Course.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    )
    if (!course) {
        res.send({ error: 'no course found' })
        return
    }
    res.send({ message: 'course updated', course: course })

}

module.exports = { addCourse, getCourse, getSingleCourse, deleteCourse, updateCourse}