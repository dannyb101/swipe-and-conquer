import express from 'express';

const app = express();

const updateRecEngine = (timeSpent: Number, article: String, user: String): void => {
	// update recommendation engine
}

const getSummary = (article: string) => {
	// query chatgpt for summary
	let prompt = "Summarize this article: " + article;
	let summary = chatgpt(prompt);
	return summary;
};

const getArticles = (numRequired: Number, user: String): String => {
	// query DPA for articles
	// return article uuids
	return "";
}

interface Summary {
	image: ImageBitmap;
	headline: string;
	summary: string;
}

app.get('/', (req, res) => {
	// user hits this base endpoint and gets directed to the first page
	// we send the initial article summaries, images and headlines
	// how many articles do we send?
	let user = req.body.user;
	let articles = getArticles(5, user);
	let summaries: Summary[] = [];

	for (let article of articles) {
		summaries.push(getSummary(article));
	}

	res.send(articles);
});

app.get('/swipe', (req, res) => {
	// on swipe this endpoint is called from an ajax post request
	// this sends data about the length of time the user has spent on that article
	// this data is used to update the recommendation engine
	// the recommendation engine then sends back the next article summaries, images and headlines
	let timeSpent = req.body.timeSpent;
	let lastRead = req.body.lastRead;
	let user = req.body.user;

	updateRecEngine(timeSpent, lastRead, user);
	let nextArticle = getArticles(1, user);

	res.send(nextArticle);
});

app.listen(3000, () => {
	console.log('server started');
});