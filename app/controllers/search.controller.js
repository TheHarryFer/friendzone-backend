const Search = require("../models/search.model.js");

function getTimeStamp() {
  return new Date().getTime();
}

exports.getSearchCount = (req, res) => {
  Search.getSearchCount({keyword: req.params.keyword, user_id: req.params.user_id},(err, result) => {
    console.log(`'${req.params.keyword}%'`)
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getSearchUser = (req, res) => {
  Search.getSearchUser({keyword: req.params.keyword, user_id: req.params.user_id}, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};

exports.getSearchEvent = (req, res) => {
  Search.getSearchEvent(req.params.keyword, (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    else return res.status(200).send(result);
  });
};
