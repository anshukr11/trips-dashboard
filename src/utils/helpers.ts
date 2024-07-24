export const calculatePercentage = (count: number, total: number) => {
    return `${Math.floor((count/total)*100)}%`
}