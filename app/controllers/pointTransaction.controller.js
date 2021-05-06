const PointTransaction = require("../models/pointTransaction.model.js");

exports.getPoint = (req, res) => {
  PointTransaction.getPoint(req.params.user_id, (err, point) => {
    if (err) return res.status(500).send({ message: err.message });
    if (point) return res.status(200).send(point);
  });
};