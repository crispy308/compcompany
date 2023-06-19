import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    const decodedToken = jwt.decode(token, 'secretkey');

    if (decodedToken) {
      req.userId = decodedToken._id;
      next();
    } else {
      res.status(403).json({
        msg: 'Нет доступа',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Нет доступа',
    });
  }
};
