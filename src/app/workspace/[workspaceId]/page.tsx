interface WorkSpaceIdPageProps {
    params: {
        workspaceId: string;
    };
};

const workspaceIdPage = ({params}: WorkSpaceIdPageProps) => {
    return(
        <div>
            ID: {params.workspaceId}
        </div>
    );
}
export default workspaceIdPage;