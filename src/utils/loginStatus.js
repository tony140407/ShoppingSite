function signIn(router) {
  router.push({
    path: '/',
  });
}
function logOut(router) {
  router.push({
    path: '/login',
  });
}

export default {
  signIn,
  logOut,
};
