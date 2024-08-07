import path from 'path';
import fs from 'fs';

export async function checkGameName(gameName) {
    const filePath = path.join('ReferenceData', gameName);

    return fs.promises.access(filePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}
