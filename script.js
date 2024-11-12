document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const data = parseCSV(text);
            createChart(data);
        };
        reader.readAsText(file);
    }
}

function parseCSV2(text) {
    const rows = text.split('\n');
    const labels = [];
    const data = [];
    rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length === 2) {
            labels.push(cols[0]);
            data.push(parseFloat(cols[1]));
        }
    });
    return { labels, data };
}

function parseCSV(text) {
    const rows = text.split('\n');
    const data = [];
    rows.forEach(row => {
        const cols = row.split(',');
        cols.forEach(col => {
            data.push(parseFloat(col.trim()));
        });
        //~ if(row.trim() !== '') {
            
            //~ data.push(parseFloat(row.trim()));
        //~ }
    });
    return data;
}

function createChart(data) {
    const labels = data.map((_, index) => index);
    const ctx = document.getElementById('myChart').getContext('2d');
    console.log(data);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'CSV Data',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
