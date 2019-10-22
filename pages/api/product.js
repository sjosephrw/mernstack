import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();//************ */just execute it like this to connect to db

export default async (req, res) => {
    console.log(req.query._id);
    switch (req.method){
        case "GET": 
        await handleGetRequest(req, res);
        break;
        case "POST":
        await handlePostRequest(req, res);
        break;
        case "DELETE":
        console.log(req.query._id);
        await handleDeleteRequest(req, res);
        break;
        default:
        res.status(405).send(`Request method ${req.method} not allowed`);//if none of the above http req. methods were specified then display 405
        break;
    }
}

async function handleGetRequest(req, res){
    // res.status(200).send('some string value');//to send back a string response. 
    try {
        const { _id } = req.query;
        //const product = await Product.findOne({ _id: _id });// - { _id: _id } also valid
        const product = await Product.findOne({ _id });//*** */does n't actually return a promie to get a promise - Product.find.exec()
        res.status(200).json({
            product
        });        
    } catch (error) {
        console.log(error);
    }   

}

async function handleDeleteRequest(req, res){
    // res.status(200).send('some string value');//to send back a string response.
    // console.log(req.query);    
    //const { _id } = req.query;//not working
    //console.log(_id);
    try {
        // console.log(req.query.url);
        const { _id } = req.query;
        console.log(_id);
        console.log('-------------');
        
        //const product = await Product.findOne({ _id: _id });// - { _id: _id } also valid
        await Product.findOneAndDelete({ _id });//*** */does n't actually return a promie to get a promise - Product.find.exec()
    
        res.status(204).json({});        
    } catch (error) {
        console.log(error);
    }

}


async function handlePostRequest(req, res){
    try {
        const {name, price, description, mediaUrl} = req.body;

        if (!name || !price || !description || !mediaUrl){
            return res.status(422).send(`Please fill in all fields.`)
        }

        const product = await new Product({name, price, description, mediaUrl}).save();//*** */does n't actually return a promie to get a promise - Product.find.exec()    
        res.status(201).json(product);

    } catch (error) {
        console.log(error);
    }

}