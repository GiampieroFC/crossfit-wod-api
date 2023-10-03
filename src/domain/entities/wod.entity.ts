export interface Wod {
    wods: Wods;
}

export interface Wods {
    id: string;
    cleanID: string;
    title: string;
    wodRaw: string;
    wodHtml: string;
    publishedOn: string;
    publishingState: string;
    publishingDate: Date;
    language: string;
    translations: Translations;
    url: string;
    defaultFocalPoint: string;
    topicId: string;
    modified: string;
    modifiedBy: string;
    otherHtml: any[];
    otherRaw: any[];
    media: Media;
    previous: Current | Boolean;
    next: Current | Boolean;
    portrait: boolean;
    scrollFeaturedMedia: boolean;
    active: string;
    current: Current;
}

export interface Current {
    url: string;
}

export interface Media {
    featured: Featured[];
    thumbnail: string;
    counts: Counts;
    arrows: boolean;
}

export interface Counts {
    display: number;
    raw: number;
}

export interface Featured {
    raw: string;
    thumbnail: string;
    portrait: boolean;
    captionRaw: string;
    focalPoint: string;
    display: string;
    index: number;
    isThumbnail: boolean;
    captionHTML: string;
}

export interface Translations {
    en: string;
}
