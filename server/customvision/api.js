const baseUrl = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en';
var fetch = require('fetch-everywhere');
const env = require('../environment/environment');

const customVisionApi = {
	analyzeUrl(image_url){
		console.log("Analysing image url " +  image_url)
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}`,{
					method: 'POST',
					body: JSON.stringify({"url": image_url}),
					headers: {
						'Content-Type': 'application/json',
						'Ocp-Apim-Subscription-Key' : `${env.OcpApimSubscriptionKey}`
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	}, 
	analyzeData(data){
		console.log("Analysing data content ")
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}`,{
					method: 'POST',
					body: data,
					headers: {
						'Content-Type': 'application/octet-stream',
						'Ocp-Apim-Subscription-Key' : `${env.OcpApimSubscriptionKey}`
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	}, 
}

module.exports = customVisionApi;