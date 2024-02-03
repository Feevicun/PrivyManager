const mongoose = require('mongoose');

async function connectWithRetry() {
	const mongoURI = 'mongodb+srv://osobaviktoria29:Feevicun29@cluster0.l4ekvsg.mongodb.net/';

	try {
			await mongoose.connect(mongoURI, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
			});
			console.log('Connected to MongoDB');
	} catch (err) {
			console.error('Error connecting to MongoDB:', err.message);
			setTimeout(connectWithRetry, 5000);
	}
}

connectWithRetry();