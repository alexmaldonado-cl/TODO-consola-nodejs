const { v4: uuidv4 } = require('uuid');

class Tarea {

    id          = '';
    description = '';
    finished_at = null;
    
    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.finished_at = null;
    }

}

module.exports = Tarea;