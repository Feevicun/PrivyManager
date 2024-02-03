const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');


require('./db');

const port = process.env.PORT || 4002;
let expressServer;
let mainWindow;

function createExpressApp() {
  const expressApp = express();

  // Import Mongoose models here
const User = require('./models/UserSchema');
const Data = require('./models/DataSchema');
const LoginEvent = require('./models/LoginEvent');

  // Use your existing Express.js code here
  expressApp.use(express.static(path.join(__dirname, 'frontend')));
  expressApp.use('/css', express.static(path.join(__dirname, 'frontend', 'css')));
  expressApp.use('/js', express.static(path.join(__dirname, 'frontend', 'js')));
  expressApp.use(bodyParser.urlencoded({ extended: true }));


  expressApp.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
  });

  expressApp.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
  });

  expressApp.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'data.html'));
  });


  expressApp.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'main.html'));
  });

  
  expressApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
  });

  expressApp.post('/register', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // Хешування паролю перед збереженням у базі даних
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({ email, password: hashedPassword });
      const savedUser = await newUser.save();
  
      res.redirect('/data');
    } catch (error) {
      console.error('Registration Error:', error); // Log the specific error
      res.status(500).send('Error registering user');
    }
  });



  expressApp.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(401).send('Invalid email or password');
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        res.status(401).send('Invalid email or password');
        return;
      }
  
      res.redirect('/data');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  

  expressApp.post('/data', async (req, res) => {
    try {
      // Extract data from the request body
      const {
        fullName,
        reserveEmail,
        phoneNumber,
        birthDate,
        gender,
        address,
        code // Add the generated code from the hidden input
      } = req.body;
  
      // Check if address is present and is an object
      if (!address || typeof address !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid address data' });
      }
  
      const {
        streetAddress,
        country,
        city,
        region,
        postalCode
      } = address;
  
      // Create a new instance of the Data model including the generated code
      const newData = new Data({
        fullName,
        reserveEmail,
        phoneNumber,
        birthDate,
        gender,
        address: {
          streetAddress,
          country,
          city,
          region,
          postalCode
        },
        code // Save the generated code
      });
  
      // Save the data to the database
      const savedData = await newData.save();
  
      // Respond with a JSON object indicating success
      res.redirect('/main');
    } catch (error) {
      console.error(error);
  
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ success: false, errors: validationErrors });
      } else {
        // Handle other errors
        res.status(500).json({ success: false, error: 'Error saving data to the database' });
      }
    }
  });
  
  

  // Start Express server
  expressServer = expressApp.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
}

app.whenReady().then(() => {
  createExpressApp();
  createWindow();

  ipcMain.on('update-settings', (event, userData) => {
    console.log('Received user data in Electron:', userData);
    // You can handle the user data here and update the UI in settings.html
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`http://localhost:${port}`);

  mainWindow.webContents.openDevTools(); // Optional - Remove in production

  mainWindow.on('closed', () => {
    expressServer.close();
    app.quit();
  });
}
