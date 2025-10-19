const fs = require('fs');

// Data to write into the JSON file
const data = {
    name: "John Doe",
    age: 30,
    profession: "Developer"
};

// Convert the data to a JSON string
const jsonData = JSON.stringify(data, null, 2); // Pretty formatting with 2 spaces

// Write the JSON string to a file
fs.writeFile('data.json', jsonData, (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("JSON file has been saved!");
    }
});