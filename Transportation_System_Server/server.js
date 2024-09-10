const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/user-route');
const TansportationRequestRoutes = require('./routes/tansportation-request-routes');
const BidRequestRoutes = require('./routes/bid-request-routes');

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/TransportationSystemNew")
    .then(() => console.log("MongoDB Connected!!!"))
    .catch(err => console.log(err));

app.use('/user/', UserRoutes);
app.use('/transportation-request/', TansportationRequestRoutes);
app.use('/bid-request/', BidRequestRoutes);
const PORT = 4001;

app.listen(PORT, () => console.log("Server is listening at port 4001"));