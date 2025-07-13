export default function AdminLayout({ children }) {
  return (
    <html>
      <body>
        <aside>Sidebar Admin</aside>
        <main style={{ marginLeft: 200 }}>{children}</main>
      </body>
    </html>
  );
}
