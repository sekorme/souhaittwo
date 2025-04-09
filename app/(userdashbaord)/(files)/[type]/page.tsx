"use client";

import React, { useEffect, useState } from "react";

import { FileType, SearchParamProps } from "@/types";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/fire.files.actions";
import { getFileTypesParams } from "@/lib/utils";
import Card from "@/components/Card";

const Page = (props: SearchParamProps) => {
  const unwrappedParams = React.use(props.params);
  const unwrappedSearchParams = React.use(props.searchParams);

  const [totalSize, setTotalSize] = useState(0);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const type = unwrappedParams?.type || "";
      const searchText = unwrappedSearchParams?.query || "";
      const sort = unwrappedSearchParams?.sort || "createdAt-desc";

      const types = getFileTypesParams(type) as FileType[];

      const filesData = await getFiles({
        types,
        searchText,
        sort,
        limit: 20,
      });

      const totalSpaceData = await getTotalSpaceUsed();

      setTotalSize(totalSpaceData.used / (1024 * 1024)); // bytes to MB

      setFiles(filesData);
    };

    fetchFiles();
  }, [unwrappedSearchParams, unwrappedParams]);




  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">
          {unwrappedParams?.type || "All Files"}
        </h1>

        <div className="total-size-section">
          <p className="h5">
            Total: <span>{totalSize.toFixed(2)} MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.length > 0 ? (
        <section className="file-list">
          {files.map((file: any) => (
            <Card key={file.id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
