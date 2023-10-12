import express from "express";
import { createReadStream, stat, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import ffmpeg from "fluent-ffmpeg";
import chokidar from "chokidar";
import cors from "cors";
import recursiveReaddir from "recursive-readdir";

const app = express();
const PORT = 3001;
const movieDirectory =
  "C:\\Users\\jafer\\Desktop\\react_js_projects\\local-media\\movies";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const thumbnailDirectory = join(__dirname, "thumbnails");

if (!existsSync(thumbnailDirectory)) {
  mkdirSync(thumbnailDirectory);
}

// Middleware
app.use(cors());
app.use(express.static(join(__dirname, "public")));

app.get("/api/movies", (req, res) => {
  recursiveReaddir(movieDirectory, (err, files) => {
    if (err) {
      console.error("Directory Read Error:", err);
      return res.status(500).json({ error: "Failed to read directory" });
    }

    const videoExtensions = [".mp4", ".mkv", ".avi", ".flv", ".mov", ".wmv"];
    const videoFiles = files
      .filter((file) => {
        const ext = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
        return videoExtensions.includes("." + ext);
      })
      .map((file) => file.replace(movieDirectory, "")); // Convert to relative path
    res.json(videoFiles);
  });
});

app.get("/api/movies/:name/thumbnail", (req, res) => {
  const movieName = decodeURIComponent(req.params.name);
  const moviePath = join(movieDirectory, ...movieName.split("/"));
  const thumbnailFolder = join(thumbnailDirectory, movieName);

  const thumbnailPath = join(thumbnailFolder, "thumbnail.jpg");

  ffmpeg(moviePath)
    .screenshots({
      timestamps: ["40%"],
      filename: "thumbnail.jpg",
      folder: thumbnailFolder,
    })
    .on("end", () => {
      console.log("Generated Thumbnail:", thumbnailPath);
      res.sendFile(thumbnailPath);
    })
    .on("error", (err) => {
      console.error("FFMPEG Thumbnail Generation Error:", err.message);
      res.status(500).send("Failed to generate thumbnail: " + err.message);
    });
});

app.get("/api/movies/:name/metadata", (req, res) => {
  const movieName = decodeURIComponent(req.params.name);
  const moviePath = join(movieDirectory, ...movieName.split("/"));

  ffmpeg.ffprobe(moviePath, (err, metadata) => {
    if (err) {
      console.error("FFprobe Error:", err);
      return res.status(500).json({ error: "Failed to fetch metadata" });
    }
    const duration = metadata.format.duration;

    console.log(`Duration for ${movieName}:`, duration);
    const thumbnailPath = `/api/movies/${encodeURIComponent(
      movieName
    )}/thumbnail`;
    console.log("Thumbnail Path:", thumbnailPath);

    res.json({
      duration,
      thumbnail: thumbnailPath,
    });
  });
});

app.get("/api/movies/:name", (req, res) => {
  const movieName = decodeURIComponent(req.params.name);
  const moviePath = join(movieDirectory, ...movieName.split("/"));

  stat(moviePath, (err, stats) => {
    if (err) {
      console.error("File Stat Error:", err);
      if (err.code === "ENOENT") {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }

    const range = req.headers.range;
    if (!range) {
      return res.sendStatus(416);
    }

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : stats.size - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + stats.size,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });

    const movieStream = createReadStream(moviePath, { start, end });
    movieStream.pipe(res);
  });
});

const watcher = chokidar.watch(movieDirectory, {
  ignored: /^\./,
  persistent: true,
});

watcher
  .on("add", (path) => console.log(`File ${path} has been added`))
  .on("unlink", (path) => console.log(`File ${path} has been removed`));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
