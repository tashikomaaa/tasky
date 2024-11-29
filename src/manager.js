const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const processes = new Map(); // Stores running processes.

const startProcess = (name, script) => {
    const logPath = path.join(__dirname, `../logs/${name}.log`);
    let logFile = fs.openSync(logPath, 'a');
    // fs.exists(logPath, function (exists) {
    //     if (exists) {
    //         logFile = fs.openSync(logPath, 'a'); // File descriptor
    //     } else {
    //         fs.writeFile(logPath, `========== ${name} LOGS ===============`, { flag: 'wx' }, function (err) {
    //             if (err) throw err;
    //             console.log("It's saved!");
    //         });
    //         logFile = fs.openSync(logPath, 'a');
    //     }
    // })

    const processInstance = spawn('node', [script],
        {
            stdout: ['inherit', logFile, logFile], // Correct usage with file descriptors
            detached: true,
        });

    processInstance.unref(); // Ensure the process is not tied to the parent process

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

const realtimeLogs = (pid) => {
    const processInfo = [...processes.values()].find((p) => p.pid === Number(pid));
    if (!processInfo) {
        console.log(`No process found with PID ${pid}`);
        return;
    }
    return processInfo;
}

module.exports = {
    startProcess,
    stopProcess,
    listProcesses,
    realtimeLogs
};
