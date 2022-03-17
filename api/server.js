const {app} = require('./app')

//utils
const { sequelize } = require('./utils/database');

sequelize
   .authenticate()
   .then(() => console.log('database authenticated'))
   .catch((err) => console.log(err));

sequelize
   .sync()
   .then(() => console.log('Data Base Synced'))
   .catch((err) => console.log(err));
   
app.listen(4000, () => {
   console.log('app server running');
});
