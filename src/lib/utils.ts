export function replaceItems(json: string): string {
    return json.replace(/"Item.of\('([^']+)', '({[^}]+})'\)"|\\"/g, (_, p1, p2) => {
        if (p1 && p2)
            return `Item.of('${p1}', '${p2}')`;
        return '"';
    });
}

export function wrapMineTweakerMeta(meta: string): string {
    if (meta.startsWith('<') && meta.endsWith('>'))
        return meta;
    
    return `<${meta}>`;
}

export function toUnicode(text: string): string {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        return (code >= 0x0410 && code <= 0x044F) || code === 0x0401 || code === 0x0451 
            ? `\\u${code.toString(16).padStart(4, '0')}` 
            : char;
    }).join('');
}
