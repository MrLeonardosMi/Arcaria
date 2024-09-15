import { replaceItems } from "../item";

export function generateDeleteScript(filters: { output?: string; input?: string; mod?: string; type?: string; id?: string; }): string {
    const conditions: any = {};
    Object.entries(filters).filter(([_, value]) => value).map(([key, value]) => conditions[key] = `"${value}"`);

    return replaceItems(`event.remove(${JSON.stringify(conditions)})`);
}