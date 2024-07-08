/** @format */
"use client";
import { useEffect, useRef, useState } from "react";
import { NavbarAdminComponent } from "@/components/navbar";
import Image from "next/image";
import Search from "../../../assets/search.png";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";
import AdminEventCard from "../../../components/admin/adminCard";
import { useDebounce } from "use-debounce";
import moment from "moment";

function Page() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [events, setEvents] = useState([]);

  const initialEvent = {
    event_name: "",
    price: "",
    availability: "",
    end_date: "",
    address: "",
    type: "",
    description: "",
    category_id: "",
    location_id: "",
    promotions: "",
    discount: 0,
    limit: 0,
    discount_enddate: null,
    locations: "",
    image_url: "",
    image: null,
    id: 0,
  };

  const formik = useFormik({
    initialValues: initialEvent,
    onSubmit: () => {
      console.log("test");
      save();
    },
  });
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const save = () => {
    console.log(formik.values);
    const form = new FormData();
    form.append("id", formik.values.id);
    form.append("event_name", formik.values.event_name);
    form.append("image_url", formik.values.image_url);
    form.append("image", formik.values.image);
    form.append("price", formik.values.price);
    form.append("description", formik.values.description);
    form.append("end_date", formik.values.end_date);
    form.append("address", formik.values.address);
    form.append("availability", formik.values.availability);
    form.append("type", formik.values.type);
    form.append("category_id", formik.values.category_id);
    form.append("location_id", formik.values.location_id);
    form.append("discount", formik.values.discount);
    form.append("limit", formik.values.limit);
    form.append("discount_enddate", formik.values.discount_enddate);

    if (formik.values.id) {
      axiosInstance()
        .patch("/events/" + formik.values.id, form)
        .then(() => {
          alert("data berhasil diedit");
          // fetchEvents();
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("ini form");
      console.log(form);
      axiosInstance()
        .post("/events/", form)
        .then(() => {
          alert("event berhasil ditambahkan");
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message);
        });
    }
    // formik.resetForm();
  };

  const hapus = (event) => {
    if (
      window.confirm(
        "Apakah anda yakin menghapus event " + event.event_name + "?"
      )
    )
      axiosInstance()
        .delete("/events/" + event.id)
        .then(() => {
          alert(`Event "${event.event_name}" berhasil dihapus`);
          fetchEvents();
        })
        .catch((err) => console.log(err));
  };

  const fetchEvents = () => {
    axiosInstance()
      .get("/events/", {
        params: {
          event_name: search,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const renderFile = (e) => {
    console.log(e.target.files[0]);
    formik.setFieldValue("image", e.target.files[0]);
  };

  useEffect(() => {
    fetchEvents();
  }, [value]);

  //get location
  const [locations, setLocations] = useState([]);

  const fetchLocation = () => {
    axiosInstance()
      .get("/locations")
      .then((res) => {
        setLocations(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  const upload = useRef(null);

  return (
    <>
      <NavbarAdminComponent />
      <div className="w-full">
        <div className="flex flex-col justify-center max-w-[1000px] w-full items-center m-auto  ">
          <div className="py-5 w-full">
            <div className="flex px-3 items-center gap-3 border-gray-300 border-b w-72  p-2">
              <Image src={Search} alt="" className=" w-3 h-3" />
              <input
                type="text"
                placeholder="Type any events here"
                className=" outline-none "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full">
            <tr className="text-center">
              <th>EVENT ORGANIZER</th>
              <th>IMAGE</th>
              <th>EVENT NAME</th>
              <th>PRICE</th>
              <th>STOCK</th>
            </tr>
            {events.map((event, key) => (
              <AdminEventCard
                {...event}
                key={key}
                // edit={() => edit(event.id)}
                hapus={() => hapus(event)}
              />
            ))}
          </table>
          <div className="w-[full] flex justify-center">
            <form
              id="form"
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <h1 className="font-bold text-2xl mt-6 mb-3">Add Event</h1>
              <div className="flex flex-col gap-1 ">
                <table>
                  <tr>
                    <td> Event Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Event Name"
                        className="border p-1 w-48 lg:w-96 "
                        required
                        id="event_name"
                        value={formik.values.event_name}
                        onChange={formik.handleChange}
                        // onChange={(e) => {
                        //   formik.setFieldValue("product_name", e.target.value);
                        // }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Event Image</td>
                    <td>
                      <input
                        type="file"
                        placeholder="Image URL"
                        className="border p-1 w-48 lg:w-96 hidden"
                        id="image_url"
                        onChange={(e) => renderFile(e)}
                        ref={upload}
                      />
                      <button
                        className="bg-full bg-green-500  w-32 text-white rounded-md "
                        type="button"
                        onClick={() => {
                          upload.current.click();
                        }}
                      >
                        Upload
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td> Event Price</td>
                    <td>
                      <input
                        type="number"
                        placeholder="Event Price"
                        className="border p-1 w-48 lg:w-96"
                        min={0}
                        required
                        id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> Event Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.description}
                        id="description"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Event End Date</td>
                    <td>
                      <input
                        type="datetime-local"
                        id="end_date"
                        required
                        value={moment(formik.values.end_date).format(
                          "YYYY-MM-DD HH:mm"
                        )}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Address"
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.address}
                        id="address"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Available Seats</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Availability"
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.availability}
                        id="availability"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>
                      <select
                        name="type"
                        id="type"
                        placeholder="Type"
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.type}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Type</option>
                        <option value="Paid">Paid</option>
                        <option value="Free">Free</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Category Name</td>
                    <td>
                      <select
                        name="category_id"
                        id="category_id"
                        placeholder="category_id"
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.category_id}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="1">Music</option>
                        <option value="2">Food & Drink</option>
                        <option value="3">Charity & Causes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>
                      <select
                        name="location_id"
                        id="location_id"
                        placeholder=""
                        className="border p-1 w-48 lg:w-96"
                        required
                        value={formik.values.location_id}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select Location</option>
                        {locations.map((location, key) => (
                          <option key={key} value={location.id}>
                            {location.location_name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Discount</td>
                    <td>
                      <input
                        type="number"
                        placeholder=""
                        className="border p-1 w-96"
                        value={formik.values.discount}
                        id="discount"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Limit</td>
                    <td>
                      <input
                        type="number"
                        placeholder=""
                        className="border p-1 w-96"
                        value={formik.values.limit}
                        id="limit"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Promo End Date</td>
                    <td>
                      <input
                        type="datetime-local"
                        id="discount_enddate"
                        value={moment(formik.values.discount_enddate).format(
                          "YYYY-MM-DD HH:mm"
                        )}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr> */}
                </table>
                <tr className="flex gap-10 m-8">
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    // onClick={() => formik.resetForm()}
                  >
                    Clear
                  </button>
                </tr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
