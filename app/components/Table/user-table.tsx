"use client";

import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/actions/sign-in";
import { User } from "@/types";
import MyTable from "./base-table";

function TableComponent() {
    const rerender = React.useReducer(() => ({}), {})[1];
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<"success" | "error" | "idle">();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setData(data);

                setLoading(false);
                setResponse("success");
            } catch (error) {
                setResponse("error");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <MyTable users={data.slice(0,10)} />
        </>
    );
}

export default TableComponent;
