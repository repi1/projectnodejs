"use client";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { TransactionButton } from "./transactionButton";
import { CiShoppingCart } from "react-icons/ci";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "90%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function PaymentModal({ event, open, handleClose }) {
  function displayPrice(event) {
    if (event.price == 0) {
      return ` 0`;
    }
    if (event.discount) {
      return ` IDR ${event.price - event.discount}`;
    } else {
      return ` IDR ${event.price}`;
    }
  }
  function checkPrice(event) {
    if (event.price == 0) {
      return ``;
    } else {
      return `Price: IDR ${event.price}`;
    }
  }
  function checkDiscount(event) {
    if (event.discount == null) {
      return ``;
    } else {
      return `Discount: IDR ${event.discount}`;
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col w-2/3">
            <button
              className="absolute top-1 right-1 text-red-600"
              type="button"
              variant="contained"
              onClick={handleClose}
            >
              X
            </button>
            <h1 className="text-2xl font-bold pb-2">Ringkasan Belanja</h1>
            <p className="">Event Name: {event.event_name}</p>
            <p>Quantity: 1</p>
            <p>{checkPrice(event)}</p>
            <p>{checkDiscount(event)}</p>
            <p>Final Price: {displayPrice(event)}</p>
            <TransactionButton event={event} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export function PaymentComponent({ event }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className=" items-center">
        <button
          type="button"
          className="h-[40px] mt-1 text-[12.5px] border w-[216px] rounded-lg text-white bg-green-600 hover:bg-green-500 flex justify-center items-center"
          variant="contained"
          onClick={handleOpen}
        >
          <p className="text-lg font-light">(1)</p>
          <CiShoppingCart className="text-3xl" />
        </button>
        <PaymentModal event={event} open={open} handleClose={handleClose} />
      </div>
    </>
  );
}
