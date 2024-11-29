import pidusage from 'pidusage';

export const monitorProcess = (pid) => {
  pidusage(pid, (err, stats) => {
    if (err) {
      console.error(`Failed to monitor PID ${pid}: ${err.message}`);
      return;
    }
    console.log(`PID ${pid} - CPU: ${stats.cpu.toFixed(2)}%, Memory: ${(stats.memory / 1024 / 1024).toFixed(2)} MB`);
  });
};

