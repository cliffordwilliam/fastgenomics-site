"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/UseDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const ServicePublicSearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { title: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router, pathname]);
  return (
    <>
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-salte-600" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value ?? "Search for a service"}
          className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 bg-slate-100 focus-visible:ring-slate-200"
          placeholder="Search for a service"
        />
      </div>
    </>
  );
};

export default ServicePublicSearchInput;
