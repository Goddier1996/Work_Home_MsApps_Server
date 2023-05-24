const express = require('express');
const cors = require(`cors`)


const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())
app.use(express.json())


// active Router here was all function 
app.use('/api/infoCategory', require('./routes/infoCategory'))


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});