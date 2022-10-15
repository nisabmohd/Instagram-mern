exports.handleErr = (err, req, res, next) => {
  res.status(500);
  res.send({message:err.message});
};
