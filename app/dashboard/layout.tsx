import { LayoutContainer } from "../ui/LayoutContainer";
import { NavBar } from "../ui/dashboard/NavBar";

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
