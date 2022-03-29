// const { showMenu, pausa } = require('./helpers/mensajes');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

// console.clear();


const main = async () => {
    let option = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        option = await inquirerMenu();
        
        switch (option) {
            case '1':
                const description = await leerInput('Descripción: ');
                tareas.crearTarea(description);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendienteCompletadas();
                break;
            case '4':
                tareas.listarPendienteCompletadas(false);
                break;            
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro de eliminar esta tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada correctamente');
                    }
                }
                break;
            
        }

        guardarDB(tareas.listadoArray);

        await pausa();
    
    } while (option !== '0');

}


main();