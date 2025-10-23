import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";

interface AuditLog {
  action: string;
  resource: string;
  created_at: string;
}

const AuditLogSection: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const res = await fetch("http://llocalhost:3000/gms-core/applicants/audit-log?limit=10&skip=0");
        const data = await res.json();
        setAuditLogs(data);

        // const dummyLogs: AuditLog[] = [
        //   {
        //     action: "Applicant Created",
        //     performedBy: "admin@company.com",
        //     timestamp: "2025-10-20 09:30 AM",
        //   },
        //   {
        //     action: "Salary Updated",
        //     performedBy: "hr@company.com",
        //     timestamp: "2025-10-21 02:45 PM",
        //   },
        //   {
        //     action: "Bank Details Verified",
        //     performedBy: "finance@company.com",
        //     timestamp: "2025-10-21 05:10 PM",
        //   },
        // ];
        // setAuditLogs(dummyLogs);
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
                    {log.resource}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-500">
                    {log.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">
            No audit logs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuditLogSection;
