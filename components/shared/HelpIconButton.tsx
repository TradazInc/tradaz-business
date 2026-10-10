import { IconButton } from "@chakra-ui/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const HelpIconButton = () => {
  return (
    <IconButton rounded={"full"} variant={"outline"} size={"sm"}>
      <AiOutlineQuestionCircle />
    </IconButton>
  );
};

export default HelpIconButton;
