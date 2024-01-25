
export function formatHMS(date) {
    return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].map(x => x.toString().padStart(2, '0')).join(':');
}
