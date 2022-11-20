require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confimar, mostrarListadoChekList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const desc = await leerInput('Descripcon: ');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listadoCompletado(tareas.listadoArr);
                break;
            case 3:
                tareas.listarPendientesCompletadas(true)
                break;
            case 4:
                tareas.listarPendientesCompletadas(false)
                break;
            case 5:
                const ids = await mostrarListadoChekList(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== 0) {
                    const ok = await confimar('Esta seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada'.red)
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);
        await pausa();




    } while (opt !== '0');
}



main();