import Papa from 'papaparse';

export const parseCSV = (file, callback) => {
    Papa.parse(file, {
        header: true,
        complete: function (results) {
            if (results.errors.length > 0) {
                console.error("Parsing errors:", results.errors);
            }
            console.log("Parsed CSV Data:", results.data); // Check the structure of the data
            callback(results.data);
        },
    });
};
