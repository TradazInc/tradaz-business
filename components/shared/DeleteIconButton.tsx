import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

const DeleteIconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      color={"fg.error"}
      _hover={{ bg: "bg.error", color: "fg.error" }}
    >
      <MdDeleteOutline />
    </IconButton>
  );
};

export default DeleteIconButton;
