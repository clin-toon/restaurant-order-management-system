"use client";

import { useState } from "react";
import { SortOptionA } from "@/types/admin.types";
import { MessageSquare, Clock, CheckCheck, Inbox } from "lucide-react";
import ContactCard from "./ContactCard";
import FilterBar from "./FilterBar";

const ContactPageClient = ({ item }: any) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOptionA>("latest");

  const pending = item.filter((q: any) => q.status === "pending").length;
  const replied = item.filter((q: any) => q.status === "replied").length;

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <MessageSquare size={18} className="text-stone-700" />
              <h1 className="text-xl font-black text-stone-900 tracking-tight">
                Contact Queries
              </h1>
            </div>
            <p className="text-sm text-stone-400">
              Messages sent through the contact form
            </p>
          </div>

          {/* Summary pills */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Clock size={11} />
              {pending} Pending
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCheck size={11} />
              {replied} Replied
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              {item.length} Total
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <FilterBar
          search={search}
          sort={sort}
          total={item.length}
          onSearch={setSearch}
          onSort={setSort}
        />

        {/* ── Grid ── */}
        {item.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
              <Inbox size={28} className="text-stone-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-700">
                No queries found
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try adjusting your filters
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.map((query: any, idx: any) => (
              <ContactCard key={query.c_id} query={query} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPageClient;
