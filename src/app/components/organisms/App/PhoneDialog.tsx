import React, { useState } from "react";
import LoginDialog from "@/atoms/Login/LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { appSlice, setState } from "@/features/app/appSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useUpdateUserMutation } from "@/features/auth/authApi";
import { useToast } from "@/providers/Toast";

export default function PhoneModal() {
  const dispatch = useDispatch();

  const { isPhoneModalOpen } = useSelector(appSlice.selectSlice);
  const [phone, setPhone] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { showToast } = useToast();

  const { update } = useSession();

  const onUpdate = async () => {
    try {
      if (!phone) throw "Please enter your phone number";
      if (phone.length < 10)
        throw "The phone number must be at least 10 digits";

      const { data } = await updateUser({
        phone,
      });

      if (!data?.error) {
        update();
        showToast({
          type: "success",
          title: "Changes saved",
          message: "Your phone number has been updated successfully",
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Error",
        message: error,
      });
    }
  };

  return (
    <LoginDialog
      visible={isPhoneModalOpen}
      setVisible={(visible) =>
        dispatch(setState({ isPhoneModalOpen: visible }))
      }
      closeable={false}
      className=""
    >
      <div className="text-white text-center pb-8 md:pt-9 md:pb-14 md:w-[400px]">
        <h2 className="text-sm py-1 md:mb-4 md:text-[28px] font-bold">
          Enter your phone number
        </h2>

        <div className="py-4">
          <InputText
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            keyfilter="int"
            placeholder="Example: 5500110011"
            className="lg w-full"
            color="blue.500"
          />
        </div>

        <div className="mt-2">
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={onUpdate}
            label={isLoading ? "Updating..." : "Save"}
            size="small"
            className="w-full"
            severity="info"
          />
        </div>
      </div>
    </LoginDialog>
  );
}
