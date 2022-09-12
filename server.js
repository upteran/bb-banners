// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const path = require('path');
const fStatic = require('@fastify/static');

fastify.register(fStatic, {
  root: path.join(__dirname, 'dist/images'),
  prefix: '/images/',
  setHeaders: res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
});

fastify.register(fStatic, {
  root: path.join(__dirname, 'dist/external'),
  prefix: '/external/',
  decorateReply: false,
  setHeaders: res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
});

fastify.register(fStatic, {
  root: path.join(__dirname, 'dist/data'),
  prefix: '/data/',
  decorateReply: false,
  setHeaders: res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
});

fastify.register(fStatic, {
  root: path.join(__dirname, '/dist/assets/'),
  prefix: '/',
  index: 'bannerCreator.js',
  decorateReply: false,
  setHeaders: res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: process.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
