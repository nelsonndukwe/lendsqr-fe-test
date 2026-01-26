export interface User {
    id: string;
    fullName: string;
    organization: "Lendsqr" | "Lendstar" | "Irorun";
    dateJoined: string; // formatted date string
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    status: "Active" | "Inactive" | "Pending" | "Blacklisted";

    personalInformation: PersonalInformation;
    educationAndEmployment: EducationAndEmployment;
    socials: Socials;
    guarantors: Guarantor[];
}

export interface PersonalInformation {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: "Male" | "Female";
    maritalStatus: "Single" | "Married";
    children: "None" | "1" | "2";
    typeOfResidence:
        | "Parent's Apartment"
        | "Rented Apartment"
        | "Owned Apartment";
}

export interface EducationAndEmployment {
    levelOfEducation: "B.Sc" | "HND" | "M.Sc";
    employmentStatus: "Employed" | "Unemployed" | "Self-employed";
    sectorOfEmployment: "FinTech" | "Healthcare" | "Education" | "Technology";
    durationOfEmployment: "1 year" | "2 years" | "3 years";
    officeEmail: string;
    monthlyIncome: MonthlyIncome;
    loanRepayment: number;
}

export interface MonthlyIncome {
    min: number;
    max: number;
}
export interface Socials {
    twitter: string;
    facebook: string;
    instagram: string;
}
export interface Guarantor {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: "Sister" | "Brother" | "Friend" | "Parent";
}
