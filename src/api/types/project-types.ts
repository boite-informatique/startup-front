export type ProjectCreationInput = {
    resume: string;
    brand_name: string;
    product_name: string;
    logo?: string;
    type: "startup" | "patent";

    members: string[];
    supervisors: string[];
};
