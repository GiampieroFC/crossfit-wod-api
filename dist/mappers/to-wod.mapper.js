"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
class Convert {
    static toWod(responseData) {
        return cast(responseData, r("Wod"));
    }
    static wodToJson(value) {
        return JSON.stringify(uncast(value, a(r("Wod"))), null, 2);
    }
}
exports.Convert = Convert;
function invalidValue(typ, val, key, parent = '') {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}
function prettyTypeName(typ) {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        }
        else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    }
    else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    }
    else {
        return typeof typ;
    }
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key = '', parent = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false)
        return invalidValue(typ, val, key, parent);
    let ref = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function l(typ) {
    return { literal: typ };
}
function a(typ) {
    return { arrayItems: typ };
}
function u(...typs) {
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props, additional };
}
function m(additional) {
    return { props: [], additional };
}
function r(name) {
    return { ref: name };
}
const typeMap = {
    "Wod": o([
        { json: "wods", js: "wods", typ: r("Wods") },
    ], false),
    "Wods": o([
        { json: "id", js: "id", typ: "" },
        { json: "cleanID", js: "cleanID", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "wodRaw", js: "wodRaw", typ: "" },
        { json: "wodHtml", js: "wodHtml", typ: "" },
        { json: "publishedOn", js: "publishedOn", typ: u(null, "") },
        { json: "publishingState", js: "publishingState", typ: r("PublishingState") },
        { json: "publishingDate", js: "publishingDate", typ: Date },
        { json: "language", js: "language", typ: r("Language") },
        { json: "translations", js: "translations", typ: r("Translations") },
        { json: "url", js: "url", typ: "" },
        { json: "defaultFocalPoint", js: "defaultFocalPoint", typ: r("FocalPoint") },
        { json: "topicId", js: "topicId", typ: "" },
        { json: "modified", js: "modified", typ: "" },
        { json: "modifiedBy", js: "modifiedBy", typ: "" },
        { json: "otherRaw", js: "otherRaw", typ: u(undefined, a("any")) },
        { json: "otherHtml", js: "otherHtml", typ: u(undefined, a("any")) },
        { json: "media", js: "media", typ: r("Media") },
        { json: "portrait", js: "portrait", typ: true },
        { json: "scrollFeaturedMedia", js: "scrollFeaturedMedia", typ: true },
        { json: "active", js: "active", typ: u(undefined, "") },
        { json: "previous", js: "previous", typ: u(undefined, r("Current"), true) },
        { json: "current", js: "current", typ: u(undefined, r("Current"), true) },
        { json: "next", js: "next", typ: u(undefined, r("Current"), true) },
    ], false),
    "Current": o([
        { json: "url", js: "url", typ: u(undefined, "") },
    ], false),
    "Media": o([
        { json: "thumbnail", js: "thumbnail", typ: u(undefined, "") },
        { json: "featured", js: "featured", typ: u(undefined, a(r("Featured"))) },
        { json: "counts", js: "counts", typ: u(undefined, r("Counts")) },
        { json: "arrows", js: "arrows", typ: u(undefined, true) },
        { json: "photos", js: "photos", typ: u(undefined, a(r("Photo"))) },
    ], false),
    "Counts": o([
        { json: "display", js: "display", typ: 0 },
        { json: "raw", js: "raw", typ: 0 },
    ], false),
    "Featured": o([
        { json: "raw", js: "raw", typ: u(undefined, "") },
        { json: "thumbnail", js: "thumbnail", typ: u(undefined, "") },
        { json: "focalPoint", js: "focalPoint", typ: u(undefined, r("FocalPoint")) },
        { json: "captionRaw", js: "captionRaw", typ: u(undefined, "") },
        { json: "display", js: "display", typ: u(undefined, "") },
        { json: "index", js: "index", typ: u(undefined, 0) },
        { json: "isThumbnail", js: "isThumbnail", typ: u(undefined, true) },
        { json: "captionHTML", js: "captionHTML", typ: u(undefined, "") },
        { json: "portrait", js: "portrait", typ: u(undefined, true) },
    ], false),
    "Photo": o([
        { json: "raw", js: "raw", typ: u(undefined, "") },
        { json: "thumbnail", js: "thumbnail", typ: u(undefined, "") },
        { json: "display", js: "display", typ: u(undefined, "") },
    ], false),
    "Translations": o([
        { json: "en", js: "en", typ: "" },
    ], false),
    "FocalPoint": [
        "center-middle",
        "center-right",
    ],
    "Language": [
        "en",
    ],
    "PublishingState": [
        "published",
    ],
};
