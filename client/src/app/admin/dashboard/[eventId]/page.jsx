import { NavbarAdminComponent } from "../../../../components/navbar";
import { axiosInstanceSSR } from "@/axios/axios";
import { EditEvent } from "../../../../components/admin/editevent";
import { PromotionComponent } from "../../../../components/promotion";

export const metadata = {
  title: "Event Detail",
  description: "tempat jualan tiket :)",
};

export async function Page({ params }) {
  const { eventId } = params;
  const event = (await axiosInstanceSSR().get("events/" + eventId)).data.result;
  console.log(event);

  return (
    <>
      <NavbarAdminComponent />
      <div className="grid grid-cols-2 justify-center max-w-screen-2xl w-full px-24 py-2">
        <div className="hidden lg:grid">
          {/* <h1 className="font-bold text-2xl mt-6 mb-3">Event Details</h1> */}
          <img
            className="w-2/3 pt-16"
            src={process.env.API_URL + event.image_url}
            alt=""
          />
          {/* <table>
            <thead>
              <tr className="text-left">
                <th>Event Name</th>
                <td>{event.event_name}</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left">
                <th>Price</th>
                <td>{event.price}</td>
              </tr>
              <tr className="text-left">
                <th>Description</th>
                <td>{event.description}</td>
              </tr>
              <tr className="text-left">
                <th>Event End Date</th>
                <td>{event.end_date}</td>
              </tr>
              <tr className="text-left">
                <th>Address</th>
                <td>{event.address}</td>
              </tr>
              <tr className="text-left">
                <th>Available Seats</th>
                <td>{event.availability}</td>
              </tr>
              <tr className="text-left">
                <th>Type</th>
                <td>{event.type}</td>
              </tr>
              <tr className="text-left">
                <th>Category</th>
                <td>{event.categories.category_name}</td>
              </tr>
              <tr className="text-left">
                <th>Location</th>
                <td>{event.locations.location_name}</td>
              </tr>

              <h1 className="font-bold text-2xl my-3">Event Details</h1>
              <tr className="text-left">
                <th>Discount</th>
                <td>{event.discount}</td>
              </tr>
              <tr className="text-left">
                <th>Limit</th>
                <td>{event.limit}</td>
              </tr>
              <tr className="text-left">
                <th>Discount End Date</th>
                <td>{event.discount_enddate}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div className="">
          <EditEvent
            event={event}
            // edit={() => edit(event.id)}
            // hapus={() => hapus(event.id)}
          />
        </div>
      </div>
    </>
  );
}
export default Page;
