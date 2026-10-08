import { Button, ButtonProps } from "@chakra-ui/react";

const CardViewButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant={"outline"} {...props}>
      {children}
    </Button>
  );
};

export default CardViewButton;
