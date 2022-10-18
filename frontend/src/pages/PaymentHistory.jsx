const Tuition = () => {
  return (
    <table class="table-fixed w-full p-4 text-center">
      <thead>
        <tr>
          <th>Ngày giao dịch</th>
          <th>Số tiền giao dịch</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12/1/2022</td>
          <td>10000000đ</td>
          <td className="text-green-500">Đã nộp</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Tuition;
