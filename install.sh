#!/bin/bash

# Set log file
LOG_FILE="logs/install.log"

# Color codes
RESET="\e[0m"
BOLD="\e[1m"
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
CYAN="\e[36m"
MAGENTA="\e[35m"

# Function to handle errors
handle_error() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - ${RED}${BOLD}ERROR:${RESET} $1" | tee -a $LOG_FILE
    exit 1
}

# Function to print info with color
print_info() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - ${CYAN}${BOLD}INFO:${RESET} $1" | tee -a $LOG_FILE
}

# Function to print success message with color
print_success() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - ${GREEN}${BOLD}SUCCESS:${RESET} $1" | tee -a $LOG_FILE
}

# Function to print warning message with color
print_warning() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - ${YELLOW}${BOLD}WARNING:${RESET} $1" | tee -a $LOG_FILE
}

# Check if 'logs' directory exists, create if not
if [ ! -d "logs" ]; then
    print_info "Creating 'logs' directory..."
    mkdir logs || handle_error "Failed to create 'logs' directory."
else
    print_info "'logs' directory already exists."
fi

# Install project dependencies locally
print_info "Installing local dependencies..."
npm install >> $LOG_FILE 2>&1 || handle_error "npm install failed."

# Check if the project is already installed globally
if ! npm list -g | grep -q 'tasky'; then
    print_info "Installing tasky globally..."
    sudo npm install -g . >> $LOG_FILE 2>&1 || handle_error "Global npm install failed."
else
    print_warning "Tasky is already globally installed."
fi

# Clear terminal screen for a clean display
clear

# Run tasky help command to show the help message
print_info "Displaying tasky help..."
tasky -h

# Print final success message
print_success "Installation completed successfully!"
