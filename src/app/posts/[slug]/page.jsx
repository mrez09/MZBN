import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import Comments from "@/components/comments/Comments";
import WaktuSekarang from "../../../components/time/waktuUpload";
import { format, compareAsc } from "date-fns";
import { id } from "date-fns/locale";
import HighlightClient from "@/components/highlight/HighlightClient";

const getData = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
//Nlock Page
function splitHtmlToBlocks(html) {
  const blocks = [];
  const regex = /<pre class="language-(\w+)">([\s\S]*?)<\/pre>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const before = html.slice(lastIndex, match.index);
    if (before.trim()) {
      blocks.push({ type: "html", html: before });
    }

    blocks.push({
      type: "code",
      lang: match[1],
      html: `<pre><code class="language-${match[1]}">${match[2]}</code></pre>`,
    });

    lastIndex = regex.lastIndex;
  }

  const after = html.slice(lastIndex);
  if (after.trim()) {
    blocks.push({ type: "html", html: after });
  }

  return blocks;
}

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  const contentBlocks = splitHtmlToBlocks(data?.desc || "");
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.titleH1}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt="sample 1"
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {data?.createdAt
                  ? format(new Date(data.createdAt), "EEEE, dd MMMM yyyy", {
                      locale: id,
                    })
                  : "Tanggal tidak tersedia"}
              </span>
            </div>
          </div>
        </div>
        {data?.image && (
          <div className={styles.imageContainer}>
            <Image
              src={`${data?.image}?t=${Date.now()}`}
              alt=""
              fill
              className={styles.image}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.deschead}>
            <HighlightClient />

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            />
          </div>
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
