import Link from "next/link";

function TransactionCard({ users, events, invoice_no, qty, total }) {
  return (
    <tr className="text-center">
      <td className="text-left">{users.name}</td>
      <td className="text-left">{events.event_name}</td>
      <td className="text-left">{invoice_no}</td>
      <td className="text-left">{qty}</td>
      <td className="text-left">IDR {total}</td>
    </tr>
  );
}
export default TransactionCard;
