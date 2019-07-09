var express = require('express');
var router = express.Router();
var url = require('url');
var dataservice = require('../modules/crimedataservice');
var Crime = require('../model/crime');

router.get('/:id', function(request, response){
  console.log(request.url + ' querying for ' + request.params.id);
  dataservice.findById(Crime, request.params.id, response);
})

/* GET crimes listing. */
router.get('/', function(req, res, next) {
    var getParams = url.parse(req.url, true).query;
    if(Object.keys(getParams).length == 0){
        dataservice.list(Crime, res);
    }else{
        var key = Object.keys(getParams)[0];
        var value = getParams[key];
        JSON.stringify(dataservice.query_by_args(Crime, key, value, res));

    }
    //dataservice.list(Contact, res);
});

router.post('/', function(req, res){
	console.log("Router post");
    dataservice.create(Crime, req.body, res);
});

router.put('/', function(req, res){
	console.log("Router put");
	dataservice.update(Crime, req.body, res);
});

router.delete('/:id', function(req, res){
  dataservice.remove(Crime, request.params.id, response);
});

module.exports = router;
