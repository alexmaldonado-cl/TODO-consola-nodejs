const { showMenu, pausa } = require('./helpers/mensajes');
console.clear();


const main = async () => {
    console.log('Hola Mundo');
    let answer = '';

    do {
        answer = await showMenu();
        console.log({answer});
        if (answer !== '0') await pausa();
    } while (answer !== '0');
    // await pausa();
}


main();