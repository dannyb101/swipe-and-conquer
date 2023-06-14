import express, {Request, Response}  from 'express';
import path from 'path';

const app = express();

const updateRecEngine = (timeSpent: Number, article: string, user: string): void => {
	// update recommendation engine
}

const chatgpt = (prompt: string): string => {
	return "This is a summary of the article";
}

const getSummary = (article: string):any => {
	// query chatgpt for summary
	let prompt = "Summarize this article: " + article;
	let summary = chatgpt(prompt);
	return summary;
};

const getArticles = (numRequired: Number, user: String): any => {
	// query DPA for articles
	// return article uuids
	return [];
}

interface Summary {
	image: any;
	headline: string;
	summary: string;
}

app.get('/', (req: Request, res: Response) => {
	// user hits this base endpoint and gets directed to the first page
	// we send the initial article summaries, images and headlines
	// how many articles do we send?

	// let user = req.body.user;
	let user = "user1";
	let articles = getArticles(5, user);
	let summaries: Summary[] = [];

	for (let article of articles) {
		summaries.push(getSummary(article));
	}

	// res.send(articles);
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/swipe', (req:Request, res: Response) => {
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