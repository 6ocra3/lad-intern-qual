var str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const rusEng = {
    "ПОНЕДЕЛЬНИК": "MONDAY",
    "ВТОРНИК": "TUESDAY",
    "СРЕДА": "WEDNESDAY",
    "ЧЕТВЕРГ": "THURSDAY",
    "ПЯТНИЦА": "FRIDAY",
    "СУББОТА": "SATURDAY",
    "ВОСКРЕСЕНЬЕ": "SUNDAY"
}
for(let key in rusEng){
    while(str.includes(key)){
        const end = str.indexOf(key)
         var str = str.slice(0, end) + rusEng[key] + str.slice(end + key.length, str.length)
    }
}
console.log(str)