import cookie, { CookieSerializeOptions } from 'cookie'


export function getCookie(name: string) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)'))
    return match ? match[1] : undefined
}

export function setCookie(
    name: string,
    value: string,
    options: CookieSerializeOptions
) {
    const newCookie = cookie.serialize(name, value, options)
    document.cookie = newCookie
}

export function deleteCookie(name: string, path?: string, domain?: string) {
    if (getCookie(name)) {
        document.cookie =
            name +
            '=' +
            (path ? ';path=' + path : '') +
            (domain ? ';domain=' + domain : '') +
            ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
}

export function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}