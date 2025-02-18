import fs from 'fs'; // Import modułu fs do operacji na systemie plików
import path from 'path'; // Import modułu path do manipulacji ścieżkami plików
import { fileURLToPath } from 'url'; // Import funkcji do konwersji URL na ścieżkę pliku

const __filename = fileURLToPath(import.meta.url); // Konwertuje bieżący URL modułu na pełną ścieżkę pliku
const __dirname = path.dirname(__filename); // Wyznacza katalog, w którym znajduje się bieżący plik

// Funkcja saveData: zapisuje dane użytkowników z pliku JSON do osobnych plików tekstowych
const saveData = (jsonFilePath, folderName, overwrite = false) => {
    try {
        // Sprawdzamy, czy plik JSON istnieje
        if (!fs.existsSync(jsonFilePath)) {
            console.error(`Plik JSON "${jsonFilePath}" nie istnieje!`); // Logowanie błędu, jeśli plik nie istnieje
            return; // Kończymy działanie funkcji
        }

        // Odczytujemy zawartość pliku JSON jako tekst w formacie UTF-8
        const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
        const users = JSON.parse(rawData); // Parsujemy tekst na obiekt JSON (tablica użytkowników)

        // Ustalamy pełną ścieżkę do folderu, w którym zapiszemy pliki
        const folderPath = path.join(__dirname, folderName);

        // Próba odczytu zawartości folderu, aby sprawdzić, czy folder istnieje
        let folderExists = false;
        try {
            fs.readdirSync(folderPath); // Jeśli folder istnieje, ta funkcja zwróci listę plików
            folderExists = true; // Folder istnieje
        } catch (err) {
            folderExists = false; // Folder nie istnieje
        }

        if (folderExists) { // Jeśli folder istnieje
            if (overwrite) { // Jeśli chcemy nadpisać istniejące pliki
                const files = fs.readdirSync(folderPath); // Pobieramy listę plików w folderze
                files.forEach(file => {
                    const filePath = path.join(folderPath, file); // Tworzymy pełną ścieżkę do pliku
                    fs.unlinkSync(filePath); // Usuwamy plik
                });
                console.log('Istniejące pliki zostały nadpisane.');
            } else {
                console.log('Folder już istnieje i nie będzie nadpisany!'); // Informacja, że folder istnieje, ale nie nadpisujemy danych
                return; // Kończymy działanie funkcji
            }
        } else {
            // Jeśli folder nie istnieje, tworzymy go z opcją recursive (tworzenie katalogów nadrzędnych, jeśli potrzeba)
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Folder "${folderName}" został utworzony.`);
        }

        // Iterujemy przez każdego użytkownika z tablicy
        users.forEach(user => {
            // Dzielimy pełne imię i nazwisko na części (zakładamy, że są oddzielone spacją)
            const nameParts = user.name.split(' ');
            const firstName = nameParts[0]; // Pierwsza część jako imię
            const lastName = nameParts[1] || ''; // Druga część jako nazwisko (lub pusty ciąg, jeśli nie ma)

            // Generujemy nazwę pliku wg schematu: id-imie-nazwisko.txt
            const fileName = `${user.id}-${firstName}-${lastName}.txt`;
            const filePath = path.join(folderPath, fileName); // Łączymy ścieżkę folderu i nazwę pliku

            // Tworzymy zawartość pliku – każda informacja w nowej linii
            const fileContent = `Name: ${firstName}\n` +
                `Surname: ${lastName}\n` +
                `Street: ${user.address.street}\n` +
                `Zip Code: ${user.address.zipcode}\n` +
                `City: ${user.address.city}\n` +
                `Phone: ${user.phone}`;

            fs.writeFileSync(filePath, fileContent, 'utf-8'); // Zapisujemy zawartość do pliku z kodowaniem UTF-8
            console.log(`Plik "${fileName}" został utworzony.`); // Logujemy informację o utworzeniu pliku
        });

        console.log('Dane zostały zapisane pomyślnie!'); // Informacja o pomyślnym zakończeniu zapisu danych
    } catch (error) {
        console.error('Błąd podczas zapisywania danych:', error); // Obsługa i logowanie błędów
    }
};

export { saveData }; // Eksportujemy funkcję saveData, aby mogła być używana w innych modułach
