'use client';

import { useEffect, useState, use } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { getUserFiles } from "@/lib/actions/fire.files.actions";
import Card from "@/components/Card";
import { SearchParamProps } from "@/types";
import {useParams} from "next/navigation";
import {getFileTypesParams} from "@/lib/utils";
type FileType = "document" | "image" | "video" | "audio" | "other";

export default function Page() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<any[]>([]);
  const [sort, setSort] = useState("createdAt-desc");

  const params = useParams();
  const type = params?.type || "";
    const types = getFileTypesParams(type) as FileType[];

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await getUserFiles({
          searchText,
          types: types,
          sort,
        });
        setFiles(data);
      } catch (error) {
        console.error("Error loading files:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, [searchText, typeFilter, sort]);

  return (
      <div className="p-4 space-y-6">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input
              placeholder="Search files by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
          />

          <Select onValueChange={(val) => setSort(val)} defaultValue={sort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest</SelectItem>
              <SelectItem value="createdAt-asc">Oldest</SelectItem>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : files.length === 0 ? (
            <div className="text-center text-muted-foreground">No files found.</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((file) => (
                  <Card key={file.id} file={file} />

              ))

              }
            </div>
        )}
      </div>
  );
}