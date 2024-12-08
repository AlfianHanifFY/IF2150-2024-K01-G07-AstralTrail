<h1 align="center">AstralTrail</h1>
<h3 align="center">Capture Every Journey</h3>

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Modules](#modules)
- [Database Table](#database-table)

## Description

## Getting Started

1. **Clone this repository:**
   ```bash
   git clone https://github.com/AlfianHanifFY/IF2150-2024-K01-G07-AstralTrail.git
   ```
2. **cd to your repo**
   ```bash
   cd your-repo
   ```

## Back-End Setup

1. **Install Python and MySQL**<br/>
   Make sure you have the following installed:

   - [Python 3.x](https://www.python.org/downloads/)
   - [MySQL Server](https://dev.mysql.com/downloads/)
   - `pip` (Python package manager)
   - Any terminal/CLI tool of your choice (Windows CMD, macOS Terminal, etc.)

2. **Set Up Virtual Environment** <br/>
   Create a virtual environment to isolate dependencies:

   ```bash
   python -m venv venv
   ```

   Activate the virtual env

   - Windows

   ```bash
   .\venv\Scripts\activate
   ```

   - macOS/Linux

   ```bash
   source venv/bin/activate
   ```

3. **Install Dependencies** <br/>
   Install the required Python packages using `pip`:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables** <br/>
   Create a .env file in the root of your project with the following content:

   ```bash
   # Database configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   ```

   - Replace the placeholder values with your actual database connection details.

5. **Set Up Database** <br/>
   On MySql Monitor Create Database that will be used.

   ```bash
   CREATE DATABASE your_database_name;
   ```

6. **Set Up Tables** <br/>

   ```bash
   cd src/backend
   ```

   run this file to generate tables.

   ```bash
   python create_tables.py
   ```

7. **Run Server** <br/>
   ```bash
   flask run
   ```

## Front-End Setup

1. **Navigate to the src/frontend by running the following command in the terminal:**

   ```bash
   cd src/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Electron app in development mode:**
   ```bash
   npm start
   ```

## Modules

## Database Table
