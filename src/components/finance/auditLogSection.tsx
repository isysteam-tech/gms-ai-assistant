import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import moment from "moment";

interface AuditLog {
  action: string;
  resource: string;
  createdAt: string;
}

const AuditLogSection: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(auditLogs, "log");

  // useEffect(() => {
  //   const fetchAuditLogs = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/gms-core/applicants/audit-log?limit=10&skip=0");
  //       const data = await res.json();
  //       setAuditLogs(data);
  //     } catch (err) {
  //       console.error("Error fetching audit logs:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAuditLogs();
  // }, []);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:3000/gms-core/applicants/audit-log?limit=10&skip=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        const formattedLogs = result.data.map((item: any) => ({
          id: item.id,
          actorId: item.actor_id,
          role: item.request_ctx?.role || "N/A",
          source: item.request_ctx?.source || "N/A",
          action: item.action,
          resource: item.resource,
          purpose: item.purpose,
          decision: item.decision,
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
        ) : auditLogs.length > 0 ? (
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
              {auditLogs.map((log, index) => (
                <tr
                  key={index}
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

                  {/* Timestamp */}
                  <td className="py-3 px-6 text-sm text-gray-500">
                    {log.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">No audit logs found.</p>
        )}
      </div>
    </div>
  );
};

export default AuditLogSection;
