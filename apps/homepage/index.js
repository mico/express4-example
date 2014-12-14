var express = require('express');
var debug = require("debug")("app:index");
var router = express.Router();

router.get("/", function (req, res) {
    req.mysql.query('SELECT * FROM tasks', (function (err, rows, fields) {
	    res.render("index.html", { tasks: rows });
    }));	
});

router.post('/tasks', function(req, res) {
    req.mysql.query('INSERT INTO tasks (title) VALUES(?)', req.body.task, function(err, result){
		res.redirect('/');
    });
});

router.route('/tasks/:id').delete(function(req, res, next) {
    req.mysql.query('DELETE FROM tasks WHERE id = ?', req.params.id, function(err, result){
		res.send((result.affectedRows === 1) ? { msg: '' } : { msg: 'error: ' + err });
    });
});

module.exports = router;
