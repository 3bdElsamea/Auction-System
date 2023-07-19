const {sequelize:db} = require('./db/models/index');
const app = require('./app');
const port = process.env.PORT || 3000;

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).catch((err) => {
    console.log(err);
});


