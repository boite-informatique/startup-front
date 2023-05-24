export type ProjectModificationInput = Partial<{
    brand_name: string;
    product_name: string;
    resume: string;
    logo: string;
    type: "startup" | "patent";
}>;
