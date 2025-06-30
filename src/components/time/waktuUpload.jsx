import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale"; // Import locale bahasa Indonesia

function WaktuUpload({ waktuUnggah }) {
  const waktuRelatif = formatDistanceToNow(new Date(waktuUnggah), {
    addSuffix: true,
    locale: id, // Gunakan locale bahasa Indonesia
  });

  return <span>{waktuRelatif}</span>;
}

export default WaktuUpload;
