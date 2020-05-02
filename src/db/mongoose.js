const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/my-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //Create tables' indexes for fast reading
    useCreateIndex: true,
    useFindAndModify: false
});