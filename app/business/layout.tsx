import { Provider } from "@/components/ui/provider";
import NavBar from "./NavBar";
import { SideBar } from "./SideBar";
import { Box } from "@chakra-ui/react";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <NavBar />
      <SideBar />

      <Box as="main" pt="60px" pl={{ base: "0", md: "250px" }} minH="100vh">
        <Box p={{ base: 4, md: 8 }}>{children}</Box>
      </Box>
    </Provider>
  );
}
