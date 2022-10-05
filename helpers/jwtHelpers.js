import  Jwt  from "jsonwebtoken";

function removeBearerFromToken(token){
    return (token.split(' ')[1]);
}

function getTokenFromRequest(req){
    const bearerToken = req.headers.authorization;
    return removeBearerFromToken(bearerToken);
}

async function validateBearerToken(token){
    return await Jwt.verify(JSON.parse(removeBearerFromToken(token)),process.env.JWTSECRATE);
}

async function decodeBearerToken(token){
    return await Jwt.decode(token);
}

export {removeBearerFromToken,getTokenFromRequest,validateBearerToken,decodeBearerToken};