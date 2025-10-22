import React, { useState } from "react";

interface Applicant {
  applicantId: string;
  nric: string;
  accountNo: string;
  bankCode: string;
  salaryBand: string;
}

const sampleApplicants: Applicant[] = [
  {
    applicantId: "ABC12435A",
    nric: "S2356HJF5",
    accountNo: "0425SDF764S",
    bankCode: "CBC234A",
    salaryBand: "A",
  },
  {
    applicantId: "XYZ98765B",
    nric: "S5678JHF2",
    accountNo: "0934DSF234",
    bankCode: "HBC987A",
    salaryBand: "B",
  },
];

const ViewApplicantDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplicants = sampleApplicants.filter((applicant) =>
    applicant.applicantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 mr-3"
        />
        <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
          Submit
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-left text-sm font-medium text-gray-700">
            <th className="py-2 px-2">Applicant ID</th>
            <th className="py-2 px-2">NRIC</th>
            <th className="py-2 px-2">Account No</th>
            <th className="py-2 px-2">Bank Code</th>
            <th className="py-2 px-2">Salary Band</th>
            <th className="py-2 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, idx) => (
            <tr key={idx} className="border-b border-gray-200 text-sm">
              <td className="py-2 px-2">{applicant.applicantId}</td>
              <td className="py-2 px-2">{applicant.nric}</td>
              <td className="py-2 px-2">{applicant.accountNo}</td>
              <td className="py-2 px-2">{applicant.bankCode}</td>
              <td className="py-2 px-2">{applicant.salaryBand}</td>
              <td className="py-2 px-2">
                <button className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-500">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewApplicantDetails;
