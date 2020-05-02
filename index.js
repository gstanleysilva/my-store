const express = require('express');
require('./src/db/mongoose');
const userRouter = require('./src/routers/user_router');
const productRouter = require('./src/routers/product_router');
const postRouter = require('./src/routers/post_router');

//PORT
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json())

//Routers
app.use(userRouter);
app.use(productRouter);
app.use(postRouter);

app.listen(port);