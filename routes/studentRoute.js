const express = require('express');
const { getStudentController,getStudentIdController,createStudentController,updateStudentController,deleteStudentController} = require('../controller/studentController');

const router = express.Router();

// CREATE STUDENT RECORD || POST
router.post("/createStudent",createStudentController)


// GET ALL STUDENT LIST || GET
router.get("/getAllList",getStudentController)


// GET STUDENT BY ID || POST
router.post("/getStudentById",getStudentIdController)


// UPDATE STUDENT || PUT
router.put("/updateStudent/:id",updateStudentController)


// DELETE STUDENT || DELETE
router.delete("/deleteStudent/:id",deleteStudentController)





module.exports = router;