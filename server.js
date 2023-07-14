const db = require('./config/DBConnection');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.log(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
