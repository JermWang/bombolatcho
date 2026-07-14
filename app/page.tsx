"use client";

import { useRef, useState } from "react";

const CONTRACT_ADDRESS = "CA COMING SOON";

const evidence = [
  {
    src: "/content/Hyper-realistic_vertical_iPhone_202604142334.png",
    alt: "Bombo Latcho spotted beneath a backyard deck",
    id: "BL-0426-A",
    place: "RIDGEWAY, TX",
    time: "23:34",
    className: "wide",
    note: "SUBJECT DID NOT FLEE",
  },
  {
    src: "/content/Realistic_eerie_sighting_202604150029.png",
    alt: "Bombo Latcho standing in tall grass at night",
    id: "BL-0426-C",
    place: "COUNTY RD. 18",
    time: "00:29",
    className: "tall",
    note: "FRAME 118 ENHANCED",
  },
  {
    src: "/content/ChatGPT%20Image%20May%208,%202026,%2010_29_23%20PM%20(1).png",
    alt: "Bombo Latcho outside a convenience store",
    id: "BL-0508-F",
    place: "SOUTH LOOP MART",
    time: "22:29",
    className: "square",
    note: "CASHIER DENIES EVENT",
  },
  {
    src: "/content/hes_too_big_202604142349.png",
    alt: "Distant nighttime photograph of Bombo Latcho across a street",
    id: "BL-0426-B",
    place: "BLOCK 09",
    time: "23:49",
    className: "tall",
    note: "SCALE INCONCLUSIVE",
  },
  {
    src: "/content/ChatGPT%20Image%20May%208,%202026,%2010_32_30%20PM%20(4).png",
    alt: "Bombo Latcho cooking in an apartment kitchen",
    id: "BL-0508-H",
    place: "APARTMENT 6B",
    time: "22:32",
    className: "square",
    note: "HE WAS ALREADY INSIDE",
  },
  {
    src: "/content/Hyperrealistic_screenshot_of_202604150035.png",
    alt: "Screenshot of an archived Bombo Latcho investigation page",
    id: "BL-ARCHIVE",
    place: "MIRROR SITE 04",
    time: "00:35",
    className: "wide",
    note: "DOMAIN SEIZED 11 MIN. LATER",
  },
];

const angles = [0, 30, 60, 90, 120, 180];

