import React from "react";

const Table = () => {
  return (
    <table className="border-collapse border border-slate-500 w-full">
      <thead>
        <tr>
          <th className="border border-slate-600 ">Tổng tiền học phí</th>
          <th className="border border-slate-600 ...">
            Tổng tiền học phí đã nộp
          </th>
          <th className="border border-slate-600 ...">Số tiền còn phải nộp</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td className="border border-slate-700 text-red-500 font-semibold">
            13.000.000đ
          </td>
          <td className="border border-slate-700 text-red-500 font-semibold">
            13.000.000đ
          </td>
          <td className="border border-slate-700 text-red-500 font-semibold">
            0đ
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
