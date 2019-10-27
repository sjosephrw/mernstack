import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {

    console.log(req);
    console.log(req.query._id);

    try {
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      const orders = await Order.find({ _id: req.query._id, user: userId })
        .populate({
          path: "products.product",
          model: Product
        });
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(403).send("Please login again");
    }
  };