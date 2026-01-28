import { ParamValue } from "next/dist/server/request/params";
import { icons } from "./assets";

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
    { key: "Irorun", label: "Irorun" },
    { key: "Llendersqr", label: "Lendersqr" },
    { key: "paystack", label: "Paystack" },
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
