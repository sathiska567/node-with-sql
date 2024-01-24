const mysqlPool = require("../db/db")


const createStudentController = async(req,res)=>{
  try {
//    const {name,role_no,fees,medium , class} = req.body
const { name, role_no, fees,class:studentClass, medium} = req.body;

    if(!name || !role_no || !fees || !studentClass || !medium ){
        return res.status(404).send({
            success:false,
            message:"Please provide all fields"
        })
    }

    const data = await mysqlPool.query(`INSERT INTO student (name, role_no, fees, class, medium) VALUES (?, ?, ?, ? , ? )`, [name, role_no, fees,studentClass, medium]);

    res.status(200).send({
        success:true,
        message:"Student data created successfully",
        data:data[0]
    })
     
        
  } catch (error) {
        res.status(400).send({
                success:false,
                message:"Error while creating student data",
                error
        })
  }
}


const getStudentController = async(req,res)=>{
    try {
        const data = await mysqlPool.query(' SELECT * FROM student')

        if(!data){
          return res.status(404).send({
             success:false,
             message:"No data found"
          })
        }

        res.status(200).send({
                success:true,
                message:"Data fetched successfully",
                totalLength:data[0].length,
                data : data[0]
        })
        
    } catch (error) {
        res.status(400).send({
                success:false,
                message:"Error while getting student data",
                error
        })
        
    }

}


const getStudentIdController = async(req,res)=>{
   try {
     const {id} = req.body

     if(!id){
      return res.status(404).send({
        success:false,
        message:"Please provide id or invalid"
      })
     }

    // const data = await mysql.query(` SELECT * FROM student WHERE id =`+[id])
    const data = await mysqlPool.query('SELECT * FROM student WHERE id = ?', [id]);

     if(!data){
       return res.status(404).send({
         success:false,
         message:"No data found"
       })
     }

     res.status(200).send({
        success:true,
        message:"Data fetched successfully",
        data:data[0]
     })
        
   } catch (error) {
        res.status(400).send({
                success:false,
                message:"Error while getting student data",
                error
        })
   }
}


const updateStudentController = async(req,res)=>{
        try {
          const studentId = req.params.id

          if(!studentId){
              return res.status(404).send({
                success:false,
                message:"Please provide id or invalid"
              })
          }

          const {name ,role_no ,fees ,medium} = req.body

          if(!name || !role_no || !fees || !medium){
                return res.status(404).send({
                        success:false,
                        message:"Please provide all fields"
                })
          }

          const data = await mysqlPool.query(
                'UPDATE student SET name = ?, role_no = ?, fees = ?, medium = ? WHERE id = ?',
                [name, role_no, fees, medium, studentId]
              );
              
           if(!data){
             return res.status(400).send({
                success:false,
                message:"Error while updating student data"
             })
           }

           res.status(200).send({
                success:true,
                message:"Student data updated successfully",
                UpdatedData:data[0]
           })

                
        } catch (error) {
          res.status(400).send({
                success:false,
                message:"Error while updating student data",
                error
          })
        }
}


const deleteStudentController = async(req,res) =>{
        try {
          const studentId = req.params.id

          if(!studentId){
            return res.status(400).send({
                success:false,
                message:"Please provide studentId"
            })
          }

           const data = await mysqlPool.query(`DELETE FROM student WHERE id = ? `, [studentId])

           res.status(200).send({
                success:true,
                message:"Student data deleted successfully",
           })
                
        } catch (error) {
           res.status(400).send({
                success:false,
                message:"Error while deleting student data",
                error
           })  
        }
}


module.exports = {getStudentController,getStudentIdController,createStudentController,updateStudentController,deleteStudentController}