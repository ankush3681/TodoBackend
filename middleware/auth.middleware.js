const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{

    const token = req.headers.authorization;
    if(token){
        jwt.verify(token.split(" ")[1], 'todoApp', (err, decoded)=> {
            if(err) throw err;
            req.body.creator=decoded.creator;
            req.body.creatorID=decoded.creatorID;
            next();
          });
    }else{
        res.status(400).send({"err":"Please provide token"});
    }
}

module.exports={
    auth
}