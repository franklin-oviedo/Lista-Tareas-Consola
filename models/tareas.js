const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompletado() {
        this.listadoArr.forEach((tarea, id) => {
            const idx = `${id + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)

        })
    }

    listarPendientesCompletadas(Completadas) {

        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Compleado'.green : 'Pendiente'.red;
            if (Completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.' ).green} ${desc} :: Estado:: ${estado}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.' ).red} ${desc} :: ${estado}`)
                }
            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;