export class EmptyWeeklyTaskCount {
    constructor(emp_id){
        this.emp_id = emp_id;
        this.done = 0;
        this.pending = 0;
        this.reviewed = 0;
        this.wip = 0;
        this['to-do'] = 0;
    }
}