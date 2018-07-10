const env = require('./environment/environment');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function connect(){

	return mongoose.connect(`mongodb://${env.dbHost}.documents.azure.com:${env.port}/${env.dbName}?ssl=true`, {
    auth: {
      user: `${env.dbUser}`,
      password: `${env.dbPass}`
    }
  })
  .then(resp => {

		console.log('connection successful')
		//console.log(resp.connections)
		return resp;
  }) 
  .catch((err) => console.error(err));
}

module.exports = {

	connect

}

