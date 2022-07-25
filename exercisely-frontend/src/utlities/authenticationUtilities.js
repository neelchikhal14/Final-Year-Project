import jwt from 'jsonwebtoken';

export const checkAuthorization = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
};
