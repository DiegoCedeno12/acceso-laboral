export function generateId() {
  const timestamp = new Date().getTime().toString(16);
  const uniqueId = Math.random().toString(16).substr(2, 4);
  const identifier = Math.random().toString(16).substr(2, 2);

  return `${timestamp}${uniqueId}${identifier}`.substr(0, 14);
}

export function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/auth/sign-in');
}