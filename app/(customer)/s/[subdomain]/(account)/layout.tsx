/** Cart, checkout and orders need a signed-in user; browsing does not. */
export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
