export type DefenseAuthorization = {
    uploadedFile: string;
    project_id: number;
    supervisor_id: number;
};

export type DefenseDocumentsInput = {
    memoire: string;
    bmc: string;
    label: string;
};

export type DefenseDocuments = {
    memoire: string;
    bmc: string;
    label: string;

    project_id: number;
};
