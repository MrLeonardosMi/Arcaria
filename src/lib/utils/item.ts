export function replaceItems(json: string) {
    return json.replace(/"Item.of\('([^']+)', '({[^}]+})'\)"|\\"/g, (_, p1, p2) => {
        if (p1 && p2) 
            return `Item.of('${p1}', '${p2}')`;
        return '"';
    });
}