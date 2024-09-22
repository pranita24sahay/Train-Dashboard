import Papa from 'papaparse';

export const parseCSV = (file: File | undefined, callback: (results: any) => void) => {
    if (!file) {
        throw new Error('No file provided for parsing');
    }

    Papa.parse(file, {
        header: true,
        complete: function (results) {
            callback(results);
        }
    });
};

