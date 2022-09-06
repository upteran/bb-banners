// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs');
const fStatic = require('@fastify/static');


fastify.register(fStatic, {
  root: path.join(__dirname, 'dist/images'),
  prefix: '/images/', // optional: default '/'
})

// Declare a route
fastify.get('/', async (request, reply) => {
  try {
    const filePath = path.resolve(__dirname, 'dist/assets/bannerCreator.js');
    const stream = fs.createReadStream(filePath);
    reply.send(stream).type('application/js').code(200);
  } catch (e) {
    console.error(e);
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 8090 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
