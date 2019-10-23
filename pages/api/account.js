import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    if (!("authorization" in req.headers)){//if the authorization object does not exist in the req.headers
        return res.status(401).send(`No authorization token.`);

    } else {
        try {
            const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            const userData = await User.findOne({ _id: userId});
            if (user) {
                return res.status(200).json(userData);
            } else {
                return res.status(404).send(`User not found.`);                
            }
        } catch (error) {
            console.error(error);
            return res.status(403).send(`Invalid token.`);  
        }
    }
}
