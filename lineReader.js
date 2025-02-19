// Importujemy funkcję saveData z modułu saveData.js
import { saveData } from './index.js'; // Import funkcji saveData z pliku saveData.js, gdzie została ona wyeksportowana

// Definiujemy ścieżkę do pliku JSON zawierającego dane użytkowników
const jsonFilePath = './users.json'; // Ścieżka do pliku JSON (np. "users.json"), z którego odczytamy dane użytkowników

// Definiujemy nazwę folderu, do którego mają zostać zapisane pliki tekstowe
const folderName = 'outputFiles'; // Nazwa folderu, w którym zostaną utworzone pliki tekstowe dla użytkowników

// Definiujemy wartość logiczną określającą, czy istniejące pliki w folderze mają być nadpisane
const overwrite = true; // true - jeśli folder istnieje i zawiera pliki, to zostaną one nadpisane; false - jeśli nie, zostanie wyświetlony komunikat

// Wywołujemy funkcję saveData z podanymi parametrami
saveData(jsonFilePath, folderName, overwrite); // Funkcja saveData odczyta dane z pliku JSON i utworzy pliki tekstowe wg ustalonych reguł

// Na tym etapie, funkcja saveData wykonuje operacje:
// 1. Odczyt pliku JSON i parsowanie danych użytkowników.
// 2. Sprawdzenie istnienia folderu i ewentualne usunięcie plików, jeśli overwrite jest true.
// 3. Tworzenie folderu (jeśli nie istnieje) oraz generowanie plików tekstowych dla każdego użytkownika.
// 4. Logowanie przebiegu operacji do konsoli.
