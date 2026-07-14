"use client";

import { useMemo, useRef, useState } from "react";

const CONTRACT_ADDRESS = "HnxncrfSvjvJA82bUFQ8BEa9jMrK2HAvP5wboW3Cpump";

const sightings = [
  {
    id: "BL-2026-0414",
    date: "04.14.26",
    place: "Willard County, TX",
    classification: "CLASS II",
    image: "/content/Hyper-realistic_vertical_iPhone_202604142334.png",
    alt: "Witness photograph showing Bombo Latcho beneath a backyard deck",
    caption: "Figure observed beneath a residential deck at 02:13.",
  },
  {
    id: "BL-2026-0415",
    date: "04.15.26",
    place: "State Hwy 18, OK",
    classification: "CLASS II",
    image: "/content/Realistic_eerie_sighting_202604150029.png",
    alt: "Nighttime roadside sighting of Bombo Latcho",
    caption: "Roadside image submitted by an eastbound driver.",
  },
  {
    id: "BL-2026-0508",
    date: "05.08.26",
    place: "South Loop, TX",
    classification: "CLASS I",
    image: "/content/ChatGPT%20Image%20May%208,%202026,%2010_29_23%20PM%20(1).png",
    alt: "Close field image of Bombo Latcho",
    caption: "Closest public image in the current archive.",
  },
  {
    id: "BL-2026-0603",
    date: "06.03.26",
    place: "Lower Ouachita, AR",
    classification: "PENDING",
    image: "/content/hes_too_big_202604142349.png",
    alt: "Bombo Latcho sighting in tall grass",
    caption: "Frame recovered from a short witness recording.",
  },
];

const reports = [
  {
    id: "BL-2026-0603",
    date: "06.03.26",
    place: "Lower Ouachita, AR",
    type: "Visual / photo",
    classification: "Pending",
    summary: "Small upright figure crossed a drainage edge and disappeared into grass.",
  },
  {
    id: "BL-2026-0512",
    date: "05.12.26",
    place: "Red Bluff, AR",
    type: "Tracks / audio",
    classification: "Class III",
    summary: "Paired impressions and a short vocalization were documented before rainfall.",
  },
  {
    id: "BL-2026-0508",
    date: "05.08.26",
    place: "South Loop, TX",
    type: "Visual / photo",
    classification: "Class I",
    summary: "Witness photographed the subject at close range from inside a parked vehicle.",
  },
  {
    id: "BL-2026-0415",
    date: "04.15.26",
    place: "State Hwy 18, OK",
    type: "Roadside visual",
    classification: "Class II",
    summary: "Two occupants reported a figure moving beside the shoulder after midnight.",
  },
  {
    id: "BL-2026-0414",
    date: "04.14.26",
    place: "Willard County, TX",
    type: "Visual / photo",
    classification: "Class II",
    summary: "Homeowner observed and photographed a figure beneath a raised deck.",
  },
];

const rotationFrames = [
  { file: "0", angle: 0, mirrored: false },
  { file: "30", angle: 30, mirrored: false },
  { file: "60", angle: 60, mirrored: false },
  { file: "90", angle: 90, mirrored: false },
  { file: "120", angle: 120, mirrored: false },
  { file: "180", angle: 180, mirrored: false },
  { file: "120", angle: 240, mirrored: true },
  { file: "90", angle: 270, mirrored: true },
  { file: "60", angle: 300, mirrored: true },
  { file: "30", angle: 330, mirrored: true },
];

