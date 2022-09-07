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
  root: path.join(__dirname, '/dist/assets/'),
  prefix: '/',
  index: 'bannerCreator.js',
  decorateReply: false
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({
      host: process.env.SERVE_HOST || 'localhost',
      port: process.env.SERVE_PORT
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
