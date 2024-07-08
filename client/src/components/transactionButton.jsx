"use client";

import { useRouter } from "next/router";
import { axiosInstance } from "@/axios/axios";

export function TransactionButton({ event }) {
  // const router = useRouter();
  function save() {
    if (window.confirm("Apa yakin beli tiket ini?")) {
      axiosInstance()
        .post("/transactions", {
          qty: 1,
          total: event.price,
          event_id: event.id,
        })
        .then((response) => {
          axiosInstance().patch(`/events/${event.id}`, {
            availability: event.availability - 1,
          });
          alert("tiket berhasil dibeli");
          // location.reload();
        })
        .catch((error) => {
          console.error("Error saving transaction:", error);
          alert("Terjadi kesalahan saat membeli tiket.");
        });
    }
  }

  return (
    <button
      type="submit"
      className="mt-2 h-[49px] border w-[168px] rounded-lg text-white bg-green-600 hover:bg-green-400 "
      onClick={save}
    >
      Confirm Payment
    </button>
  );
}
