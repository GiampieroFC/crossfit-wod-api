import { Current, Media, Translations, Wod } from '../domain/entities/wod.entity';

export class WodToRespose {

    public id: string;
    public title: string;
    public wodRaw: string;
    public wodHtml: string;
    public publishedOn: string;
    public language: string;
    public translations: Translations;
    public url: string;
    public modified: string;
    public otherHtml: any[];
    public otherRaw: any[];
    public media: Media;
    public previous: string | boolean;
    public next: string | boolean;
    public current: string | boolean;

    constructor(wod: Wod) {
        this.id = wod.wods.id;
        this.title = wod.wods.title;
        this.wodRaw = wod.wods.wodRaw;
        this.wodHtml = wod.wods.wodHtml;
        this.publishedOn = wod.wods.publishedOn;
        this.language = wod.wods.language;
        this.translations = wod.wods.translations;
        this.url = `${process.env.BASEURL_CROSSFIT}${wod.wods.url}`;
        this.modified = wod.wods.modified;
        this.otherHtml = wod.wods.otherHtml;
        this.otherRaw = wod.wods.otherRaw;
        this.media = wod.wods.media;
        this.current = `${process.env.BASEURL_CROSSFIT}${wod.wods.url}`;
        this.previous = wod.wods.previous ? `${process.env.BASEURL_CROSSFIT}${(wod.wods.previous as Current).url}` : false;
        this.next = wod.wods.next ? `${process.env.BASEURL_CROSSFIT}${(wod.wods.next as Current).url}` : false;
    }
}