import Papa from 'papaparse';

export const parseCSV = (file, callback) => {
    Papa.parse(file, {
        header: true,
        complete: function (results) {
            console.log(results.data)
            callback(results.data);
        },
    });
};
