var express = require('express');
var fs = require('fs');
var teamService = require('../models/teamService');
var router = express.Router();

router.get('/', function(req, res) {
  var teams = teamService.allTeams();
  res.render('teams/index', { teams: teams });
});
router.get("/edit/:name",function(req,res){
	var team = teamService.getTeam(req.params.name);
	res.render("teams/edit",{team:team});
});
router.post('/', function(req, res) {
  if(req.body._method == 'put'){
  	var newTeam = {name:req.body.name,members:req.body.members}
  	console.log(newTeam);
  	teamService.editTeam(req.body._pname,newTeam);
  	delete req.body._method;
  	delete req.body._pname;
  }else{
  	teamService.addTeam(req.body);
  }
  res.redirect('/teams');
});
router.delete("/:name",function(req,res){
	teamService.deleteTeam(req.params.name);
	res.send();
});
router.get('/new', function(req, res) {
  res.render('teams/new');
});
router.get('/:name', function(req, res) {
  // search for the team name in all the teams.
  var team = teamService.getTeam(req.params.name);

  res.render('teams/show', { team: team });
});
module.exports = router;
