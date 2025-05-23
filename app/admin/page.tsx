"use client";

import { useEffect, useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import FetchedDocs from "@/components/admin/FetchedDocs";
import OpenDoc from "@/components/admin/OpenDoc";

export default function Admin() {
  const [docs, setDocs] = useState([]);
  const [openDocId, setOpenDocId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "docs" | "settings">("dashboard");

  const fetchDocs = async () => {
    const res = await fetch("/api/admin/docs/0");
    if (res.ok) {
      const data = await res.json();
      setDocs(data);
    } else {
      console.error("Failed to fetch docs");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <main className="min-h-[90vh] flex">
      {/* Sidebar */}
      <aside className="w-48 p-4 border-r">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`text-left px-4 py-2 ${
              activeTab === "dashboard" ? "font-bold" : ""
            }`}
          >
            🧠 Dashboard
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`text-left px-4 py-2 ${
              activeTab === "docs" ? "font-bold" : ""
            }`}
          >
            📄 Docs
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-left px-4 py-2 ${
              activeTab === "settings" ? "font-bold" : ""
            }`}
          >
            ⚙️ Settings
          </button>
        </div>
      </aside>

      {/* Main View */}
      <div className="flex-1 px-[10vw] pt-[5vh] relative">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">📊 Welcome to Your Dashboard!</h1>
            <p className="text-muted">Here's where your admin insights will go... someday 😎</p>
          </div>
        )}

        {activeTab === "docs" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">📝 Welcome to Your Markdown Editor!</h1>
            <MarkdownEditor onDocCreated={fetchDocs} />
            <FetchedDocs docs={docs} onOpen={setOpenDocId} />
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>
            <p className="text-muted">This is just a placeholder for now ✨</p>
          </div>
        )}

        {openDocId && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-background/75">
            <OpenDoc docId={openDocId} onClose={() => setOpenDocId(null)} />
          </div>
        )}
      </div>
    </main>
  );
}
