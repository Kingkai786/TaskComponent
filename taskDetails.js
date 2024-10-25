import { LightningElement,track } from 'lwc';
import getTasks from '@salesforce/apex/lwcTaskDetails.taskDetails';
import taskCreate from '@salesforce/apex/lwcTaskDetails.newRec';
import taskDel from '@salesforce/apex/lwcTaskDetails.deleteRec';

export default class TaskDetails extends LightningElement {
    tasklist = [];
    name;
    templateVar = false;
    columns = [
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Acitvity Date', fieldName: 'ActivityDate', type: 'date' },
        { type: 'action',typeAttributes: {rowActions:[{name: 'delete',label: 'Delete'}]}}
    ];

    handleStartChange(event) {
        this.name = event.target.value;
    }

    connectedCallback() {
        this.fetchTask();
    }

    fetchTask(){
        getTasks().then((result) => {
                this.tasklist = result;
                this.templateVar = true;
            })
            .catch((error) => {
                console.log('error occured at get task');
            })
    }

    createTask() {
        console.log('this.name==>',this.name);
        this.templateVar = false;
        taskCreate({ name: this.name })
            .then(() => {
                this.name = '';
                this.fetchTask();
            })
            .catch(error => {
                console.log('error occured at create task');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        if (actionName === 'delete') {
            this.deleteTask(row.Id);
        }
    }

    deleteTask(taskId) {
        taskDel({ tId : taskId })
            .then(() => {
                console.log('task deleted.');
            })
            .catch(error => {
                console.log('error occured at delete task');
            });
    }

    
}