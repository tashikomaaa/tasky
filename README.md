# Tasky

**Tasky** is a simplified process manager. It helps you manage, monitor, and persist Node.js and other processes with an intuitive command-line interface. With features like real-time log viewing and process monitoring, Tasky is ideal for lightweight application management.

---

## Features

- Start, stop, and manage processes.
- Real-time resource monitoring (CPU and memory usage).
- Real-time log viewing.
- Persistent process information.
- Lightweight and easy to use.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/tasky.git
cd tasky
```

### Install Dependencies

```bash
npm install
```

### Set Up Logs Directory

Ensure a `logs/` directory exists in the root project folder:

```bash
mkdir logs
```

---

## Usage

Run the CLI tool using Node.js:

```bash
node src/cli.js <command>
```

### Available Commands

#### **Start a Process**
Start a new process by providing a name and script path:

```bash
node src/cli.js start <name> <script>
```

Example:

```bash
node src/cli.js start my-app ./app.js
```

#### **Stop a Process**
Stop a process by its PID:

```bash
node src/cli.js stop <pid>
```

Example:

```bash
node src/cli.js stop 12345
```

#### **List Running Processes**
View all running processes:

```bash
node src/cli.js list
```

Example Output:

```
Running processes:
- my-app (PID: 12345, Script: ./app.js)
- another-app (PID: 67890, Script: ./server.js)
```

#### **Monitor a Process**
Monitor CPU and memory usage for a specific process:

```bash
node src/cli.js monitor <pid>
```

Example Output:

```
PID 12345 - CPU: 10.5%, Memory: 32.64 MB
```

#### **View Real-Time Logs**
View the real-time logs for a specific process:

```bash
node src/cli.js logs <pid>
```

Example:

```bash
node src/cli.js logs 12345
```

---

## Development

### Project Structure

```
tasky/
├── logs/           # Logs for processes
├── src/            # Source code
│   ├── manager.js  # Process management logic
│   ├── monitor.js  # Monitoring logic
│   └── cli.js      # Command-line interface
├── package.json    # Project dependencies and metadata
└── README.md       # Documentation
```

### Add New Features
- To add new commands, modify `src/cli.js` and implement the logic in `src/manager.js` or a new module.
- Follow the modular design pattern for maintainability.

### Testing
Test the application locally by running multiple commands and observing logs, resource usage, and process management behavior.

---

## Roadmap

### Planned Features
- Clustering support for scaling applications across CPU cores.
- Log filtering and search capabilities.
- Integration with Docker for containerized process management.
- API for remote process control.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with detailed explanations of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

This project was inspired by [PM2](https://pm2.keymetrics.io/), a robust process manager for Node.js. tasky is a lightweight alternative for simpler use cases.

---

## Contact

For questions or feedback, feel free to contact [Aldwin moutarlier](mailto:tashikomaa@gmail.com).

