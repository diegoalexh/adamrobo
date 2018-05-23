const baseUrl = '/api';
const restler = require('restler');
const heroesAPI={
	get(){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/patients`)
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
		
	}, 
	create(patient){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/patient`,{
					method: 'POST',
					body: JSON.stringify(patient),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});


	},
	update(patient){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/patient`,{
					method: 'PUT',
					body: JSON.stringify(patient),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	},
	destroy(patient){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/patient/${patient._id}`,{
					method: 'DELETE'
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});
	},

	storeImage(patient){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/images`,{
					method: 'POST',
					body: JSON.stringify({ "image" : patient.image}),
					headers: {
						'Content-Type': 'application/json'
					}
			})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});


	},
	storeBlob(patient){
		return new Promise((resolve,reject)=> {
		const data = new FormData();
		data.append('file', patient.imageblob);
		fetch(`${baseUrl}/upload`, {
        	method: 'POST',
        	body: data,
    	})
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});

	},
	sendFormAnalysis(patient){
		return new Promise((resolve,reject)=> {
			fetch(`${baseUrl}/analyze/image/${patient.image_ref}`)
			.then(result => result.json())
			.then(json=>{resolve(json)})
			.catch(err=> {reject(err)});
		});


	},

	
}

export default heroesAPI