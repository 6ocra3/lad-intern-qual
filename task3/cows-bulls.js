var readlineSync = require('readline-sync');

// Генерация случайного числа с различающимися цифрами
var number = ""
for(let i = 0; i < 5; i++){
    var digit = Math.floor(Math.random() * 9).toString()
    while (number.includes(digit) || (digit === 0 && i === 0)){
        digit = Math.floor(Math.random() * 9).toString()
    }
    number += digit
}

while(true){

    var userNumber = readlineSync.question('Your number ');
    var cows = 0
    var bulls = 0

    // Пробег по числу пользователя и поиск быков и коров
    for(let i = 0; i < 5; i++){
        if(userNumber[i] === number[i]){
            bulls += 1
        }
        else if(number.includes(userNumber[i])){
            cows += 1
        }
    }
    if(bulls === 5){
        console.log(`Вы угадали, это число ${number}`)
        break
    }

    console.log(`Коровы: ${cows} Быки: ${bulls}`)
}