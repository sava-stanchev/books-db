export default (validator) => (req, res, next) => {
    Object.keys(req.body).forEach(key => {
        if (!validator[key]) {
            delete req.body[key];
        }
    });
  
    next();
};
  