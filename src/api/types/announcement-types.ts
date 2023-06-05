export type Announcement = {
    id: number;
    title: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    image: string;
};

export type CreateAnnouncementInput = {
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    image: string;
    establishement: number[];
};
