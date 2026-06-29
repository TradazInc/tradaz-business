import { LayoutContainer } from "../components/LayoutContainer";
import { NavBar } from "./NavBar";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutContainer>
      <NavBar />
      {children}
    </LayoutContainer>
  );
}
