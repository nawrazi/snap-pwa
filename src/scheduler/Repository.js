class Repository {

    constructor() {}

    getRoutines() {
        if(!localStorage.getItem("ROUTINES"))
            return [];

        return JSON.parse(localStorage.getItem("ROUTINES"));
    }

    setRoutines (routines) {
        console.log(routines)
        localStorage.setItem("ROUTINES", JSON.stringify(routines));
    }


    getTasks(completed = false) {
        const key = !completed ? "TASKS" : "COMPLETEDTASKS"
        
        if (!localStorage.getItem(key)){
            return [];
            
        }

        let stored = localStorage.getItem(key);
        return JSON.parse(stored)
        
    }

    setTasks(tasks, completed = false) {
        const key = !completed ? "TASKS" : "COMPLETEDTASKS"
        localStorage.setItem(key, JSON.stringify(tasks));
    }
}

export const repository = new Repository();