export default function Home() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAngle, setActiveAngle] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function copyContract() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      } else {
        const field = document.createElement("textarea");
        field.value = CONTRACT_ADDRESS;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }

      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    }
  }

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setAudioPlaying(true);
      } catch {
        setAudioPlaying(false);
      }
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  }

  const copyLabel =
    copyStatus === "copied"
      ? "COPIED"
      : copyStatus === "failed"
        ? "TRY AGAIN"
        : "COPY";

  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to evidence
      </a>

      <section className="hero" aria-labelledby="hero-title">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Bombo Latcho home">
            <span className="wordmark-dot" aria-hidden="true" />
            BOMBO LATCHO
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>

          <nav
            id="site-navigation"
            className={"site-nav " + (menuOpen ? "is-open" : "")}
            aria-label="Primary navigation"
          >
            <a href="#evidence" onClick={() => setMenuOpen(false)}>Evidence</a>
            <a href="#timeline" onClick={() => setMenuOpen(false)}>Timeline</a>
            <a href="#dossier" onClick={() => setMenuOpen(false)}>Dossier</a>
            <a className="nav-alert" href="#contract" onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true" /> Transmission live
            </a>
          </nav>
        </header>

        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <div className="case-label">
              <span>CASE FILE 06-19</span>
              <span>STATUS: OPEN</span>
            </div>

            <p className="hero-kicker">The sightings are real.</p>
            <h1 id="hero-title">
              YOU&apos;VE
              <span className="outline-word"> SEEN HIM.</span>
            </h1>
            <p className="hero-intro">
              They called it lens flare. A mascot. Mass hysteria. Then the
              footage started arriving from everywhere.
            </p>

            <div className="launch-row">
              <span className="launch-chip">PUMPFUN / SOLANA</span>
              <span className="launch-note">Launch coordinates pending</span>
            </div>

            <button
              id="contract"
              className={"contract-pill " + (copyStatus === "copied" ? "is-copied" : "")}
              type="button"
              onClick={copyContract}
              aria-label={"Copy contract address: " + CONTRACT_ADDRESS}
            >
              <span className="contract-text">
                <span className="contract-label">CONTRACT ADDRESS</span>
                <span className="contract-value">{CONTRACT_ADDRESS}</span>
              </span>
              <span className="copy-action">
                <span className="copy-icon" aria-hidden="true" />
                {copyLabel}
              </span>
            </button>
            <p className="copy-feedback" aria-live="polite">
              {copyStatus === "copied"
                ? "Copied. Keep it quiet."
                : copyStatus === "failed"
                  ? "Clipboard blocked — tap once more."
                  : "One tap. No wallet connection required."}
            </p>
          </div>

          <div className="hero-subject" aria-label="Bombo Latcho field image">
            <div className="subject-halo" aria-hidden="true" />
            <div className="crosshair crosshair-one" aria-hidden="true" />
            <div className="crosshair crosshair-two" aria-hidden="true" />
            <img
              src="/content/bombo%20latcho.png"
              alt="Bombo Latcho, a small pale-blue creature with large dark eyes"
              width="1024"
              height="1536"
              fetchPriority="high"
            />
            <div className="subject-tag tag-one">
              <span>HEIGHT</span>
              <strong>UNKNOWN</strong>
            </div>
            <div className="subject-tag tag-two">
              <span>THREAT</span>
              <strong>UNLIKELY?</strong>
            </div>
            <span className="classified-stamp">EYES ONLY</span>
          </div>
        </div>

        <a className="scroll-cue" href="#main-content">
          <span>OPEN THE FILE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <div className="sighting-ticker" aria-label="Recent sighting locations">
        <div className="ticker-track">
          <span>WEST TEXAS // 23:34</span>
          <span>SOUTH LOOP // 22:29</span>
          <span>COUNTY ROAD 18 // 00:29</span>
          <span>APARTMENT 6B // 22:32</span>
          <span>WEST TEXAS // 23:34</span>
          <span>SOUTH LOOP // 22:29</span>
        </div>
      </div>

      <section id="main-content" className="evidence-section">
        <div id="evidence" className="section-heading evidence-heading">
          <p className="section-index">01 / THE EVIDENCE</p>
          <h2>
            THEY KEEP SAYING
            <br /> IT&apos;S <span>FAKE.</span>
          </h2>
          <p>
            Six files. Three devices. No matching metadata. Every witness
            remembers the eyes.
          </p>
        </div>

        <div className="evidence-grid">
          {evidence.map((item, index) => (
            <article
              className={"evidence-card " + item.className + " card-" + (index + 1)}
              key={item.id}
            >
              <div className="photo-frame">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width="900"
                  height="900"
                />
                <span className="frame-corner top-left" aria-hidden="true" />
                <span className="frame-corner bottom-right" aria-hidden="true" />
              </div>
              <div className="evidence-meta">
                <span>{item.id}</span>
                <span>{item.place}</span>
                <span>{item.time}</span>
              </div>
              <p>{item.note}</p>
              {index === 2 && <span className="verified-stamp">CORROBORATED</span>}
            </article>
          ))}
        </div>

        <div className="evidence-summary" aria-label="Evidence summary">
          <div><strong>31</strong><span>CLIPS RECOVERED</span></div>
          <div><strong>07</strong><span>STATES REPORTING</span></div>
          <div><strong>00</strong><span>OFFICIAL ANSWERS</span></div>
        </div>
      </section>

      <section className="recording-section" aria-labelledby="recording-title">
        <div className="recording-copy">
          <p className="section-index light">RECOVERED CLIP / 00:08:14</p>
          <h2 id="recording-title">IT MOVES WHEN YOU STOP LOOKING.</h2>
          <p>
            Uploaded from a disconnected phone. The original owner has never
            been located.
          </p>
          <div className="recording-status">
            <span className="record-dot" aria-hidden="true" />
            SOURCE UNVERIFIED
          </div>
        </div>
        <div className="video-shell">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/content/Realistic_eerie_sighting_202604150029.png"
          >
            <source
              src="/content/Creature_darting_between_202604142342.mp4"
              type="video/mp4"
            />
            Your browser does not support this recovered video.
          </video>
          <span className="video-timecode">REC 00:08:14</span>
          <span className="video-file">BL-CAM-03 / ORIGINAL</span>
        </div>
      </section>

      <section id="timeline" className="timeline-section" aria-labelledby="timeline-title">
        <div className="timeline-intro">
          <p className="section-index light">02 / CHAIN OF EVENTS</p>
          <h2 id="timeline-title">THREE NIGHTS.<br />ONE PATTERN.</h2>
          <p>The public record ends here. The private one gets stranger.</p>
        </div>

        <div className="timeline-list">
          <article>
            <span className="timeline-number">01</span>
            <div>
              <p>APR 14 / 23:34</p>
              <h3>The backyard tape</h3>
              <span>Ridgeway, TX · 11 seconds · no audio</span>
            </div>
            <p>
              A homeowner records movement beneath the deck. City sanitation
              removes the trash bin visible in frame before sunrise.
            </p>
          </article>
          <article>
            <span className="timeline-number">02</span>
            <div>
              <p>APR 15 / 00:29</p>
              <h3>The roadside call</h3>
              <span>County Rd. 18 · transcript partial</span>
            </div>
            <p>
              Dispatch logs a report of “a blue thing watching cars.” The call
              is reclassified as <span className="redacted">ANIMAL CONTROL</span>.
            </p>
          </article>
          <article>
            <span className="timeline-number">03</span>
            <div>
              <p>MAY 08 / 22:32</p>
              <h3>The inside sighting</h3>
              <span>Apartment 6B · four photographs</span>
            </div>
            <p>
              First confirmed interior appearance. No forced entry. One pot of
              noodles missing.
            </p>
          </article>
        </div>
      </section>

      <section id="dossier" className="dossier-section" aria-labelledby="dossier-title">
        <div className="dossier-heading">
          <p className="section-index">03 / SUBJECT DOSSIER</p>
          <h2 id="dossier-title">KNOW WHAT<br />YOU&apos;RE LOOKING AT.</h2>
          <p>
            Do not approach. Do not offer noodles. If it looks at you, keep the
            camera rolling.
          </p>
        </div>

        <div className="specimen-card">
          <div className="specimen-stage">
            <span className="measure-line line-a" aria-hidden="true" />
            <span className="measure-line line-b" aria-hidden="true" />
            <img
              key={activeAngle}
              src={"/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/" + activeAngle + ".png"}
              alt={"Bombo Latcho specimen viewed at " + activeAngle + " degrees"}
              width="500"
              height="500"
            />
            <span className="specimen-code">SPECIMEN BL-01</span>
          </div>

          <div className="angle-controls" aria-label="Rotate specimen">
            <span>ROTATE SUBJECT</span>
            <div>
              {angles.map((angle) => (
                <button
                  type="button"
                  key={angle}
                  className={activeAngle === angle ? "active" : ""}
                  onClick={() => setActiveAngle(angle)}
                  aria-pressed={activeAngle === angle}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>
        </div>

        <dl className="field-notes">
          <div><dt>EST. HEIGHT</dt><dd>2&apos;10&quot; — 3&apos;4&quot;</dd></div>
          <div><dt>GAIT</dt><dd>Waddles. Then accelerates.</dd></div>
          <div><dt>EYES</dt><dd>High-reflective. No visible blink.</dd></div>
          <div><dt>BEHAVIOR</dt><dd>Observes from cover. Attracted to noodles.</dd></div>
          <div>
            <dt>KNOWN SOUND</dt>
            <dd>
              <button type="button" className="audio-button" onClick={toggleAudio}>
                <span aria-hidden="true">{audioPlaying ? "Ⅱ" : "▶"}</span>
                {audioPlaying ? "PAUSE INTERCEPT" : "PLAY INTERCEPT"}
              </button>
            </dd>
          </div>
        </dl>
        <audio
          ref={audioRef}
          src="/content/wants%20and%20needs.mp3"
          preload="none"
          onEnded={() => setAudioPlaying(false)}
        />
      </section>

      <section className="final-section" aria-labelledby="final-title">
        <div className="final-radar" aria-hidden="true">
          <span /><span /><span />
        </div>
        <p className="section-index light">04 / STAY ON FREQUENCY</p>
        <h2 id="final-title">
          THE NEXT SIGHTING
          <br /> COULD BE <span>YOURS.</span>
        </h2>
        <p>
          Bombo Latcho launches on Pump.fun. Contract coordinates will appear
          here the moment the signal goes live.
        </p>

        <button
          className={"contract-pill final-contract " + (copyStatus === "copied" ? "is-copied" : "")}
          type="button"
          onClick={copyContract}
          aria-label={"Copy contract address: " + CONTRACT_ADDRESS}
        >
          <span className="contract-text">
            <span className="contract-label">SOLANA CONTRACT</span>
            <span className="contract-value">{CONTRACT_ADDRESS}</span>
          </span>
          <span className="copy-action">
            <span className="copy-icon" aria-hidden="true" />
            {copyLabel}
          </span>
        </button>
      </section>

      <footer className="site-footer">
        <a className="wordmark footer-mark" href="#top">
          <span className="wordmark-dot" aria-hidden="true" />
          BOMBO LATCHO
        </a>
        <p>
          A community meme on Solana. No roadmap. No promises. Just sightings.
          Not financial advice.
        </p>
        <p className="footer-code">CASE FILE 06-19 / © 2026 / KEEP WATCHING</p>
      </footer>
    </main>
  );
}