export default function Home() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [query, setQuery] = useState("");
  const [rotationIndex, setRotationIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredReports = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return reports;
    return reports.filter((report) =>
      [report.id, report.date, report.place, report.type, report.classification]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const currentFrame = rotationFrames[rotationIndex];

  function updateRotation(clientX: number, element: HTMLDivElement) {
    const bounds = element.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientX - bounds.left) / bounds.width));
    setRotationIndex(Math.round(progress * (rotationFrames.length - 1)));
  }

  function stepRotation(direction: number) {
    setRotationIndex((current) =>
      (current + direction + rotationFrames.length) % rotationFrames.length,
    );
  }

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    }
  }

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  const copyLabel =
    copyStatus === "copied" ? "COPIED" : copyStatus === "error" ? "TRY AGAIN" : "COPY CA";

  return (
    <main id="top" className="site-shell">
      <a className="skip-link" href="#sightings">Skip to sightings</a>

      <div className="utility">
        <div className="wrap utility-inner">
          <span>BLFRO.NET // EST. 2004</span>
          <span>FIELD STATUS: <strong>ACTIVE</strong></span>
        </div>
      </div>

      <header className="masthead wrap">
        <a className="brand" href="#top" aria-label="Bombo Latcho Field Research Organization home">
          <span className="seal" aria-hidden="true">
            <img
              src="/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/0.png"
              alt=""
              width="500"
              height="500"
            />
          </span>
          <span className="brand-copy">
            <strong>Bombo Latcho</strong>
            <span>Field Research Organization</span>
            <small>Document · Verify · Preserve</small>
          </span>
        </a>

        <button
          className={"contract " + (copyStatus === "copied" ? "copied" : "")}
          type="button"
          onClick={copyContract}
          aria-label={"Copy Solana contract address: " + CONTRACT_ADDRESS}
        >
          <span>
            <small>$BOMBO / SOLANA CONTRACT</small>
            <strong>{CONTRACT_ADDRESS}</strong>
          </span>
          <b>{copyLabel}</b>
        </button>
      </header>

      <nav className="nav" aria-label="Primary navigation">
        <div className="wrap nav-links">
          <a href="#top">Home</a>
          <a href="#sightings">Photo Sightings</a>
          <a href="#reports">Report Index</a>
          <a href="#media">Field Media</a>
          <a href="#identification">Identification</a>
        </div>
      </nav>

      <section className="hero wrap" aria-labelledby="hero-title">
        <figure className="hero-photo">
          <img
            src="/content/Realistic_eerie_sighting_202604150029.png"
            alt="Nighttime field photograph attributed to Bombo Latcho"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <figcaption>
            <strong>BL-2026-0415</strong>
            <span>State Hwy 18, Oklahoma · 12:41 AM</span>
          </figcaption>
          <span className="stamp">WITNESS PHOTO</span>
        </figure>

        <div className="hero-copy">
          <p className="eyebrow">THE PUBLIC ENCOUNTER ARCHIVE</p>
          <h1 id="hero-title">Bombo Latcho has been seen.</h1>
          <p>Four states. Thirty-one reports. One unidentified little man.</p>
          <div className="hero-actions">
            <a className="old-button primary" href="#sightings">View the photographs</a>
            <a className="old-button" href="#reports">Search reports</a>
          </div>
          <dl className="stats">
            <div><dt>Reports</dt><dd>31</dd></div>
            <div><dt>Photos</dt><dd>12</dd></div>
            <div><dt>Active sectors</dt><dd>07</dd></div>
          </dl>
          <small className="updated">Archive updated: June 19, 2026</small>
        </div>
      </section>

      <section id="sightings" className="visual-section wrap">
        <div className="section-bar">
          <div>
            <p>PUBLIC MEDIA FILE</p>
            <h2>Recent photo sightings</h2>
          </div>
          <span>Locations generalized for witness privacy</span>
        </div>

        <div className="sighting-grid">
          {sightings.map((sighting, index) => (
            <figure className={"sighting " + (index === 0 ? "sighting-featured" : "")} key={sighting.id}>
              <img src={sighting.image} alt={sighting.alt} width="1600" height="1200" />
              <figcaption>
                <span>
                  <strong>{sighting.id}</strong>
                  <b>{sighting.classification}</b>
                </span>
                <span>{sighting.place} · {sighting.date}</span>
                <small>{sighting.caption}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="bulletin">
        <div className="wrap">
          <strong>FIELD BULLETIN 26-07</strong>
          <span>Red River corridor activity remains under review.</span>
          <a href="#reports">Open report index &gt;&gt;</a>
        </div>
      </div>

      <section id="reports" className="reports wrap" aria-labelledby="reports-title">
        <div className="section-bar report-bar">
          <div>
            <p>GEOGRAPHICAL DATABASE</p>
            <h2 id="reports-title">Latest field reports</h2>
          </div>
          <label>
            <span>Search:</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="case, place, class..."
            />
          </label>
        </div>

        <div className="report-head" aria-hidden="true">
          <span>Case / date</span>
          <span>Location</span>
          <span>Type</span>
          <span>Class</span>
        </div>
        <div className="report-list">
          {filteredReports.map((report) => (
            <details key={report.id} className="report-row">
              <summary>
                <span><strong>{report.id}</strong><small>{report.date}</small></span>
                <span>{report.place}</span>
                <span>{report.type}</span>
                <b>{report.classification}</b>
              </summary>
              <p>{report.summary}</p>
            </details>
          ))}
          {filteredReports.length === 0 && <p className="empty">No matching public reports.</p>}
        </div>
      </section>

      <section id="media" className="media wrap">
        <div className="section-bar">
          <div>
            <p>FIELD MEDIA</p>
            <h2>Video &amp; audio files</h2>
          </div>
          <span>Original witness submissions</span>
        </div>

        <div className="media-grid">
          <figure className="video-file">
            <video controls preload="metadata" poster="/content/hes_too_big_202604142349.png">
              <source src="/content/Creature_darting_between_202604142342.mp4" type="video/mp4" />
            </video>
            <figcaption><strong>VID-0414-B</strong> · Figure moving between trees · 00:06</figcaption>
          </figure>

          <div className="audio-file">
            <p className="eyebrow">AUDIO RECORD 05-08-A</p>
            <h3>“Wants and Needs”</h3>
            <div className="wave" aria-hidden="true">
              {Array.from({ length: 31 }).map((_, index) => <i key={index} />)}
            </div>
            <audio ref={audioRef} src="/content/wants%20and%20needs.mp3" onEnded={() => setPlaying(false)} />
            <button type="button" onClick={toggleAudio}>{playing ? "STOP AUDIO" : "PLAY RECORDING"}</button>
            <small>South Loop sector · Submitted 05.08.26</small>
          </div>
        </div>
      </section>

      <section id="identification" className="identification wrap">
        <div className="id-copy">
          <p className="eyebrow">IDENTIFICATION PLATE 01</p>
          <h2>Known morphology</h2>
          <ul>
            <li>Estimated height: 2.5–3.5 ft</li>
            <li>Blue-gray dermal surface</li>
            <li>Pink bill-like mouth</li>
            <li>Black eyes and three-toed feet</li>
          </ul>
          <p className="rotate-instruction">Move your cursor left ↔ right across Bombo.</p>
        </div>
        <div
          className="turntable interactive-turntable"
          role="slider"
          tabIndex={0}
          aria-label="Interactive 360 degree view of Bombo Latcho"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={currentFrame.angle}
          aria-valuetext={currentFrame.angle + " degree view"}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateRotation(event.clientX, event.currentTarget);
          }}
          onPointerMove={(event) => {
            if (
              event.pointerType === "mouse" ||
              event.currentTarget.hasPointerCapture(event.pointerId)
            ) {
              updateRotation(event.clientX, event.currentTarget);
            }
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              stepRotation(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              stepRotation(-1);
            }
          }}
        >
          <div className="rotation-preload" aria-hidden="true">
            {rotationFrames.map((frame, index) => (
              <img
                src={"/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/" + frame.file + ".png"}
                alt=""
                key={frame.angle + "-" + index}
              />
            ))}
          </div>
          <img
            className={currentFrame.mirrored ? "is-mirrored" : ""}
            src={"/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/" + currentFrame.file + ".png"}
            alt={"Bombo Latcho identification view at " + currentFrame.angle + " degrees"}
            width="500"
            height="500"
            draggable={false}
          />
          <span className="angle-readout">{currentFrame.angle}° / 360°</span>
          <div className="rotation-hint" aria-hidden="true">
            <i>←</i>
            <span>MOVE TO ROTATE</span>
            <i>→</i>
          </div>
          <div className="rotation-track" aria-hidden="true">
            {rotationFrames.map((frame, index) => (
              <i className={rotationIndex === index ? "active" : ""} key={frame.angle} />
            ))}
          </div>
        </div>
        <div className="class-key">
          <p className="eyebrow">REPORT KEY</p>
          <div><b>I</b><span>Multiple witnesses or clear media</span></div>
          <div><b>II</b><span>Single witness with supporting detail</span></div>
          <div><b>III</b><span>Tracks, audio, or trace evidence</span></div>
          <div><b>P</b><span>Pending investigator review</span></div>
        </div>
      </section>

      <section className="support wrap">
        <div>
          <p className="eyebrow">SUPPORT FIELD OPERATIONS</p>
          <h2>$BOMBO on Solana</h2>
          <p>Research token launching through Pump.fun.</p>
        </div>
        <button className="support-contract" type="button" onClick={copyContract}>
          <span><small>CONTRACT ADDRESS</small><strong>{CONTRACT_ADDRESS}</strong></span>
          <b>{copyLabel}</b>
        </button>
      </section>

      <footer className="footer wrap">
        <div>
          <strong>BLFRO.NET</strong>
          <span>Bombo Latcho Field Research Organization</span>
        </div>
        <p>Fictional research archive for the Bombo Latcho project. No affiliation with BFRO.</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}


