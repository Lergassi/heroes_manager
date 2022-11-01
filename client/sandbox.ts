import SandboxController from '../sandbox/SandboxController.js';

console.log('begin');
let sandboxController = new SandboxController();
sandboxController.init();
sandboxController.run();
// try {
//     sandboxController.run();
// } catch (e) {
//     console.log(e);
// }

console.log('end');