export const metadata = {
  title: "Jainy & Mehak | Web Design & Development",
  description: "A two-person web team building fast, good-looking sites for small businesses and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
