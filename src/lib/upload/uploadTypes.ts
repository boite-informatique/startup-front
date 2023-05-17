export const uploadConfig = {
    image: {
        multiple: false,
        accept: "image/*",
        endpoint: "upload/image",
    },
    pdf: {
        multiple: false,
        accept: ".pdf",
        endpoint: "upload/pdf",
    },
    multipleDocuments: {
        multiple: true,
        accept: ".pdf,video/*,.docx,.pptx,.doc",
        endpoint: "upload/document",
    },
};

export type UploadTypes = keyof typeof uploadConfig;
