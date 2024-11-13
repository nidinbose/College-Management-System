import React from 'react';

const FeeStructure = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">University Fee Structure</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-300">Department</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 1</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 2</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 3</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 4</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 5</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 6</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 7</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Semester 8</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Departments */}
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Computer Engineering</td>
              <td className="px-4 py-2 border-b border-gray-300">$1000</td>
              <td className="px-4 py-2 border-b border-gray-300">$1000</td>
              <td className="px-4 py-2 border-b border-gray-300">$1000</td>
              <td className="px-4 py-2 border-b border-gray-300">$1000</td>
              <td className="px-4 py-2 border-b border-gray-300">$1200</td>
              <td className="px-4 py-2 border-b border-gray-300">$1200</td>
              <td className="px-4 py-2 border-b border-gray-300">$1500</td>
              <td className="px-4 py-2 border-b border-gray-300">$1500</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$10400</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">Electrical Engineering</td>
              <td className="px-4 py-2 border-b border-gray-300">$900</td>
              <td className="px-4 py-2 border-b border-gray-300">$900</td>
              <td className="px-4 py-2 border-b border-gray-300">$900</td>
              <td className="px-4 py-2 border-b border-gray-300">$900</td>
              <td className="px-4 py-2 border-b border-gray-300">$1100</td>
              <td className="px-4 py-2 border-b border-gray-300">$1100</td>
              <td className="px-4 py-2 border-b border-gray-300">$1400</td>
              <td className="px-4 py-2 border-b border-gray-300">$1400</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$9600</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Mechanical Engineering</td>
              <td className="px-4 py-2 border-b border-gray-300">100000</td>
              <td className="px-4 py-2 border-b border-gray-300">$950</td>
              <td className="px-4 py-2 border-b border-gray-300">$950</td>
              <td className="px-4 py-2 border-b border-gray-300">$950</td>
              <td className="px-4 py-2 border-b border-gray-300">$1150</td>
              <td className="px-4 py-2 border-b border-gray-300">$1150</td>
              <td className="px-4 py-2 border-b border-gray-300">$1450</td>
              <td className="px-4 py-2 border-b border-gray-300">$1450</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$9900</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">Civil Engineering</td>
              <td className="px-4 py-2 border-b border-gray-300">$850</td>
              <td className="px-4 py-2 border-b border-gray-300">$850</td>
              <td className="px-4 py-2 border-b border-gray-300">$850</td>
              <td className="px-4 py-2 border-b border-gray-300">$850</td>
              <td className="px-4 py-2 border-b border-gray-300">$1050</td>
              <td className="px-4 py-2 border-b border-gray-300">$1050</td>
              <td className="px-4 py-2 border-b border-gray-300">$1350</td>
              <td className="px-4 py-2 border-b border-gray-300">$1350</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$8700</td>
            </tr>
                    {/* <tr className="bg-gray-200">
              <td className="px-4 py-2 font-semibold border-b border-gray-300">Semester Total</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$3700</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$3700</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$3700</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$3700</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$4500</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$4500</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$5700</td>
              <td className="px-4 py-2 font-semibold border-b border-gray-300">$5700</td>
              <td className="px-4 py-2 font-bold text-center border-b border-gray-300">$35000</td>
            </tr> */}
            {/* Grand Total */}
            <tr>
              <td colSpan="10" className="px-4 py-4 font-bold text-center bg-gray-300">
                Grand Total: $35,000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructure;
