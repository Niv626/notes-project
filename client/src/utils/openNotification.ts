import type { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";

//TODO: SEND PROPS
export const openNotification = (placement: NotificationPlacement) => {
  notification.open({
    message: "Registration Failed",
    duration: 1000,
    description: "Username or password are incorrect",
    onClick: () => {
      console.log("Notification Clicked!");
    },
    placement,
  });
};
