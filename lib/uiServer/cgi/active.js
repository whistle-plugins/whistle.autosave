module.exports = (ctx) => {
  const { localStorage } = ctx.req;
  const active = ctx.request.body.active === '1';
  localStorage.setProperty('active', active);
  ctx.body = { ec: 0, active };
};
