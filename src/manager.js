import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const processes = new Map(); // Stores running processes.

export const startProcess = (name, script) => {
    const logPath = path.join(__dirname, `../logs/${name}.log`);
    
    // Ensure log file is opened and appended to, if it exists.
    const logFile = fs.openSync(logPath, 'a'); // Open file for appending

    const processInstance = spawn('node', [script], {
        stdout: logFile,  // Write stdout to log file
        stderr: logFile,  // Also capture stderr in the same log
        detached: true,
    });

    processInstance.unref(); // Detach process from the parent process

    // Store process information
    processes.set(processInstance.pid, { name, script, pid: processInstance.pid, logPath });

    console.log(`Started process '${name}' (PID: ${processInstance.pid})`);
};

export const stopProcess = (pid) => {
    const processInfo = processes.get(pid);

    if (!processInfo) {
        console.log(`No process found with PID ${pid}`);
        return;
    }

    try {
        process.kill(pid);
        processes.delete(pid); // Remove from process map
        console.log(`Stopped process '${processInfo.name}' (PID: ${pid})`);
    } catch (err) {
        console.error(`Failed to stop process with PID ${pid}: ${err.message}`);
    }
};

export const listProcesses = () => {
    if (processes.size === 0) {
        console.log('No running processes.');
        return;
    }

    console.log('Running processes:');
    processes.forEach((processInfo) => {
        console.log(`- ${processInfo.name} (PID: ${processInfo.pid}, Script: ${processInfo.script})`);
    });
};

export const realtimeLogs = (pid) => {
    const processInfo = [...processes.values()].find((p) => p.pid === Number(pid));
    if (!processInfo) {
        console.log(`No process found with PID ${pid}`);
        return;
    }

    // Return the log path for real-time access
    console.log(`Real-time logs for PID ${pid}:`);
    const logFile = fs.createReadStream(processInfo.logPath, { encoding: 'utf-8' });
    logFile.on('data', (chunk) => {
        process.stdout.write(chunk);  // Output the logs to console
    });

    return processInfo;
};
