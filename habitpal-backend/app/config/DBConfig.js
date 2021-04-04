const username = "mdeetman";
const password = "vsKULqxFkkjvjE62";

const databaseUrl = `mongodb+srv://${username}:${password}@cluster0.xtqxg.mongodb.net/HabitPal?retryWrites=true&w=majority`;

module.exports = {
    url: databaseUrl
};