import SignInForm from "@/components/shared/SignInForm";
import TradazLogo from "@/components/shared/TradazLogo";
import { Center, Heading, VStack } from "@chakra-ui/react";

const PortalSigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8} w={"lg"}>
        <TradazLogo />
        <Heading size={"lg"}>Staff Sign In</Heading>
        <SignInForm redirectTo={"/portal"} />
      </VStack>
    </Center>
  );
};

export default PortalSigninPage;
