const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const processes = new Map(); // Stores running processes.

const startProcess = (name, script) => {
    const logPath = path.join(__dirname, `../logs/${name}.log`);
    const logFile = fs.createWriteStream(logPath, { flags: 'a' });
  
    const processInstance = spawn('node', [script], {
      stdio: ['inherit', logFile, logFile],
      detached: true,
    });
  
    processes.set(processInstance.pid, { name, script, pid: processInstance.pid, logPath });
  
    console.log(`Started process '${name}' (PID: ${processInstance.pid})`);
  };

const stopProcess = (pid) => {
  const processInfo = processes.get(pid);

  if (!processInfo) {
    console.log(`No process found with PID ${pid}`);
    return;
  }

  try {
    process.kill(pid);
    processes.delete(pid);
    console.log(`Stopped process '${processInfo.name}' (PID: ${pid})`);
  } catch (err) {
    console.error(`Failed to stop process with PID ${pid}: ${err.message}`);
  }
};

const listProcesses = () => {
  if (processes.size === 0) {
    console.log('No running processes.');
    return;
  }

  console.log('Running processes:');
  processes.forEach((processInfo) => {
    console.log(`- ${processInfo.name} (PID: ${processInfo.pid}, Script: ${processInfo.script})`);
  });
};

module.exports = {
  startProcess,
  stopProcess,
  listProcesses,
};
