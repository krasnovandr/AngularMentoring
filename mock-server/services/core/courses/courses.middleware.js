const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			// sort = query.sort,
			// queryStr = query.query,
			courses = server.db.getState().courses,
			totalCount = courses.length,
			filterBy = query.courseName
		// console.log(sort);
		// console.log(queryStr);
		// if (courses.length < to) {
		// 	to = courses.length;
		// }

		if (filterBy && filterBy.length > 0) {
			courses = courses.filter(c => c.name.indexOf(filterBy) >= 0);
		}

		let from = +query.pageIndex == 1 ? 0 : +query.pageIndex;
		let start = from * +query.itemsPerPage;
		let to = start + +query.itemsPerPage;

		courses = courses.slice(start, to);
		let result = { data: courses, totalCount: totalCount }
		res.json(result);
	});

	return router;
};
