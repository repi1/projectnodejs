// /** @format */
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useFormik } from "formik";
// import { axiosInstance } from "@/axios/axios";
// import moment from "moment";
// import Modal from "@mui/material/Modal";
// import { Box } from "@mui/material";

// /** @format */
// export function PromoComp({ event }) {
//   // const [discount, setDiscount] = useState("");
//   // const [limit, setLimit] = useState("");
//   // const [enddate, setEnddate] = useState("");

//   // const save = () => {
//   //   axiosInstance()
//   //     .post("/promotions/", {
//   //       discount,
//   //       limit: Number(limit),
//   //       end_date: new Date(enddate),
//   //       event_id: eventid,
//   //     })
//   //     .then(() => {
//   //       alert("promo berhasil ditambahkan");
//   //       // fetchPromotion();
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       alert(err.response?.data?.message);
//   //     });

//   //   formik.resetForm();
//   // };

//   const [events, setEvents] = useState([]);
//   const initialPromo = {
//     discount: "",
//     limit: "",
//     end_date: "",
//     event_id: "",
//   };

//   const formik = useFormik({
//     initialValues: initialEvent,
//     onSubmit: () => {
//       console.log("test");
//       save();
//     },
//   });
//   useEffect(() => {
//     console.log(formik.values);
//   }, [formik.values]);

//   const edit = async (id) => {
//     const res = await axiosInstance().get("/promotions/" + event.id);
//     const events = res.data.result;
//     formik.setFieldValue("id", events.id);
//     formik.setFieldValue("event_name", events.event_name);
//     formik.setFieldValue("image_url", events.image_url);
//     formik.setFieldValue("price", events.price);
//     formik.setFieldValue("description", events.description);
//   };
//   useEffect(() => {
//     edit();
//   }, []);

//   const save = () => {
//     console.log(formik.values);
//     const form = new FormData();
//     form.append("id", formik.values.id);
//     form.append("event_name", formik.values.event_name);
//     form.append("image_url", formik.values.image_url);
//     form.append("image", formik.values.image);
//     form.append("price", formik.values.price);
//     form.append("description", formik.values.description);

//     form.append("end_date", formik.values.end_date);
//     form.append("address", formik.values.address);
//     form.append("availability", formik.values.availability);
//     form.append("type", formik.values.type);
//     form.append("category_id", formik.values.category_id);
//     form.append("location_id", formik.values.location_id);

//     // if (formik.values.id) {
//     axiosInstance()
//       .patch("/events/" + formik.values.id, form)
//       .then(() => {
//         alert("data berhasil diedit");
//         // fetchEvents();
//         location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // } else {
//     //   console.log("ini form");
//     //   console.log(form);
//     //   axiosInstance()
//     //     .post("/events/", form)
//     //     .then(() => {
//     //       alert("data berhasil ditambahkan");
//     //       fetchEvents();
//     //     })
//     //     .catch((err) => {
//     //       console.log(err);
//     //       alert(err.response?.data?.message);
//     //     });
//     // }
//     formik.resetForm();
//   };

//   const hapus = (id) => {
//     if (window.confirm("apakah anda yakin menghapus event id " + id + "?"))
//       axiosInstance()
//         .delete("/events/" + id)
//         .then(() => {
//           alert(`id ${id} berhasil dihapus`);
//           fetchEvents();
//         })
//         .catch((err) => console.log(err));
//   };

//   const fetchEvents = () => {
//     axiosInstance()
//       .get("/events/", {
//         params: {
//           event_name: search,
//         },
//       })
//       .then((res) => {
//         setEvents(res.data.result);
//       })
//       .catch((err) => console.log(err));
//   };

//   // const hapus = (id) => {
//   //   if (window.confirm("apakah anda yakin menghapus event id " + id + "?"))
//   //     axiosInstance()
//   //       .delete("/events/" + id)
//   //       .then(() => {
//   //         alert(`id ${id} berhasil dihapus`);
//   //         fetchEvents();
//   //       })
//   //       .catch((err) => console.log(err));
//   // };

//   // const fetchPromotion = () => {
//   //   axiosInstance()
//   //     .get("/promotions")
//   //     .then((res) => {
//   //       setEvents(res.data.result);
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   // useEffect(() => {
//   //   fetchPromotion();
//   // }, [value]);

//   return (
//     <>
//       <div className="w-full">
//         <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
//           <div className="w-full py-3">
//             <form id="form" action="" onSubmit={save}>
//               <h1 className="font-bold text-2xl mb-3">Add Promotion</h1>
//               <div className="flex flex-col gap-1 ">
//                 <table className="border-separate border-spacing-4">
//                   <tr>
//                     <td>Discount</td>
//                     <td>
//                       <input
//                         type="text"
//                         placeholder="Amount"
//                         className="border p-1  w-96 "
//                         required
//                         id="discount"
//                         // value={formik.values.discount}
//                         value={discount}
//                         onChange={(e) => setDiscount(e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Limit</td>
//                     <td>
//                       <input
//                         type="number"
//                         placeholder="Limit Usage"
//                         className="border p-1 w-96"
//                         min={1}
//                         required
//                         id="limit"
//                         // value={formik.values.limit}
//                         // onChange={formik.handleChange}
//                         value={limit}
//                         onChange={(e) => setLimit(e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>End Date</td>
//                     <td>
//                       <input
//                         type="datetime-local"
//                         id="end_date"
//                         required
//                         value={moment(enddate).format("YYYY-MM-DD HH:mm")}
//                         onChange={(e) => setEnddate(e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                 </table>
//                 <tr className="flex gap-2">
//                   <button
//                     className="bg-black text-white p-1 px-2 rounded-md w-24 "
//                     type="submit"
//                   >
//                     submit
//                   </button>
//                   {/* <button
//                     className="bg-black text-white p-1 px-2 rounded-md w-24 "
//                     onClick={() => formik.resetForm()}
//                   >
//                     clear
//                   </button> */}
//                 </tr>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export function PromotionModal({ id, open, handleClose }) {
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     width: "50%",
//     transform: "translate(-50%, -50%)",
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };
//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div className="flex flex-col w-2/3">
//             <button
//               className="absolute top-1 right-1 text-red-600"
//               type="button"
//               variant="contained"
//               onClick={handleClose}
//             >
//               X
//             </button>
//             <PromoComp id={id} />
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export function PromotionComponent({ id }) {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   return (
//     <>
//       <div className=" items-center">
//         <button
//           type="button"
//           className="text-white bg-black hover:bg-gray-200 border-black hover:text-black w-32 h-14"
//           variant="contained"
//           onClick={handleOpen}
//         >
//           Add/Edit Promotion
//         </button>
//         <PromotionModal id={id} open={open} handleClose={handleClose} />
//       </div>
//     </>
//   );
// }
