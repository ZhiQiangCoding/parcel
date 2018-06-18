require('v8-compile-cache');
const Pipeline = require('./Pipeline');

let pipeline;
let child;

function setChildReference(childReference) {
  child = childReference;
}

function init(options) {
  pipeline = new Pipeline(options || {});
  Object.assign(process.env, {
    PARCEL_WORKER_TYPE: child ? 'remote-worker' : 'local-worker'
  });
  process.env.HMR_PORT = options.hmrPort;
  process.env.HMR_HOSTNAME = options.hmrHostname;
}

async function run(path, id, isWarmUp) {
  try {
    return await pipeline.process(path, id, isWarmUp);
  } catch (e) {
    e.fileName = path;
    throw e;
  }
}

exports.init = init;
exports.run = run;
exports.setChildReference = setChildReference;
