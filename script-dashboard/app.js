// Add login functionality
// local store the login info
// Use a database with login info
// Pull the google sheet id from the database info
// Use google sheet API to pull data from the sheet
// Avoid global variables for security


//ORRR
/*
Just use google sheet
have user enter a code
this code google sheet id
*/

function parseRows(rows) {
    for (let i = 1; i < rows.length; i++) { //Skip header row
        let name = rows[i][0];
        let description = rows[i][1];
        let location = rows[i][2];
        let meta = rows[i][3];
        let scriptElt = `<div class="project" id="script-1">
                    <h3><a href="${location}" target="_blank">${name}</a></h3>
                    <p>${description}</p>
                    <div class="meta">
                        ${meta}
                    </div>
                </div>`;
        document.querySelector('.scripts').innerHTML += scriptElt;
        const row = rows[i];
        console.log(`Row ${i}:`, row);

    }
}

console.log("App initialized");
const sheetId = '1nNH3pJfK5c5kKeUsRLiFxOHL6WEL6h7F3fU76BNd2rg';
const sheetName = 'Home';
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}`;

fetch(url)
    .then(res => res.text())
    .then(rep => {
        const json = JSON.parse(rep.substring(47).slice(0, -2)); // remove the wrapper
        const rows = json.table.rows.map(r => r.c.map(c => c?.v));
        parseRows(rows);
    });
