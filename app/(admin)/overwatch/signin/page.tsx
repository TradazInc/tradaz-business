import SignInForm from "@/components/shared/SignInForm";
import TradazLogo from "@/components/shared/TradazLogo";
import { Center, Heading, VStack } from "@chakra-ui/react";

const AdminSigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8} w={"lg"}>
        <TradazLogo />
        <Heading size={"lg"}>Admin Sign In</Heading>
        <SignInForm redirectTo={"/overwatch"} />
      </VStack>
    </Center>
  );
};

export default AdminSigninPage;
