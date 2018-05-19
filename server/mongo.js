const env = require('./environment/environment');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUrl = 'mongodb://preventiondb:qz9uH5rIle2JJNb7g5Q4jCAoO3A5LeLPAxeRzdRDd31S5eJtDiky5IZ393W7MfVpdwlorlm35q7eQZd5GU6IXw==@preventiondb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'

function connect(){

	return mongoose.connect(`mongodb://${env.dbName}.documents.azure.com:${env.port}/${env.dbName}?ssl=true`, {
    auth: {
      user: `${env.dbName}`,
      password: `${env.key}`
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
}

module.exports = {

	connect

}

