const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');


// ตั้งค่าการใช้งาน JSON
// ใช้ Middleware ของ Express เอง แทน body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ใช้งาน Routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});