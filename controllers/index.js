exports.showIndex = (req, res) => {

	// res.send('index');
	res.render('index.html', {
		session: req.session.user
	});

}