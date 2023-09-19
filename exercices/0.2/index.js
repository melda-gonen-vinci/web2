const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = 678;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
