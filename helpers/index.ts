import { FilterValues } from "@/app/components/Table/filter";
import { DetailSection } from "@/app/components/Tabs/detail-section";
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


export const formatGeneralDetails = (user: User | undefined): DetailSection[] => {

    if (!user) return []

    const formattedData = [
        {
            title: "Personal Information",
            items: [
                { label: "Full Name", value: user.fullName },
                { label: "Phone Number", value: user.phoneNumber },
                { label: "Email Address", value: user.email },
                { label: "BVN", value: user.personalInformation.bvn },
                { label: "Gender", value: user.personalInformation.gender },
                { label: "Marital Status", value: user.personalInformation.maritalStatus },
                { label: "Children", value: user.personalInformation.children },
                { label: "Type of Residence", value: user.personalInformation.typeOfResidence },
            ]
        },

        {
            title: "Education and Employment",
            items: [
                { label: "Level of Education", value: user.educationAndEmployment.levelOfEducation },
                { label: "Employment Status", value: user.educationAndEmployment.employmentStatus },
                { label: "Sector of Employment", value: user.educationAndEmployment.sectorOfEmployment },
                { label: "Duration of Employment", value: user.educationAndEmployment.durationOfEmployment },
                { label: "Office Email", value: user.educationAndEmployment.officeEmail },
                { label: "Monthly Income", value: `NGN${Number(user.educationAndEmployment.monthlyIncome.min).toLocaleString()} - NGN${Number(user.educationAndEmployment.monthlyIncome.max).toLocaleString()}` },
                { label: "Loan Repayment", value: user.educationAndEmployment.loanRepayment },
            ]
        },

        {
            title: "Socials",
            items: [
                { label: "Twitter", value: user.socials.twitter },
                { label: "Facebook", value: user.socials.facebook },
                { label: "instagram", value: user.socials.instagram },

            ]
        },

        {
            title: "Guarantors",
            items: user.guarantors.flatMap((guarantor) => [
                {
                    label: `Full Name`,
                    value: guarantor.fullName
                },
                {
                    label: `Phone number`,
                    value: guarantor.phoneNumber
                },
                {
                    label: `Email address`,
                    value: guarantor.emailAddress
                },
                {
                    label: `Relationship`,
                    value: guarantor.relationship
                },
            ])
        }


    ]
    return formattedData

}


export const random = (Math.random() * 5) + 1




export const filterUsers = (
    users: User[],
    filters: FilterValues
): User[] => {
    return users.filter(user => {

        if (
            filters.organization &&
            user.organization !== filters.organization
        ) {
            return false;
        }

        if (
            filters.username && filters.username
                .toLowerCase()
                .includes(filters.username.toLowerCase())
        ) {
            return false;
        }

        if (
            filters.email &&
            !user.email.toLowerCase().includes(filters.email.toLowerCase())
        ) {
            return false;
        }

        if (
            filters.phone &&
            !user.phoneNumber.includes(filters.phone)
        ) {
            return false;
        }

        if (filters.date) {
            const userDate = new Date(user.status);
            const filterDate = new Date(filters.date);

            if (userDate.toDateString() !== filterDate.toDateString()) {
                return false;
            }
        }

        if (filters.status && user.status !== filters.status) {
            return false;
        }

        return true;
    });
};
