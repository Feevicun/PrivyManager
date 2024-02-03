// // Імпортуємо необхідні пакети
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const express = require('express');
// const path = require('path');
// require('./db'); // Підключення до бази даних
// const port = process.env.PORT || 4002;
// const app = express();

// // Налаштування статичної папки для ресурсів
// app.use(express.static(path.join(__dirname, 'frontend')));
// app.use('/css', express.static(path.join(__dirname, 'frontend', 'css')));
// app.use('/js', express.static(path.join(__dirname, 'frontend', 'js')));
// app.use(bodyParser.urlencoded({ extended: true }));

// const User = require('./models/UserSchema');
// const Data = require('./models/DataSchema');
// const LoginEvent = require('./models/LoginEvent');


// // HTML сторінки
// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
// });

// app.get('/data', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'data.html'));
// });

// // Головний маршрут
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
// });


// // Обробник POST-запиту для /register
// app.post('/register', async (req, res) => {
//   // Отримання даних з POST-запиту
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     const newUser = new User({ email, password });
//     const savedUser = await newUser.save();
//     const loginEvent = new LoginEvent({ userId: user._id });
//         await loginEvent.save();
//     // Якщо реєстрація пройшла успішно, перенаправляємо користувача на data.html
//     res.redirect('/data');
//   } catch (error) {
//     res.status(500).send('Помилка при реєстрації користувача');

//   }
// });


// app.post('/data', async (req, res) => {
//   try {
//     // Отримання даних з POST-запиту
//     const { fullName, reserveEmail, phoneNumber, birthDate, gender, streetAddress, streetAddressLine2, country, city, region, postalCode } = req.body;

//     const newData = new Data({
//       fullName,
//       reserveEmail,
//       phoneNumber,
//       birthDate,
//       gender,
//       address: {
//         streetAddress,
//         streetAddressLine2,
//         country,
//         city,
//         region,
//         postalCode
//       }
//     });

//     // Збереження даних у базі даних
//     const savedData = await newData.save();

//     res.send('Дані успішно збережені у базі даних');
//   } catch (error) {
//     console.error(error); // Виведення додаткової інформації про помилку у консоль
//     res.status(500).send('Помилка при збереженні даних у базі даних');
//   }
// });



// // Прослуховування порту
// app.listen(port, () => {
//     console.log(`Сервер запущено на порті ${port}`);
// });
