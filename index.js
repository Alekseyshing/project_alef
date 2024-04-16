// index.js
const express = require('express');
const userRouter = require('./routes/user.routes')
const childrenRouter = require('./routes/children.routes')


const app = express();
const port = 3000;

app.use(express.json())
app.use('/api', userRouter);
app.use('/api', childrenRouter);

app.get('/', (req, res) => {
    res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
