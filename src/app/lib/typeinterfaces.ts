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
     /** The unique ID of the project. */
    projectId: string;
        /** The internal name of the project. */
    projectName: string;
        /** A unique identifier for the application associated with the project. */
    applicationId : string;
        /** A unique identifier for the application associated with the project. */
    applicationName: string;
        /** The name of the person leading the project. */
    projectLead : string;
        /** The calendar quarter when the project was onboarded (e.g., "YYYYQn"). */
    onboardingQuarter : string;
        /** The business unit or group responsible for the project. */
    projectGroup : string;
}

export interface SdaFeature {
  featureId: number; // For the unique numeric ID
  title: string; // For the feature name/summary
  description: string; // For the detailed explanation
  statusFlag: string; // For the status identifier (e.g., "idk", "In Progress", "Complete")
  statusDate: string; // For the date in YYYYMMDD format
  owner: string; // For the person/team responsible
}