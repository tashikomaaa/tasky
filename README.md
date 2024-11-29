
# Tasky 🎯

**Tasky** is a lightweight process manager for Node.js applications and other processes. With an intuitive command-line interface, it helps you easily manage, monitor, and track your processes in real time. Ideal for simple use cases and smaller applications.

---

## 🚀 Features

- **Start, Stop, and Manage Processes**: Control your applications with simple commands.
- **Real-Time Resource Monitoring**: Track CPU and memory usage on the fly.
- **Live Log Viewing**: View real-time logs of your processes.
- **Persistent Process Information**: Logs and process data are saved for later reference.
- **Lightweight & Intuitive**: Simple, fast, and easy-to-use tool for process management.

---

## 🛠️ Installation

### Clone the Repository

To get started, clone the repository:

```bash
git clone https://github.com/tashikomaaa/tasky.git
cd tasky
```

### Install Dependencies

Install the necessary dependencies with npm:

```bash
bash install.sh
```


## 📋 Usage

Start Tasky with Node.js:

```bash
tasky <command>
```

### Available Commands

#### **Start a Process**

Launch a new process by specifying its name and script path:

```bash
tasky start <name> <script>
```

Example:

```bash
tasky start my-app ./app.js
```

#### **Stop a Process**

Terminate a process by its PID:

```bash
tasky stop <pid>
```

Example:

```bash
tasky stop 12345
```

#### **List Running Processes**

List all currently running processes:

```bash
tasky list
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
tasky monitor <pid>
```

Example Output:

```
PID 12345 - CPU: 10.5%, Memory: 32.64 MB
```

#### **View Real-Time Logs**

See the real-time logs for a process:

```bash
tasky logs <pid>
```

Example:

```bash
tasky logs 12345
```

---

## 🧑‍💻 Development

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

- Modify `src/cli.js` to add new commands.
- Implement new functionality in `src/manager.js` or a separate module.
- Follow the modular design for maintainability.

### Testing

To test, run multiple commands and observe logs, resource usage, and process management behavior.

---

## 🗺️ Roadmap

### Planned Features

- **Clustering Support**: Scale applications across multiple CPU cores.
- **Log Filtering & Search**: Advanced log filtering and search capabilities.
- **Docker Integration**: Manage processes running inside Docker containers.
- **Remote API**: API support for managing processes remotely.

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Open a pull request with a detailed description of your changes.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 💬 Acknowledgments

Inspired by [PM2](https://pm2.keymetrics.io/), **Tasky** is a lightweight alternative for managing Node.js processes.

---

## 📬 Contact

For questions or feedback, feel free to contact [Aldwin Moutarlier](mailto:tashikomaa@gmail.com).