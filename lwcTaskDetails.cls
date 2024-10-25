public with sharing class lwcTaskDetails {
    
    @AuraEnabled
    public static List<Task> taskDetails() {
        List<Task> taskList =  [SELECT Id, Subject, ActivityDate FROM Task limit 15];
		return taskList;
    }

	@AuraEnabled
    public static void deleteRec(Id tId) {
        Task dltTask = new Task();
		dltTask.Id = tId;
        delete dltTask;
    }

    @AuraEnabled
    public static void newRec(String name) {
        Task newTask = new Task(Subject = name, ActivityDate = Date.today());
        insert newTask;
    }

    
}