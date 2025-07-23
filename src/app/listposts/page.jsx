"use client";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import styles from "./listPosts.module.css";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columnHelper = createColumnHelper();

const ListPost = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const columns = [
    columnHelper.accessor("image", {
      header: "Thumbnail",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="thumbnail"
          width={80}
          height={50}
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      ),
    }),
    columnHelper.accessor("title", {
      header: "Judul",
    }),
    columnHelper.accessor("catSlug", {
      header: "Kategori",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();

        return (
          <span className={`${styles.badge} ${styles[status.toLowerCase()]}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Tanggal",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    }),
    //columnHelper.accessor("user.name", {
    //header: "Author",
    //cell: (info) => info.getValue() || "-",
    //}),
    columnHelper.display({
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <>
          <div class={styles.btn_container}>
            <button
              onClick={() => router.push(`/editwrite/${row.original.slug}`)}
              class={styles.btn_pulse}
            >
              EDIT
            </button>
          </div>
          <div class={styles.btn_container}>
            <button
              onClick={() => handleDelete(row.original.slug)}
              class={styles.btn_shake}
            >
              HAPUS
            </button>
          </div>
        </>
      ),
    }),
  ];

  useEffect(() => {
    fetch("/api/postsadmin")
      .then((res) => res.json())
      .then((posts) => setData(posts));
  }, []);

  const handleDelete = async (slug) => {
    const confirmDelete = confirm("Yakin hapus post?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setData((prev) => prev.filter((p) => p.slug !== slug));
    }
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination, // ✅ gunakan state
    },
    onPaginationChange: setPagination, // ✅ supaya tombol next/prev bekerja
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { status, data: session } = useSession();

  if (status === "loading")
    return <p className={styles.container}>Loading...</p>;
  if (!session || session.user.role !== "admin") {
    toast.error("Silahkan login sebagai admin.");
    router.push("/login");
    return null;
  }

  return (
    <div style={{ padding: "1rem" }} className={styles.container}>
      <h2>📋 Daftar Post (Admin)</h2>

      <table
        style={{ width: "100%", marginTop: "1rem" }}
        className={styles.tablelist}
      >
        <thead className={styles.headlist}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={styles.headItem} key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className={styles.bodyList}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.striped}>
              {row.getVisibleCells().map((cell) => (
                <td className={styles.itemList} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ⬅️ Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ListPost;
