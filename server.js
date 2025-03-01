const app = require("./app");
const connectToDB = require("./src/config/db");

const PORT  = process.env.PORT || 5000;

connectToDB();

app.listen(PORT, () => {
    console.log(`server running on : localhost:${PORT}`);
});