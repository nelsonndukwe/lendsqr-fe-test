import { ParamValue } from "next/dist/server/request/params";
import { icons } from "./assets";
import { DetailSection } from "@/app/components/Tabs/detail-section";

export const getRoutes = (id: ParamValue, pathName: string) => {
    const routes = [
        {
            customer: "Customer",
            routes: [
                {
                    title: "Users",
                    href: `/${id}/users`,
                    Icon: icons.sideUser,
                    active: pathName.includes(`/${id}/users`),
                },
                {
                    title: "Guarantors",
                    href: `/${id}/guarantors`,
                    Icon: icons.gurantor,
                    active: pathName.includes(`/${id}/guarantors`),
                },
                {
                    title: "Decision Models",
                    href: `/${id}/decision-models`,
                    Icon: icons.decisionModels,
                    active: pathName.includes(`/${id}/decision-models`),
                },
                {
                    title: "Savings",
                    href: "/id/savings",
                    Icon: icons.savings,
                    active: pathName.includes(`/${id}/savings`),
                },
                {
                    title: "Loan Requests",
                    href: `/${id}/loan-requests`,
                    Icon: icons.loanRequests,
                    active: pathName.includes(`/${id}/loan-requests`),
                },
                {
                    title: "Whitelist",
                    href: `/${id}/whitelist`,
                    Icon: icons.whitelist,
                    active: pathName.includes(`/${id}/whitelist`),
                },
                {
                    title: "Karma",
                    href: "/id/karma",
                    Icon: icons.karma,
                    active: pathName.includes(`/${id}/karma`),
                },
            ],
        },

        {
            customer: "Business",
            routes: [
                {
                    title: "Organization",
                    href: `/${id}/organizations`,
                    Icon: icons.organizations,
                    active: pathName.includes(`/${id}/organizations`),
                },
                {
                    title: "Loan Products",
                    href: `/${id}/loan-products`,
                    Icon: icons.loanProducts,
                    active: pathName.includes(`/${id}/loan-products`),
                },
                {
                    title: "Savings products",
                    href: "/id/savings-products",
                    Icon: icons.savingsProducts,
                    active: pathName.includes(`/${id}/savings-products`),
                },
                {
                    title: "Fees and Charges",
                    href: `/${id}/fees-and-charges`,
                    Icon: icons.feesAndCharges,
                    active: pathName.includes(`/${id}/fees-and-charges`),
                },
                {
                    title: "Transactions",
                    href: `/${id}/transactions`,
                    Icon: icons.transactions,
                    active: pathName.includes(`/${id}/services`),
                },
                {
                    title: "Services",
                    href: `/${id}/services`,
                    Icon: icons.services,
                    active: pathName.includes(`/${id}/services`),
                },
                {
                    title: "Service Accounts",
                    href: `/${id}/service-accounts`,
                    Icon: icons.serviceAccounts,
                    active: pathName.includes(`/${id}/service-accounts`),
                },

                {
                    title: "Settlements",
                    href: `/${id}/settlements`,
                    Icon: icons.settlements,
                    active: pathName.includes(`/${id}/settlements`),
                },
                {
                    title: "Reports",
                    href: `/${id}/reports`,
                    Icon: icons.reports,
                    active: pathName.includes(`/${id}/reports`),
                },
            ],
        },

        {
            customer: "Settings",
            routes: [
                {
                    title: "Preferences",
                    href: `/${id}/preferences`,
                    Icon: icons.preferences,
                    active: pathName.includes(`/${id}/preferences`),
                },
                {
                    title: "Fees and Pricing",
                    href: `/${id}/fees-and-pricing`,
                    Icon: icons.fessAndPricing,
                    active: pathName.includes(`/${id}/fees-and-pricing`),
                },
                {
                    title: "Audit logs",
                    href: `/${id}/audit-logs`,
                    Icon: icons.AuditLogs,
                    active: pathName.includes(`/${id}/audit-logs`),
                },
                {
                    title: "System Messages",
                    href: `/${id}/system-messages`,
                    Icon: icons.systemMessages,
                    active: pathName.includes(`/${id}/system-messages`),
                },
            ],
        },
    ];

    return routes;
};

export const organizations = [
    { value: "Irorun", label: "Irorun" },
    { value: "Llendersqr", label: "Lendersqr" },
    { value: "paystack", label: "Paystack" },
];

export const userMetrics = [
    { label: "Users", count: 2453, icon: icons.users },
    { label: "Active Users", count: 2453, icon: icons.activeUser },
    { label: "Users with Loans", count: 12453, icon: icons.userWithLoans },
    {
        label: "Users with Savings",
        count: 102453,
        icon: icons.usersWithSavings,
    },
];



export const pageSizeOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
  ]


  export const generalDetails: DetailSection[] = [
    {
        title: "Personal Information",
        items: [
            { label: "Full Name", value: "Grace Effiom" },
            { label: "Phone Number", value: "07060780922" },
            { label: "Email Address", value: "grace@gmail.com" },
            { label: "BVN", value: "07060780922" },
            { label: "Gender", value: "Female" },
            { label: "Marital Status", value: "Single" },
            { label: "Children", value: "None" },
            { label: "Type of Residence", value: "Parent’s Apartment" },
        ]
    },
    {
        title: "Education and Employment",
        items: [
            { label: "Level of Education", value: "B.Sc" },
            { label: "Employment Status", value: "Employed" },
            { label: "Sector of Employment", value: "FinTech" },
            { label: "Duration of Employment", value: "2 years" },
            { label: "Office Email", value: "grace@lendstar.com" },
            { label: "Monthly Income", value: "₦200,000.00 - ₦400,000.00" },
            { label: "Loan Repayment", value: "₦40,000" },
        ]
    }
];
