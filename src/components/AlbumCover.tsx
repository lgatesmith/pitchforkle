import type { Album } from "@/types";

interface AlbumCoverProps {
  album: Album;
  showDetails?: boolean;
}

export default function AlbumCover({
  album,
  showDetails = false,
}: AlbumCoverProps) {
  if (showDetails) {
    return (
      <div className="flex items-center gap-8">
        <div
          className="flex flex-col items-center gap-8 font-italic animate-in fade-in duration-500"
          style={{ textAlign: "center" }}
        >
          <h2
            className="text-brand-black font-serif font-bold"
            style={{ fontSize: "48px", lineHeight: "1.16667em" }}
          >
            {album.title}
          </h2>
          <p
            className="text-brand-black uppercase underline"
            style={{ fontSize: "28px" }}
          >
            {album.artist}
          </p>
        </div>
        <img
          src={album.coverUrl}
          alt={`${album.artist} - ${album.title}`}
          className="w-[312px] aspect-square object-cover rounded-sm shadow-md"
        />
      </div>
    );
  }

  return (
    <img
      src={album.coverUrl}
      alt={`${album.artist} - ${album.title}`}
      className="w-[312px] aspect-square object-cover rounded-sm shadow-md transition-transform hover:scale-[1.02]"
    />
  );
}
