const PORT = process.env.PORT || 5010;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({ 'Greet': 'Hello Express App' });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});