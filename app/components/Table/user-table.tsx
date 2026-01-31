"use client";

import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/actions/sign-in";
import { User } from "@/types";
import MyTable from "./base-table";
import { handlePagination } from "@/helpers";
import Pagination from "./pagination";

function TableComponent() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<"success" | "error" | "idle">();
    const [page, setPage] = useState(1)

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
        <div >
            <MyTable loading={loading} users={handlePagination(page, 8, data)} />
            {
                !loading &&

                <Pagination
                    totalItems={data.length}
                    pageSize={8}
                    currentPage={page}
                    onPageChange={setPage}
                />
            }
        </div >
    );
}

export default TableComponent;
