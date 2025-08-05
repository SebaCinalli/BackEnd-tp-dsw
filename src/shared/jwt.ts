import jwt from 'jsonwebtoken';


const createToken = async (payload: any) =>{
    const TOKEN_SECRET = process.env.TOKEN_SECRET
    if(!TOKEN_SECRET){
        throw new Error ("TOKEN_SECRET is not defined in env")
    }
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {expiresIn: '2h'},
            (err, token) =>{
                if (err) reject (err);
                resolve(token);
            }
        )
    }
)}

export {createToken}