const app = require('./server/app');
const port = 8080;

app.listen(port, () => {
    console.log(`Listening on at http://localhost:${port}`);
});