import Image from "next/image";
import Link from "next/link";
import ActionDropdown from "@/components/filecomponent/ActionDropdown";
import { Chart } from "@/components/filecomponent/Chart";
import FormattedDateTime from "@/components/filecomponent/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import {getTotalSpaceUsed, getUserFiles} from "@/lib/actions/fire.files.actions";
import { convertFileSize, getNewUsageSummary } from "@/lib/utils";
import {getCurrentUser} from "@/lib/actions/auth.actions";

const Files = async () => {
    // Fetch files
    const data = await getUserFiles({ types: [], sort: "createdAt-desc", limit: 10 });

    const totalUsedSpace = await getTotalSpaceUsed()
    // Convert Firestore timestamps to plain values (ISO strings)
    const plainData = data.map((file: any) => ({
        ...file,
        createdAt: file.createdAt?.seconds
            ? new Date(file.createdAt.seconds * 1000).toISOString()
            : file.createdAt,
        updatedAt: file.updatedAt?.seconds
            ? new Date(file.updatedAt.seconds * 1000).toISOString()
            : file.updatedAt,
    }));

    // Total used size
    const files = plainData.filter((file: any) => file.size);
    const totalSize = files.reduce((acc, file) => {
        return acc + file.size;
    }, 0);
    // Get breakdown of types
    const usageSummary = getNewUsageSummary(totalSize);
    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    };
    return (
        <div className="dashboard-container">
            <section>
                <Chart used={totalSize.used} />

                <ul className="dashboard-summary-list">
                    {usageSummary.map((summary: any) => (
                        <Link href={summary.url} key={summary.title} className="dashboard-summary-card">
                            <div className="space-y-4">
                                <div className="flex  justify-between gap-3">
                                    <Image
                                        src={summary.icon}
                                        width={100}
                                        height={100}
                                        alt="uploaded image"
                                        className="summary-type-icon "
                                    />
                                    <h4 className="summary-type-size">{formatSize(totalSize || 0)}</h4>
                                </div>
                                <h5 className="summary-type-title">{summary.title}</h5>
                                <Separator className="bg-light-400" />
                                <FormattedDateTime date={summary?.createdAt?.toDate?.toLocaleString()} className="text-center" />
                            </div>
                        </Link>
                    ))}
                </ul>
            </section>

            <section className="dashboard-recent-files">
                <h2 className="h3 xl:h2 ">Recent files uploaded</h2>
                {plainData.length > 0 ? (
                    <ul className="mt-5 flex flex-col gap-5">
                        {plainData.map((file: any) => (
                            <Link href={file.url} target="_blank" className="flex items-center gap-3" key={file.id}>
                                <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                                <div className="recent-file-details">
                                    <div className="flex flex-col gap-1">
                                        <p className="recent-file-name">{file.name}</p>
                                        <FormattedDateTime date={file.createdAt} className="caption" />
                                    </div>
                                    <ActionDropdown file={file} />
                                </div>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-list">No files uploaded</p>
                )}
            </section>
        </div>
    );
};

export default Files;


