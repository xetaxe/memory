"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vowels = ["A", "E", "I", "O", "U"];
const consonants = ["B", "C", "D", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "V", "Y", "Z"];
const generateRoomCode = (existingRooms = []) => {
    let newRoomCode = "";
    let randomVowel = "";
    let randomConsonant = "";
    do {
        for (let i = 0; i < 3; i++) {
            randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
            randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
            newRoomCode += randomConsonant + randomVowel;
        }
    } while (existingRooms.includes(newRoomCode));
    return newRoomCode;
};
exports.default = generateRoomCode;
