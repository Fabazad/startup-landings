"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "src/routes/hooks/use-search-params";
import { MyWishLists } from "./MyWishLists";
import { MyArchivedWishLists } from "./MyArchivedWishLists";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const tabIndexMapping: Record<string, number> = {
    "my-lists": 0,
    "followed-lists": 1,
    "archived-lists": 2,
    "my-reservations": 3,
    "all-wishes": 4,
}

const getTabIndex = (tabName: string | null) => {
    if (!tabName) return 0;
    return tabIndexMapping[tabName];
}

const getTabName = (tabIndex: number) => {
    return Object.keys(tabIndexMapping).find(key => tabIndexMapping[key] === tabIndex) || "my-lists";
}

export const MyLists = () => {

    const tabName = useSearchParams().get("tab");

    const [value, setValue] = useState(getTabIndex(tabName));
    const router = useRouter();

    useEffect(() => {
        setValue(getTabIndex(tabName));
    }, [tabName]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        router.push(`?tab=${getTabName(newValue)}`);
    };

    return (
        <Box>
            <h1>Mes listes de souhaits</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Mes listes" />
                        <Tab label="Listes suivies" />
                        <Tab label="Listes archivées" />
                        <Tab label="Mes réservations" />
                        <Tab label="Tous mes souhaits" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <MyWishLists />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <MyArchivedWishLists />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Item Four
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    Item Five
                </CustomTabPanel>
            </Box>
        </Box>
    );
};