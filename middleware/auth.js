import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decode = jwt.verify(token, config.get('jwt'));
    req.user = decode.id;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};
