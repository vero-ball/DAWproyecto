const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('🔐 Authorization header:', authHeader);

  const loginToken = authHeader?.split(' ')[1];
  if (!loginToken) {
    console.log('❌ Token non proporcionado');
    return res.status(401).json({ msg: 'Non autorizado' });
  }

  try {
    const decoded = jwt.verify(loginToken, process.env.JWT_SECRET || 'secreto');
    req.user = decoded;
    console.log('✅ Token válido, usuario:', decoded);
    next();
  } catch (error) {
    console.log('❌ Token non válido:', error.message);
    res.status(401).json({ msg: 'Token non válido' });
  }
};