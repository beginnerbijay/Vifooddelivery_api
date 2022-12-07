const jwt = require('jsonwebtoken')

const auth = async( req, res ,next)=>{
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).send("no token")
    }

    try{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,docoded)=>{
            if(err){
                return res.status(401).json({ msg: 'Token is not valid' });
            }else{
                req.id = docoded._id
            }
        })
    }catch(e){
        console.log(e)
        res.status(500).json({ msg: 'Server Error' });
    }
    next()
}

module.exports = auth