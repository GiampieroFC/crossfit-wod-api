"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WodToRespose = void 0;
class WodToRespose {
    constructor(wod) {
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
        this.previous = wod.wods.previous ? `${process.env.BASEURL_CROSSFIT}${wod.wods.previous.url}` : false;
        this.next = wod.wods.next ? `${process.env.BASEURL_CROSSFIT}${wod.wods.next.url}` : false;
    }
}
exports.WodToRespose = WodToRespose;
