import style from "./not-found/not-found.module.css";
// app/not-found.js
export default function NotFound() {
  return (
    <div
      className={style.not_found}
      style={{ textAlign: "center", marginTop: "5rem" }}
    >
      <h1 className={style.h1404}>404 - Halaman tidak ditemukan</h1>
      <p>Ups! URL ini tidak tersedia.</p>
    </div>
  );
}
