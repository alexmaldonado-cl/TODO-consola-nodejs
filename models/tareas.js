const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArray() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach( (tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArray.forEach((tarea, index) => {
            const indice      = `${((index + 1).toString() + '.').green}`;
            const description = tarea.description;
            const estado      = `${tarea.finished_at ? 'Completada'.green : 'Pendiente'.red}`;
            console.log(`${indice} ${description} :: ${estado}`);;
        });
    }

    listarPendienteCompletadas(completadas = true) {

        this.listadoArray.forEach((tarea, index) => {
            const indice      = `${((index + 1).toString() + '.').green}`;
            const description = tarea.description;
            const estado = `${tarea.finished_at ? tarea.finished_at+''.green : 'Pendiente'.red}`;
            if (completadas == Boolean(tarea.finished_at)) {
                console.log(`${indice} ${description} :: ${estado.green}`);;
            }
        });
    }


    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.finished_at) {
                tarea.finished_at = new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].finished_at = null;
            }
        });
    }

}

module.exports = Tareas;