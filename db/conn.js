const mongoose = require('mongoose');



mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((err) => {
    console.log(err);
})