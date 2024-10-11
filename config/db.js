const mongoose=require('mongoose')

const mongourl=process.env.MONGODB_URL
const db = mongoose.connect(mongourl)
.then(() => {
    console.log('DB connected successfully');
})
.catch((error) => {
    console.log('DB connection error:', error);
});

module.exports=db