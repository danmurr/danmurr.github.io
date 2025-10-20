/*
Just use google sheet
have user enter a code
this code google sheet id
*/

function parseRows(rows) {
    for (let i = 1; i < rows.length; i++) { //Skip header row
        let name = rows[i][0];
        let description = rows[i][1];
        let meta = rows[i][2];
        let scriptElt = `<div class="project" id="${name.replace(/\s+/g, '-').toLowerCase()}">
                    <h3><a href="#" target="_blank">${name}</a></h3>
                    <p>${description}</p>
                    <div class="meta">
                        ${meta}
                    </div>
                </div>`;
        document.querySelector('.scripts').innerHTML += scriptElt;
    }
    // Add click listeners to scripts
    document.querySelectorAll('.project').forEach(elt => {
        elt.addEventListener('click', (e) => {
            alert(`Project ${elt.id} clicked`);
            ExecutionString = `https://e1246crt89.execute-api.us-east-2.amazonaws.com/default/testFunction?script=${elt.id}`;
            fetch(ExecutionString)
                .then(res => res.json())
                .then(data => {
                    console.log("Execution String:" + data);
                });
        });
    });
    // pullString = `https://test-dsa-labs.s3.us-east-2.amazonaws.com/output/example.csv`;
    // fetch(pullString)
    //     .then(res => res.text())
    //     .then(data => {
    //         console.log("Pull String: " + data);
    //     });
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
