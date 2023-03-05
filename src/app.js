const express = require('express');

const { loginRouter, userRouter, categoryRouter } = require('./routers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });

  return res.sendStatus(500);
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
