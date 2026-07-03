import { Circle, Float, IconButton } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";

const Notification = () => {
  return (
    <IconButton rounded={"full"} variant={"outline"}>
      <LuBell />
      <Float offsetX="1" offsetY="1">
        <Circle bg="red" size="8px" outline="0.2em solid" outlineColor="bg" />
      </Float>
    </IconButton>
  );
};

export default Notification;
