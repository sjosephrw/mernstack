// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();//************ */just execute it like this to connect to db

export default async (req, res, next) => {
    // console.log(req);
    // console.log(req.method);//useful to filter out methods that are not valid
    // res.status(200).send('some string value');//to send back a string response.
    const products = await Product.find();//*** */does n't actually return a promie to get a promise - Product.find.exec()

    res.status(200).json({
        products
    });
}