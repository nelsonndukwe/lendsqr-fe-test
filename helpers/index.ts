import { User } from "@/types";

export const handlePagination = (
    page: number,
    limit: number,
    users: User[]
): User[] => {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    return users.slice(startIndex, endIndex)
}

export const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    siblingCount = 1,
    sort = "asc"
): (number | "...")[] => {
    const range = (start: number, end: number) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const pages: (number | "...")[] = []

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    pages.push(1)

    if (leftSibling > 2) pages.push("...")

    pages.push(...range(leftSibling, rightSibling))

    if (rightSibling < totalPages - 1) pages.push("...")

    if (totalPages > 1) pages.push(totalPages)

    // 🔒 Enforce uniqueness
    const uniquePages = Array.from(new Set(pages))

    // 🔢 Sort numbers, keep ellipses in place
    const numbers = uniquePages.filter(
        (p): p is number => typeof p === "number"
    )
    const dots = uniquePages.filter(p => p === "...")

    numbers.sort((a, b) => (sort === "asc" ? a - b : b - a))

    return sort === "asc"
        ? [...numbers.slice(0, 1), ...uniquePages.slice(1)]
        : [...numbers, ...dots]
}
