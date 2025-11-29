export interface TaskRecord {
    taskid: number;
    applicationname: string;
    applicationid: string;
    projectid: string;
    group: string;
    title: string;
    description: string;
    statusflag: string;
    statusdate: string;
}

export interface ProjectListRecord {
    projectId: string;
    projectName: string;
    applicationId : string;
    ownerName : string;

}