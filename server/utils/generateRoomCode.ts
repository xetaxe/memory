const vowels = ["A", "E", "I", "O", "U"];
const consonants = ["B", "C", "D", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "V", "Y", "Z"];

const generateRoomCode = (existingRooms : string[] = []): string => {

  let newRoomCode: string = "";
  let randomVowel: string = "";
  let randomConsonant: string = "";

  do {
    for(let i=0; i<3; i++){
      randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
      randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
      newRoomCode += randomConsonant + randomVowel;
    }
  } while (existingRooms.includes(newRoomCode))

  return newRoomCode
}

export default generateRoomCode;