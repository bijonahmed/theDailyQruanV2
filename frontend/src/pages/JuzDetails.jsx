import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/css/JuzDetails.css";
import Footer from "../components/Footer";

const JuzDetails = () => {
  const { juzNo } = useParams();
  const currentJuz = juzNo ? parseInt(juzNo) : 1;

  const [arabicAyahs, setArabicAyahs] = useState([]);
  const [transAyahs, setTransAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const [ayahList, setAyahList] = useState([]);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(null);

  const audioRef = useRef(null);
  const ayahRefs = useRef([]);
  const bitrate = 128;

  const [metaData, setMetaData] = useState({
    title: `juz ${currentJuz} - Daily Quran`,
    description: `Explore Juz ${currentJuz} of the Quran with full translation, explanation, and recitation. Daily Quran helps you read and understand the Quran easily.",
    keywords: "Juz ${currentJuz}, Quran, Translation, Recitation, Daily Quran`,
  });

  const langMap = {
    bn: "bn.bengali",
    en: "en.asad",
    ur: "ur.jalandhry",
    hi: "hi.hindi",
  };

  useEffect(() => {
    const fetchJuz = async () => {
      setLoading(true);
      try {
        const arabicRes = await fetch(
          `https://api.alquran.cloud/v1/juz/${currentJuz}/quran-uthmani`,
        );
        const arabicData = await arabicRes.json();

        const transRes = await fetch(
          `https://api.alquran.cloud/v1/juz/${currentJuz}/${langMap[lang]}`,
        );
        const transData = await transRes.json();

        setArabicAyahs(arabicData?.data?.ayahs || []);
        setTransAyahs(transData?.data?.ayahs || []);

        const fullAudioList = (arabicData?.data?.ayahs || []).map(
          (a) =>
            `https://cdn.islamic.network/quran/audio/${bitrate}/ar.alafasy/${a.number}.mp3`,
        );
        setAyahList(fullAudioList);
        setCurrentAyahIndex(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJuz();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentJuz, lang]);

  const playAyahAtIndex = (index) => {
    if (!audioRef.current || !ayahList[index]) return;
    setCurrentAyahIndex(index);
    audioRef.current.src = ayahList[index];
    audioRef.current.play();

    audioRef.current.onended = () => {
      const nextIndex = index + 1;
      if (nextIndex < ayahList.length) playAyahAtIndex(nextIndex);
      else setCurrentAyahIndex(null);
    };
  };

  const playFullJuz = () => {
    if (ayahList.length === 0) return;
    playAyahAtIndex(0);
  };

  const nextAyah = () => {
    if (currentAyahIndex === null) return;
    const nextIndex = currentAyahIndex + 1;
    if (nextIndex < ayahList.length) playAyahAtIndex(nextIndex);
  };

  const prevAyah = () => {
    if (currentAyahIndex === null) return;
    const prevIndex = currentAyahIndex - 1;
    if (prevIndex >= 0) playAyahAtIndex(prevIndex);
  };

  useEffect(() => {
    if (currentAyahIndex !== null && ayahRefs.current[currentAyahIndex]) {
      ayahRefs.current[currentAyahIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentAyahIndex]);

  if (loading) return <p className="text-center mt-4">Loading Juz...</p>;

  return (
    <div>
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

        <main className="page_content bg_info">
          {/* Banner Section */}
          <section className="page_banner decoration_wrap">
            <div className="container text-center  mt-5">
              <h1 className="page_heading">JUZ {currentJuz}</h1>
              <p className="page_subheading">
                Explore the Quran one Juz at a time. Read Arabic with proper
                tajweed, understand with trusted translations, and listen to
                authentic recitations. Perfect for daily learning and
                reflection.
              </p>
              <br />
              <Link to="/juz">⬅ Back to Juz List</Link>
            </div>

            {/* Decorative Shapes */}
            
          </section>

          {/* Child Categories */}
          <section className="container bg_info">
            <div className="category2_items_wrapper row justify-content-center">
              <div className="col-md-12">
                <div className="cat_container">
                  <div className="container">
                    <div className="container">
                      {/* Juz Header */}
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <h2 className="mb-2 mb-md-0 display-6 text-center text-md-start">
                          📖 Juz {currentJuz}
                        </h2>

                        <select
                          className="form-select w-auto ms-md-3"
                          value={lang}
                          onChange={(e) => setLang(e.target.value)}
                        >
                          <option value="bn">Bangla</option>
                          <option value="en">English</option>
                          <option value="ur">Urdu</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                      <div className="d-flex justify-content-center flex-wrap gap-3 mb-4 audio-controls-modern">
                        <button
                          className="btn btn-primary btn-lg px-4"
                          onClick={playFullJuz}
                        >
                          ▶ Play Full Juz
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-lg px-4"
                          onClick={prevAyah}
                        >
                          ⬅ Previous
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-lg px-4"
                          onClick={nextAyah}
                        >
                          Next ➡
                        </button>
                      </div>

                      <audio
                        ref={audioRef}
                        controls
                        className="w-100 mb-4"
                      ></audio>

                      {arabicAyahs.length > 0 ? (
                        arabicAyahs.map((a, i) => (
                          <div
                            key={a.number}
                            ref={(el) => (ayahRefs.current[i] = el)}
                            className={`ayah mb-3 rounded shadow-sm ${
                              currentAyahIndex === i ? "active" : ""
                            }`}
                          >
                            <button
                              className="play-btn"
                              onClick={() => playAyahAtIndex(i)}
                            >
                              ▶
                            </button>

                            <div className="ayah-content">
                              <div className="arabic">{a.text}</div>
                              <div className="translation">
                                {transAyahs[i]?.text || ""}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Ayahs found for this Juz.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default JuzDetails;
