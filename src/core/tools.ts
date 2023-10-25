/**
 * Escape a string to be used in a regular expression.
 * @param text
 * @returns The escaped string
 * @example
 * const escaped = escapeRegExp("Hello, world!");
 * console.log(escaped);
 * // Output: Hello, world\!
 */

export function escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Parse a mention
 * @param mention The mention to parse
 * @returns The id of the user
 * @example
 * const id = parseMention("<@1234567890>");
 * console.log(id);
 * // Output: 1234567890
 */
export function parseMention(mention: string) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return id;
}
/**
 * Returns a string with the first letter of each word capitalized.
 * @param str The string to capitalize
 * @returns A string with
 * @example
 * const capitalized = capitalize("hello world");
 * // returns "hello world
 */

export function capitalize(str: string) {
    return str.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());
}

/**
 * Parse a Discord emoji
 * @param emoji The emoji to parse
 * @returns The emoji
 * @example
 * const emoji = parseEmoji("<:emoji:1234567890>", true);
 * console.log(emoji);
 * // Output: { name: "emoji", id: "1234567890", animated: false, regex: "/<?(a)?:?(\w{2,32}):(\d{17,19})>?/g", link: "https://cdn.discordapp.com/emojis/1234567890.gif" }
 */
export function parseEmoji(emoji: string, sendLink?: boolean) {
    const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/g

    const emojiMatch = emoji.match(emojiRegex);

    if (!emojiRegex.test(emoji) || !emojiMatch) {
        return;
    } 

    const emojiId = emojiMatch[0].split(":")[2].replace(">", "");
    const emojiName = emojiMatch[0].split(":")[1].replace(">", "");

    return {
        name: emojiName,
        id: emojiId,
        animated: emoji.includes("a:"),
        regex: emojiRegex,
        link: sendLink ? `https://cdn.discordapp.com/emojis/${emojiId}.${emoji.includes("a:") ? "gif" : "png"}` : undefined
    }
}