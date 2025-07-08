"use client";

import React from "react";

type PageHeaderProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export default function PageHeader({ title, path, children }: PageHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{path}</p>
        <h1 className="text-2xl font-semibold text-[var(--primary)]">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
