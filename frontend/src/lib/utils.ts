export function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.toLocaleString("default", { month: "short" })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
}