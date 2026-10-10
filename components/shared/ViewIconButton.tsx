import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { MdOutlineViewInAr } from "react-icons/md";

const ViewIconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <IconButton variant={"outline"} {...props}>
      <MdOutlineViewInAr />
    </IconButton>
  );
};

export default ViewIconButton;
