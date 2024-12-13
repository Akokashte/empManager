import dotenv from 'dotenv';
import ConnectDb from './db/index.js';
import { app } from './app.js';

dotenv.config(
    {
        path: "../.env"
    }
)

ConnectDb().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, (req, res) => {
        console.log(`listening at port ${port}`)
    })
})
    .catch((err) => {
        console.log(`mongodb connection failed : ${err}`)
    })


app.get('/', (req, res) => {
    res.json({
        message: "connected"
    });
});