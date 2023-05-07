import type { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";

//TODO: SEND PROPS
export const openNotification = (
  placement: NotificationPlacement,
  desc: string
) => {
  notification.open({
    message: "Registration Failed",
    duration: 5,
    description: desc,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    placement,
  });
};
