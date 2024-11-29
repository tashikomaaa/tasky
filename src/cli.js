const { Command } = require('commander');
const { startProcess, stopProcess, listProcesses } = require('./manager');
const { monitorProcess } = require('./monitor');

const program = new Command();
const tailLogs = (logPath) => {
    if (!fs.existsSync(logPath)) {
        console.log(`Log file does not exist: ${logPath}`);
        return;
    }

    console.log(`Tailing log file: ${logPath}`);
    const stream = fs.createReadStream(logPath, { encoding: 'utf-8', start: fs.statSync(logPath).size });

    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    fs.watchFile(logPath, () => {
        // When the file is updated, read new data
        const newStream = fs.createReadStream(logPath, { encoding: 'utf-8', start: fs.statSync(logPath).size });
        newStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    });
};
program
    .command('start <name> <script>')
    .description('Start a new process')
    .action((name, script) => {
        startProcess(name, script);
    });

program
    .command('stop <pid>')
    .description('Stop a process by PID')
    .action((pid) => {
        stopProcess(Number(pid));
    });

program
    .command('list')
    .description('List all running processes')
    .action(() => {
        listProcesses();
    });

program
    .command('monitor <pid>')
    .description('Monitor a process by PID')
    .action((pid) => {
        monitorProcess(Number(pid));
    });
program
    .command('logs <pid>')
    .description('View real-time logs of a process')
    .action((pid) => {
        const processInfo = [...processes.values()].find((p) => p.pid === Number(pid));
        if (!processInfo) {
            console.log(`No process found with PID ${pid}`);
            return;
        }
        tailLogs(processInfo.logPath);
    });

program.parse(process.argv);
