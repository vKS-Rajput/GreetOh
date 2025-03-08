"use client"

import { ToolBar } from "./toolbar";

interface WorkSpaceIdLayoutProps {
    children: React.ReactNode;
};

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
    return (

        <div className="h-full">
            <ToolBar />
            {children}
        </div>
    )
}

export default WorkSpaceIdLayout;