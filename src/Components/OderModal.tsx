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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      address,
      phone,
    });

    NotificationManager.success("Thank you for your purchase", "Success !");
    setName("");
    setAddress("");
    setPhone("");
    SetOpenModal(false);
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
