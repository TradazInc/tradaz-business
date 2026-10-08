import { Button, ButtonProps } from "@chakra-ui/react";

const FormButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant={"outline"} size={"xs"} {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
