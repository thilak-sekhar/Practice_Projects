import React, { useEffect, useState } from "react";
import "./styles.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lightbox state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // -----------------------------
  // Fetch images
  // -----------------------------
  const loadImages = async (cursor = null, append = false) => {
    let url = "http://127.0.0.1:8000/api/media/";
    if (cursor) url += `?cursor=${cursor}`;

    const res = await fetch(url, { credentials: "include" });
    const data = await res.json();

    const newImages = Array.isArray(data.images) ? data.images : [];

    if (append) {
      setImages(prev => [...prev, ...newImages]);
    } else {
      setImages(newImages);
    }

    setNextCursor(data.next_cursor || null);
  };

  useEffect(() => {
    loadImages();
  }, []);

  // -----------------------------
  // Keyboard navigation
  // -----------------------------
  useEffect(() => {
    if (!viewerOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeViewer();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerOpen, currentIndex]);

  // -----------------------------
  // Viewer controls
  // -----------------------------
  const openViewer = (index) => {
    setCurrentIndex(index);
    setViewerOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setViewerOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + images.length) % images.length
    );
  };

  // -----------------------------
  // Touch (Swipe) handling
  // -----------------------------
  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (touchStartX === null) return;

    const diff = touchStartX - e.changedTouches[0].clientX;

    if (diff > 50) nextImage();     // swipe left
    if (diff < -50) prevImage();    // swipe right

    setTouchStartX(null);
  };

  // -----------------------------
  // Upload
  // -----------------------------
  const uploadFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach(f => formData.append("images", f));

    setLoading(true);
    await fetch("http://127.0.0.1:8000/api/upload/", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    setLoading(false);
    loadImages();
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="gallery-container">
      <h1>My Gallery</h1>
      {loading && <div className="uploading-text">Uploading...</div>}

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item" onClick={() => openViewer(index)}>
            <img src={img.url} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {nextCursor && (
        <button onClick={() => loadImages(nextCursor, true)} className="btnload-more-">
          Load More
        </button>
      )}

      <label className="floating-upload">
        +
        <input type="file" multiple accept="image/*" onChange={uploadFiles} hidden />
      </label>

      {/* FULLSCREEN VIEWER */}
      {viewerOpen && (
        <div
          className="viewer-overlay"
          onClick={closeViewer}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button className="nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            ❮
          </button>

          <img
            src={images[currentIndex].url}
            className="viewer-image"
            alt=""
            onClick={(e) => e.stopPropagation()}
          />

          <button className="nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            ❯
          </button>

          <span className="close" onClick={closeViewer}>×</span>
        </div>
      )}
    </div>
  );
}
