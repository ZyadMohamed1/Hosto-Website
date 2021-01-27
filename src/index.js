const express = require('express');
const userRouter = require('./controllers/userController');
const doctorRouter = require('./controllers/doctorController');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(doctorRouter);

async function main() {

    try {

        // 404 handler
        app.use((req, res, next) => {
            res.status(404).json({
                status: 404,
                message: "Page not found!"
            });
        });

        // error handler
        app.use(((err, req, res, next) => {
            if (err.status < 500) {
                res.status(err.status).json({
                    status: err.status,
                    message: err.message
                });
            }
            else {
                res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }

        }));


        app.listen(port, () => {
            console.log(`running on ${port}`);
        });

    } catch (error) {
        console.log(`Error! ${error}`);
    }
};

main();
