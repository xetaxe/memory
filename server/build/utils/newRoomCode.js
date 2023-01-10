"use strict";
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
