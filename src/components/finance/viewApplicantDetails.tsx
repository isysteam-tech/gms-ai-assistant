import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { HiOutlineUser, HiOutlineDocumentText } from "react-icons/hi";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineAccountBalance } from "react-icons/md";

interface Applicant {
  applicantId: string;
  nric: string;
  accountNo: string;
  bankCode: string;
  salaryBand: string;
}

const ViewApplicantDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchApplicants = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {

  //       const response = await fetch(
  //         "http://localhost:3000/gms-core/applicants/644ad9b3-31e3-45e7-8b52-3fab6905ac13"
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       // Convert API data to match table structure
  //       const formattedApplicant: Applicant = {
  //         applicantId: data.name || "N/A",
  //         nric: data.nric || "N/A",
  //         accountNo: data.bank_acc || "N/A",
  //         bankCode: data.bank_code || "N/A",
  //         salaryBand: data.salary ? getSalaryBandFromSalary(data.salary) : "N/A",
  //       };
  //       setApplicants([formattedApplicant]);
  //     } catch (err: any) {
  //       setError(err.message || "Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchApplicants();
  // }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); 

        const response = await fetch(
          "localhost:3000/gms-core/applicants/?limit=10&skip=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedApplicant: Applicant = {
          applicantId: data.name || "N/A",
          nric: data.nric || "N/A",
          accountNo: data.bank_acc || "N/A",
          bankCode: data.bank_code || "N/A",
          salaryBand: data.salary
            ? getSalaryBandFromSalary(data.salary)
            : "N/A",
        };

        setApplicants([formattedApplicant]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const getSalaryBandFromSalary = (salary: number): string => {
    if (salary >= 9000) return "A";
    if (salary >= 5000) return "B";
    if (salary >= 2000) return "C";
    return "D";
  };

  const getSalaryBandColor = (band: string) => {
    switch (band) {
      case "A":
        return "bg-green-100 text-green-700 border-green-200";
      case "B":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "C":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  const filteredApplicants = applicants.filter((applicant) =>
    applicant.applicantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Applicant ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
        </div>
        <button className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
          <AiOutlineSearch className="w-5 h-5" />
          Search
        </button>
      </div>
      {loading && (
        <p className="text-center text-gray-500 py-10">
          Fetching applicants...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 py-10">Error: {error}</p>
      )}

      {/* Results Info */}
      {!loading && !error && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-purple-600">
                {filteredApplicants.length}
              </span>{" "}
              applicant(s)
            </p>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <HiOutlineUser className="w-4 h-4" />
                        Applicant ID
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <HiOutlineDocumentText className="w-4 h-4" />
                        NRIC
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <MdOutlineAccountBalance className="w-4 h-4" />
                        Account No
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <BsBank2 className="w-4 h-4" />
                        Bank Code
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Salary Band
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-purple-50/50 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                          {applicant.applicantId}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {applicant.nric}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-mono">
                          {applicant.accountNo}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-mono">
                          {applicant.bankCode}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getSalaryBandColor(
                              applicant.salaryBand
                            )}`}
                          >
                            Band {applicant.salaryBand}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            <AiOutlineEye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 px-6 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <AiOutlineSearch className="w-12 h-12 text-gray-300" />
                          <p className="text-lg font-medium">
                            No applicants found
                          </p>
                          <p className="text-sm">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewApplicantDetails;
