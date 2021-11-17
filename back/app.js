const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {MONGO_URL, PORT} = require('./configs/main-config');
const userRouter = require('./routers/user.router');

const app = express();
mongoose.connect(MONGO_URL);

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 'GENERIC_ERROR')
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
