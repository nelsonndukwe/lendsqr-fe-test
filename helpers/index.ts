import { User } from "@/types";

export const handlePagination =  (
    page: number,
    limit: number,
    users: User[]
): User[]=> {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    return users.slice(startIndex, endIndex)
}

export const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    siblingCount = 1
  ): (number | string)[] => {
    const range = (start: number, end: number): number[] =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);
  

    const totalNumbersToShow = siblingCount * 2 + 5;
  
    if (totalPages <= totalNumbersToShow) {
      return range(1, totalPages);
    }
  
    const leftSiblingIndex  = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  
    const shouldShowLeftDots  = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
  
    const parts: (number | string)[] = [];
  
    parts.push(1);
  
    if (shouldShowLeftDots) {
      parts.push("...");
    }
  
    const leftMost = shouldShowLeftDots ? leftSiblingIndex : 2;
    const rightMost = shouldShowRightDots ? rightSiblingIndex : totalPages - 1;
  
    parts.push(...range(leftMost, rightMost));
  
    if (shouldShowRightDots) {
      parts.push("...");
    }
  
    if (rightMost < totalPages) {
      parts.push(totalPages);
    }
  
    return parts;
  };