import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import moment from "moment";

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  createdAt: string;
  purpose: string;
  role: string;
}

const AuditLogSection: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 

  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:3000/gms-core/applicants/audit-log?limit=1000&skip=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const result = await res.json();
        const formattedLogs = result.data.map((item: any) => ({
          id: item.id,
          actorId: item.actor_id,
          role: item.request_ctx?.role || "N/A",
          source: item.request_ctx?.source || "N/A",
          action: item.action,
          purpose: item.purpose,
          createdAt: moment(item.createdAt).format("DD MMM YYYY, hh:mm A"),
        }));

        setAuditLogs(formattedLogs);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const totalPages = Math.ceil(auditLogs.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = auditLogs.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="mt-10 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <AiOutlineClockCircle className="w-5 h-5 text-purple-500" />
          Audit Log
        </h2>
        <p className="text-sm text-gray-500">
          Total Entries:{" "}
          <span className="font-semibold text-purple-600">
            {auditLogs.length}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading logs...</p>
        ) : currentRows.length > 0 ? (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-6">Action</th>
                  <th className="py-3 px-6">Performed By</th>
                  <th className="py-3 px-6">Purpose</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentRows.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-purple-50/60 transition duration-150"
                  >
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700 flex items-center gap-2">
                      <HiOutlineUser className="w-4 h-4 text-gray-500" />
                      {log.resource || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {log.purpose || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {log.role || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-500">
                      {log.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1 ? "bg-purple-500 text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center py-6 text-gray-500">No audit logs found.</p>
        )}
      </div>
    </div>
  );
};

export default AuditLogSection;
