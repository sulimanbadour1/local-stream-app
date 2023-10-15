import express from "express";
import { createReadStream, stat, mkdirSync, existsSync, rmdirSync } from "fs";
import { join, dirname, sep, parse } from "path";
import { fileURLToPath } from "url";
import ffmpeg from "fluent-ffmpeg";
import chokidar from "chokidar";
import cors from "cors";
import recursiveReaddir from "recursive-readdir";
import { Server } from "socket.io"; // Importing socket.io
import { createServer } from "http";

// Create an array to store connected clients
const connectedClients = [];

// App setup

const app = express();
const PORT = 3001;
const movieDirectory =
  "C:\\Users\\jafer\\Desktop\\react_js_projects\\local-media\\movies";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const thumbnailDirectory = join(__dirname, "thumbnails");
// delete cache

// Check if the thumbnail directory exists and delete it
if (existsSync(thumbnailDirectory)) {
  try {
    rmdirSync(thumbnailDirectory, { recursive: true });
    console.log("Thumbnail directory deleted.");
  } catch (err) {
    console.error("Error deleting the thumbnail directory:", err);
  }
}
// Then create a fresh thumbnail directory
mkdirSync(thumbnailDirectory);

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
  const moviePath = join(movieDirectory, ...movieName.split(sep));
  const movieFileName = parse(moviePath).name; // Extract filename without extension
  const thumbnailFolder = join(thumbnailDirectory, dirname(movieName));

  if (!existsSync(thumbnailFolder)) {
    mkdirSync(thumbnailFolder, { recursive: true });
  }

  const thumbnailPath = join(thumbnailFolder, `${movieFileName}_thumbnail.jpg`);

  if (existsSync(thumbnailPath)) {
    return res.sendFile(thumbnailPath);
  }

  ffmpeg(moviePath)
    .screenshots({
      timestamps: ["40%"],
      filename: `${movieFileName}_thumbnail.jpg`, // Use unique filename
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
  const moviePath = join(movieDirectory, ...movieName.split(sep));

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
  const moviePath = join(movieDirectory, ...movieName.split(sep));

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
  .on("unlink", (path) => {
    console.log(`File ${path} has been removed`);

    // Extracting the relative movie path
    const movieRelPath = path.replace(movieDirectory, "");

    // Identifying the thumbnail path
    const thumbnailPath = join(
      thumbnailDirectory,
      movieRelPath,
      "thumbnail.jpg"
    );

    if (existsSync(thumbnailPath)) {
      fs.unlink(thumbnailPath, (err) => {
        if (err) {
          console.error("Error deleting thumbnail:", err);
        } else {
          console.log("Deleted thumbnail:", thumbnailPath);
        }
      });
    }

    // Optionally, you can also delete the whole thumbnail directory for that movie
    const movieThumbnailDirectory = join(thumbnailDirectory, movieRelPath);
    if (existsSync(movieThumbnailDirectory)) {
      fs.rmdir(movieThumbnailDirectory, { recursive: true }, (err) => {
        if (err) {
          console.error("Error deleting thumbnail directory:", err);
        } else {
          console.log("Deleted thumbnail directory:", movieThumbnailDirectory);
        }
      });
    }
  });

// Socket setup
// Setting up the HTTP server and attaching socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Add the connected client to the array
  connectedClients.push(socket);

  // Handle messages from clients
  socket.on("control-message", (data) => {
    // Broadcast the control message to all connected clients except the sender
    socket.broadcast.emit("control-message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the disconnected client from the array
    const index = connectedClients.indexOf(socket);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });
