import path from 'path';
import fs from 'fs';

export function getObjectById(listName, id) {
    const idInt = parseInt(id, 10);

    for (const obj of listName) {
        if (obj.id === idInt) {
            return obj;
        }
    }

    const error = new Error("ID not found");
    error.statusCode = 404;
    throw error;
}

export async function checkGameName(gameName) {
    const filePath = path.join('ReferenceData', gameName);

    return fs.promises.access(filePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}

export async function combineReferenceData(gameName) {
    const combinedData = {};
    const directoryPath = path.join('ReferenceData', gameName);

    try {
        const files = fs.readdirSync(directoryPath);

        for (const filename of files) {
            if (filename.endsWith('.json')) {
                const dataname = path.basename(filename, '.json');
                const filePath = path.join(directoryPath, filename);

                try {
                    const fileContent = fs.readFileSync(filePath, 'utf-8').trim();

                    if (!fileContent) {
                        console.log(`Skipping empty file: ${filePath}`);
                        continue;
                    }

                    const data = JSON.parse(fileContent);
                    combinedData[dataname] = data;

                } catch (err) {
                    throw new Error(`Error reading ${filePath}: ${err.message}`);
                }
            }
        }

    } catch (err) {
        console.error('Error reading directory:', err);
    }

    return combinedData;
}