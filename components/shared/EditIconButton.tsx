import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

const EditIconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <IconButton variant={"outline"} {...props}>
      <AiOutlineEdit />
    </IconButton>
  );
};

export default EditIconButton;
