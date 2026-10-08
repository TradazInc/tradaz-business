import { Button, ButtonProps } from "@chakra-ui/react";

const CardDeleteButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant={"subtle"} colorPalette={"red"} {...props}>
      {children}
    </Button>
  );
};

export default CardDeleteButton;
