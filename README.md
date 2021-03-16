# BetterMoodle

## Installation

### Prerequisites

Ensure you have the following installed before downloading the source code:

* NodeJS
* Python
* GitCLI

If you're using an IDE like Visual Studio Code and you're installing NodeJS for the first time, ensure that node and npm are installed as environment variables, and that you restart the IDE perform continuing. 

Additionally you may want to pip install the following python libraries:

```python
pip install python-jwt
pip install flash
pip install bcrypt
pip install slugify
```

### Cloning and Running

1. Open a new terminal and navigate to your current working directory.
2. Enter the following commands:

```bash
git clone https://github.com/BelgianSausage/BetterMoodle.git
cd client
npm install
npm run start
```

3. The following commands will install all necessary dependencies, and open the project in a tab in your default browser at the address [https://localhost:3000](https://localhost:3000)

4. To run the server open a seperate terminal:
  
  1. To run in development mode (where you don't need to rerun after making changes), enter:

  ```python
  flask run -p 8080
  ```
  2. When debugging however flask in developement mode doesn't always print to the console, so you may need
  to simply run:

  ```python
  python app.py
  ```