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
    applicationName: string;
    projectLead : string;
    onboardingQuarter : string;
    projectGroup : string;
}

//  {
//     "projectId": "_1764451667692",
//     "projectName": "2025Q4",
//     "applicationId": "Application52",
//     "ownerName": "Dave"
//   },
// ProjectProfileRecord replaces ProjectListRecord
export interface ProjectProfileRecord {
    /** The unique ID of the project. */
    projectId: number;
    /** The main title or subject of the project. */
    title: string;
    /** A detailed explanation or context for the project. */
    description: string;
    /** The business unit or group responsible for the project. */
    businessGroup: string;
    /** A unique identifier for the application associated with the project. */
    applicationId: string;
    /** The human-readable name of the associated application. */
    applicationName: string;
    /** The internal name of the project. */
    projectName: string;
    /** The calendar quarter when the project was onboarded (e.g., "YYYYQn"). */
    onboardingQuarter: string;
    /** The name of the person leading the project. */
    projectLead: string;
}