var jwt = require('jsonwebtoken');

const jwt_Secret = "HassaisGoodBy";

const fetchUser = (req, res, next) => {
    //Get User from jwt token from id 
    const Token = req.header('auth-token')
    if (!Token) {
        return res.status(401).json({ erroer: "use Authenticate valid creadential" })
    }
    try {
        const data = jwt.verify(Token, jwt_Secret);
        req.user = data.user;
        next()

    } catch (error) {
        console.log(error)
    }
};

module.exports = fetchUser