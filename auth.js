const jwt = require('jsonwebtoken');
const JWT_SECRET = "ajayisthedon";


async function auth(req,res,next){ //auth middleware
    const token = req.headers.token;

    const decodedData = jwt.verify(token,JWT_SECRET);

    if(decodedData){
        req.uderId= decodedData.Id;
        next();
    }
    else{
        res.status(403).json({
            message : "Incorrect credentials!"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}