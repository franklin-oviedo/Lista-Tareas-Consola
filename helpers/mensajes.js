require('colors');



const showMenu = () => {

    return new Promise(resolve => {
        console.clear();

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })


        readLine.question('Selecione una opcion: ', (opt) => {
            readLine.close();
            resolve(opt);

        })
    })

}

const pause = async () => {

    return new Promise(resolve => {

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`Presione ${'ENTER'.green} para continuar`, (opt) => {
            resolve();
            readLine.close();
        })
    })

}

module.exports = {
    showMenu,
    pause
}