#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk'; // Import chalk for colorization
import figlet from 'figlet'; // Import figlet for ASCII art logo
import { startProcess, stopProcess, listProcesses, realtimeLogs } from './manager.js';
import { monitorProcess } from './monitor.js';

const program = new Command();

// Function to display the logo using figlet
const displayLogo = () => {
    figlet('Tasky', 'block')
};

// Display the logo when the command is invoked
displayLogo();

// Function to tail the log file and display new logs as they are added
const tailLogs = (logPath) => {
    if (!fs.existsSync(logPath)) {
        console.log(chalk.red(`Log file does not exist: ${logPath}`));
        return;
    }

    console.log(chalk.green(`Tailing log file: ${logPath}`));
    const stream = fs.createReadStream(logPath, { encoding: 'utf-8', start: fs.statSync(logPath).size });

    stream.on('data', (chunk) => {
        process.stdout.write(chalk.blue(chunk)); // Log output with blue color
    });

    // Watch for file changes and display new log data as it appears
    fs.watchFile(logPath, () => {
        const newStream = fs.createReadStream(logPath, { encoding: 'utf-8', start: fs.statSync(logPath).size });
        newStream.on('data', (chunk) => {
            process.stdout.write(chalk.blue(chunk)); // Output new logs in blue
        });
    });

    // Graceful exit by stopping the file watch
    process.on('SIGINT', () => {
        fs.unwatchFile(logPath); // Unwatch file when process is terminated
        console.log(chalk.yellow('Stopped watching log file.'));
        process.exit();
    });
};

// Command to start a new process
program
    .command('start <name> <script>')
    .description('Start a new process')
    .action((name, script) => {
        console.log(chalk.cyan(`Starting process: ${name} with script ${script}`));
        try {
            startProcess(name, script);
        } catch (error) {
            console.error(chalk.red(`Error starting process: ${error.message}`));
        }
    });

// Command to stop a process by PID
program
    .command('stop <pid>')
    .description('Stop a process by PID')
    .action((pid) => {
        console.log(chalk.yellow(`Stopping process with PID: ${pid}`));
        try {
            stopProcess(Number(pid));
        } catch (error) {
            console.error(chalk.red(`Error stopping process: ${error.message}`));
        }
    });

// Command to list all running processes
program
    .command('list')
    .description('List all running processes')
    .action(() => {
        console.log(chalk.magenta('Listing all running processes...'));
        listProcesses();
    });

// Command to monitor a process by PID
program
    .command('monitor <pid>')
    .description('Monitor a process by PID')
    .action((pid) => {
        console.log(chalk.green(`Monitoring process with PID: ${pid}`));
        monitorProcess(Number(pid));
    });

// Command to view real-time logs of a process by PID
program
    .command('logs <pid>')
    .description('View real-time logs of a process')
    .action((pid) => {
        const processInfo = realtimeLogs(pid);
        if (processInfo && processInfo.logPath) {
            console.log(chalk.blue(`Viewing logs for process with PID: ${pid}`));
            tailLogs(processInfo.logPath);
        } else {
            console.log(chalk.red(`No log path available for process with PID ${pid}`));
        }
    });

program.parse(process.argv);
