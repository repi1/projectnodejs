import Link from "next/link";

function AdminEventCard({
  id,
  users,
  event_name,
  price,
  image_url,
  availability,
  // edit,
  hapus,
}) {
  return (
    <tr className="text-center">
      <td className="text-left">{users.name}</td>
      <td>
        <Link className="flex flex-col" href={"dashboard/" + id}>
          <img
            src={process.env.API_URL + image_url}
            alt=""
            className=" w-24 h-24 object-cover"
          />
        </Link>
      </td>
      <td className="text-left">{event_name}</td>
      <td className=" font-semibold">
        IDR {Number(price).toLocaleString("id-ID")}
      </td>
      <td>{availability}</td>
      <td className="flex mt-3 ml-5 justify-center items-center h-[70px]">
        <button
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-red-500 border-black hover:text-black"
          onClick={hapus}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default AdminEventCard;
