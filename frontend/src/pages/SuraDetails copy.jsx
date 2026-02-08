import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";
import "../assets/suradetails.css";
const SuraDetails = () => {
  const { slug } = useParams();
  const [arabicAyahs, setArabicAyahs] = useState([]);
  const [transAyahs, setTransAyahs] = useState([]);
  const [surahInfo, setSurahInfo] = useState({});
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSurahs, setAllSurahs] = useState([]);

  const audioRef = useRef(null);
  const [ayahIndex, setAyahIndex] = useState(0);
  const [ayahList, setAyahList] = useState([]);
  const [metaData, setMetaData] = useState({
    title: `${slug} - The Daily Quran`,
    description: `Read and listen to ${slug} online. Daily Quran provides translation, recitation, and detailed explanations of every Sura.",
    keywords: "${slug} , Quran, Translation, Recitation, Daily Quran`,
  });
  const langMap = {
    bn: "bn.bengali",
    en: "en.asad",
    ur: "ur.jalandhry",
    hi: "hi.hindi",
  };
  // Inside your component
  const navigate = useNavigate();

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
    navigate(path);
  };

  useEffect(() => {
    // Scroll to top whenever component mounts or slug changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);
  // Fetch all surahs for search
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setAllSurahs(data.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch Surah details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const surahNo =
        allSurahs.find(
          (s) => s.englishName.toLowerCase() === slug.toLowerCase(),
        )?.number || 1;

      try {
        const arabicRes = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNo}/quran-uthmani`,
        );
        const arabicData = await arabicRes.json();

        const transRes = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNo}/${langMap[lang]}`,
        );
        const transData = await transRes.json();

        setArabicAyahs(arabicData.data.ayahs);
        setTransAyahs(transData.data.ayahs);
        setSurahInfo(arabicData.data);

        const audioUrls = arabicData.data.ayahs.map(
          (a) =>
            `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`,
        );
        setAyahList(audioUrls);
        setAyahIndex(0);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (allSurahs.length > 0) fetchData();
  }, [slug, lang, allSurahs]);

  const [currentAyah, setCurrentAyah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playAyah = (index) => {
    if (!audioRef.current) return;

    setCurrentAyah(index);
    audioRef.current.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${arabicAyahs[index].number}.mp3`;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playFullSurah = () => {
    if (!audioRef.current) return;
    if (currentAyah === null) {
      playAyah(0);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (currentAyah + 1 < arabicAyahs.length) {
        playAyah(currentAyah + 1);
      } else {
        setCurrentAyah(null);
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentAyah, arabicAyahs]);

  // Filter Surahs for search
  const filteredSurahs = allSurahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.includes(searchTerm),
  );

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Helmet>
      <GuestNavbar />

      <div className="page_wrapper">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        {/* Banner Section */}
        <section className="page_banner decoration_wrap mt-5">
          <div className="container text-center">
            <h1 className="page_heading">Quran Juz Reading & Audio</h1>
            <p className="page_subheading">
              Explore the Quran one Juz at a time. Read Arabic with proper
              tajweed, understand with trusted translations, and listen to
              authentic recitations. Perfect for daily learning and reflection.
            </p>
          </div>

          {/* Decorative Shapes */}
          
        </section>

        {/* Banner with Search */}
        <section>
          <div className="overlay"></div>
          <div className="container text-center banner-content">
            <h2 className="surah-title">
              {surahInfo.englishName || "Loading..."}
            </h2>
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search Surah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        <main className="page_content py-5">
          <div className="container">
            <div className="row">
              {/* Surah Details */}
              <div className="col-lg-9">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {/* Full Surah Play/Pause */}
                    <button
                      className="btn play-full-surah mb-3"
                      onClick={() => {
                        if (audioRef.current) {
                          if (isPlaying) {
                            audioRef.current.pause();
                            setIsPlaying(false);
                          } else {
                            playFullSurah();
                          }
                        }
                      }}
                    >
                      {isPlaying ? "⏸ Pause Surah" : "▶ Play Full Surah"}
                    </button>

                    <audio ref={audioRef} className="audio-player" />

                    {/* Ayahs */}
                    <div className="ayah-list">
                      {arabicAyahs.map((a, i) => (
                        <div
                          className={`ayah-card ${currentAyah === i ? "playing" : ""}`}
                          key={a.number}
                        >
                          <div className="arabic">{a.text}</div>
                          <div className="translation">
                            {transAyahs[i]?.text}
                          </div>

                          <div className="ayah-controls">
                            <button
                              className="btn btn-play-ayah"
                              onClick={() => {
                                if (audioRef.current) {
                                  if (currentAyah === i && isPlaying) {
                                    audioRef.current.pause();
                                    setIsPlaying(false);
                                  } else {
                                    playAyah(i);
                                  }
                                }
                              }}
                            >
                              {currentAyah === i && isPlaying
                                ? "⏸ Pause"
                                : "▶ Play Ayah"}
                            </button>

                            {currentAyah === i && (
                              <div className="progress-bar">
                                <div
                                  className="progress-filled"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-lg-3">
                <select
                  className="form-select w-auto ms-md-3 w-100"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="bn">Bangla</option>
                  <option value="en">English</option>
                  <option value="ur">Urdu</option>
                  <option value="hi">Hindi</option>
                </select>

                <div className="sidebar p-3 rounded shadow-sm">
                  <h5 className="sidebar-title">Other Surahs</h5>
                  <ul className="surah-list">
                    {filteredSurahs.map((s) => (
                      <li key={s.number} className="surah-item">
                        <button
                          className="surah-link-btn"
                          onClick={() =>
                            scrollToTopAndNavigate(
                              `/surah/${s.englishName.toLowerCase()}`,
                            )
                          }
                        >
                          <span className="surah-number">{s.number}</span>
                          <span className="surah-name">
                            {s.englishName} - {s.name}
                          </span>
                        </button>
                      </li>
                    ))}
                    {filteredSurahs.length === 0 && <li>No Surah found.</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SuraDetails;
