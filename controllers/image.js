const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}


const handleImageSubmit = (req, res, db) => {
	const { id } = req.body;
	db
	.select('*')
	.from('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		if (entries.length) {
			res.json(entries[0]);
		} else {
			res.status(400).json('error getting user')
		}
	})
	.catch(err => res.status(400).json('error going to db'))
}

module.exports = {
	handleImageSubmit,
	handleApiCall
};