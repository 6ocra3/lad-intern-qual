var readlineSync = require('readline-sync');

const monster = {
    maxHealth: 20,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const evstafiy = {
moves: [
    {
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
]
}
//Функция создания объекта для отслеживания cooldown
function createOnCooldown(object) {
    object.onCooldown = object.moves.reduce((prev, cur) => {
        prev[cur.name] = 0
        return prev
}, {})
}

//Функция уменьшения cooldown
function decrementCooldown (){
    for(let key in this.onCooldown){
        if (this.onCooldown[key] > 0){
            this.onCooldown[key] -= 1
        }
    }
}

//Функция для получения доступных действий
function getAvailableMoves(){
    itog = []
    this.moves.forEach((move) => {
        if(this.onCooldown[move.name] === 0){
            itog.push(move)
        }
    })
    this.availableMoves = itog
}


// Присваивание и исполнение функций для монстра и Евстафия
createOnCooldown(monster)
createOnCooldown(evstafiy)

monster.decrementCooldown = decrementCooldown
evstafiy.decrementCooldown = decrementCooldown

evstafiy.getAvailableMoves = getAvailableMoves
monster.getAvailableMoves = getAvailableMoves

evstafiy.maxHealth = Number(readlineSync.question("Выберите начальное здоровье Евстафия "))
while(evstafiy.maxHealth > 0 && monster.maxHealth > 0){
    console.log()
    console.log(`Здоровье Евстафия ${evstafiy.maxHealth}`)
    console.log(`Здоровье монстра ${monster.maxHealth}`)

    // Получение доступных ходов для монстра и Евстафия
    monster.getAvailableMoves()
    evstafiy.getAvailableMoves()

    // Случайный выбор действия для монстра
    monsterMove = monster.availableMoves[Math.floor(Math.random() * monster.availableMoves.length)]

    console.log()
    console.log(`Монстр выбрал '${monsterMove.name}'`)
    console.log(`Это ${monsterMove.physicalDmg} физического урона, ${monsterMove.magicDmg} магического урона, ${monsterMove.physicArmorPercents}% физической брони, ${monsterMove.magicArmorPercents}% магической брони`)
    console.log()

    // Пользовательский выбор хода Евстафия
    const movesName = evstafiy.availableMoves.reduce((prev, cur)=> {
        return [...prev, cur.name]
    }, [])
    userChoice = readlineSync.keyInSelect(movesName, "Какой ход?", {"cancel": "Прекратить игру"})
    if(userChoice === -1){
        break
    }
    evstafiyMove = evstafiy.availableMoves[userChoice]

    // Подсчет взаимонанесенного урона
    monsterPhysDmg = (monsterMove.physicalDmg * ((100 - evstafiyMove.physicArmorPercents) / 100))
    monsterMagicDmg = (monsterMove.magicDmg * ((100 - evstafiyMove.magicArmorPercents) / 100))
    evstafiyPhysDmg = (evstafiyMove.physicalDmg * ((100 - monsterMove.physicArmorPercents) / 100))
    evstafiyMagicDmg = (evstafiyMove.magicDmg * ((100 - monsterMove.magicArmorPercents) / 100))

    console.log()
    console.log(`Евстафий наносит ${evstafiyPhysDmg} физического урона и ${evstafiyMagicDmg} магического урона`)
    console.log(`Монстр наносит ${monsterPhysDmg} физического урона и ${monsterMagicDmg} магического урона`)

    // Вычитание урона из хп
    evstafiy.maxHealth -= monsterPhysDmg + monsterMagicDmg
    monster.maxHealth -= evstafiyPhysDmg + evstafiyMagicDmg
    evstafiy.maxHealth = Number(evstafiy.maxHealth.toFixed(1))
    monster.maxHealth = Number(monster.maxHealth.toFixed(1))

    // Реализация механизма cooldown: добавления нового хода и уменьшения cooldown для сделанных ходов
    monster.decrementCooldown()
    evstafiy.decrementCooldown()

    evstafiy.onCooldown[evstafiyMove.name] = evstafiyMove.cooldown
    monster.onCooldown[monsterMove.name] = monsterMove.cooldown

}
console.log()
if(evstafiy.maxHealth <= 0){
    console.log("Победил монстр")
}
else if(monster.maxHealth <= 0){
    console.log("Победил Евстафий")
}
else if(evstafiy.maxHealth <= 0 && monster.maxHealth <= 0){
    console.log("Оба бойца пали на поле боя")
}
console.log()
