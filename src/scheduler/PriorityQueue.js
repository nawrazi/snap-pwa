import { repository } from "./Repository";

export class TaskQueue{

    constructor(tasks){
        this.tasks = tasks
    }

    enqueue(queueItem) {
        let added = false;

        for (let [index, val] of this.tasks.entries()){
            if(queueItem.priority > val.priority){
                this.tasks.splice((index++), 0, queueItem);
                added = true;
                break;
            }
        }
        if(!added) this.tasks.unshift(queueItem)
    }

    dequeue() {
        // console.log(this.tasks)
        // console.log("pop called")
        return this.tasks.pop()    
        // throw new Error
        // console.log(result)
    }

    farthestDeadline(){

        // console.log(typeof this.tasks)

        console.log(this.tasks.length)

        let farthestDate = this.tasks[0].deadline;

        for(let task of this.tasks){
            if(task.deadline > farthestDate){
                console.log("Called")
                farthestDate = task.deadline
            }
        }

        return farthestDate;
    }

    items() {
        return this.tasks;
    }

    length() {
        return this.tasks.length;
    }

    isEmpty() {
        return this.tasks.length == 0;
    }

    remove(task){
        // TODO
    }

    save(){
        repository.setTasks(this.tasks)
    }
}