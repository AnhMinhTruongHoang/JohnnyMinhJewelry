import { FormEvent, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

interface IProps {
  openModal: boolean;
  SetOpenModal: (v: boolean) => void;
}

export default function JewelryPurchase({ openModal, SetOpenModal }: IProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  //// send mail

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          msg,
        }),
      });

      if (res.ok) {
        NotificationManager.success("Thank you for your purchase", "Success!");
        // reset form
        setName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setMsg("");
        SetOpenModal(false);
      } else {
        NotificationManager.error("Failed to send email", "Error");
      }
    } catch (err) {
      console.error(err);
      NotificationManager.error("Something went wrong", "Error");
    }
  };

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
          <div
            className="relative w-full max-w-md rounded-lg p-6 shadow-lg"
            style={{ backgroundColor: "beige" }}
          >
            <button
              onClick={() => SetOpenModal(false)}
              className="absolute right-3 top-3 text-red-600 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="mb-4 text-center text-2xl font-bold">
              Purchase Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded border border-gray-500 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded border border-gray-500 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  className="w-full rounded border border-gray-500 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-600"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded border border-gray-500 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-600"
                  value={phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setPhone(onlyNums);
                  }}
                  required
                />
              </div>

              {/* Optional message */}
              <div>
                <label htmlFor="msg" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="msg"
                  placeholder="Leave a note..."
                  className="w-full rounded border border-gray-500 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-600"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded bg-slate-400 py-2 text-gray-800 transition hover:bg-green-700"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
      <NotificationContainer />
    </>
  );
}
