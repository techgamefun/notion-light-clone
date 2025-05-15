const {RegisterSchema}= require("../middleware/schemaValidater");

module.exports = (req,res,next)=>{
    const {error} = RegisterSchema.validate(req.body);
    console
    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}