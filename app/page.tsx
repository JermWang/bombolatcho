"use client";

import { useRef, useState } from "react";

const CONTRACT_ADDRESS = "CA COMING SOON";

const reports = [
  {
    id: "BL-2026-0414",
    date: "14 APR 2026",
    location: "Willard County, Texas",
    classification: "Class II",
    type: "Visual / Video",
    title: "Homeowner records unidentified biped beneath raised deck",
    summary:
      "The witness observed a small, pale-blue animal standing motionless beside a refuse container at approximately 23:34. Eleven seconds of phone video were retained for review.",
    investigator:
      "Site survey completed 16 April. Reference measurements support an estimated standing height between 86 and 102 cm. Domestic animal, bird, and costume explanations remain unconfirmed.",
  },
  {
    id: "BL-2026-0415",
    date: "15 APR 2026",
    location: "State Highway 18, Oklahoma",
    classification: "Class III",
    type: "Roadside Encounter",
    title: "Motorist reports reflective black eyes at drainage corridor",
    summary:
      "A northbound motorist reported a rounded figure in roadside grass shortly after midnight. The subject remained visible for roughly six seconds before moving beyond the illuminated shoulder.",
    investigator:
      "Interview completed by telephone. Witness has twelve years of commercial driving experience and was familiar with local wildlife. No physical trace was recovered.",
  },
  {
    id: "BL-2026-0508",
    date: "08 MAY 2026",
    location: "South Loop District, Texas",
    classification: "Class II",
    type: "Visual / Photo",
    title: "Convenience store exterior observation produces four images",
    summary:
      "Two patrons independently described a short, blue-gray figure near the rear parking area. A mobile photograph taken from the storefront is consistent with both accounts.",
    investigator:
      "Image sequence was reviewed for compositing artifacts and inconsistent shadows. No conclusive manipulation was identified. Original device metadata remains unavailable.",
  },
  {
    id: "BL-2026-0512",
    date: "12 MAY 2026",
    location: "Red Bluff County, Arkansas",
    classification: "Pending",
    type: "Audio",
    title: "Repeated three-note vocalization reported near riparian woods",
    summary:
      "Two residents reported an unfamiliar call repeated at intervals of 47 to 61 seconds. The event continued for approximately nine minutes.",
    investigator:
      "Audio comparison against barred owl, fox, raccoon, and human sources is ongoing. No visual observation accompanied the report.",
  },
  {
    id: "BL-2026-0603",
    date: "03 JUN 2026",
    location: "Lower Ouachita Sector",
    classification: "Class III",
    type: "Trace Evidence",
    title: "Alternating track impressions documented along service road",
    summary:
      "Seven shallow impressions measuring 16–18 cm were photographed following overnight rain. Track spacing was regular but surface detail was insufficient for casting.",
    investigator:
      "The pattern is inconsistent with common canine movement. A rabbit or raccoon origin cannot be excluded. Site remains under passive observation.",
  },
];

const evidence = [
  {
    id: "MEDIA BL-0414-A",
    src: "/content/Hyper-realistic_vertical_iPhone_202604142334.png",
    alt: "Submitted nighttime image showing Bombo Latcho beneath a backyard deck",
    title: "Willard County deck image",
    note: "Original mobile capture · witness supplied",
  },
  {
    id: "MEDIA BL-0415-C",
    src: "/content/Realistic_eerie_sighting_202604150029.png",
    alt: "Submitted roadside image showing Bombo Latcho in tall grass",
    title: "Highway 18 roadside still",
    note: "Low-light enhancement · crop retained",
  },
  {
    id: "MEDIA BL-0508-B",
    src: "/content/ChatGPT%20Image%20May%208,%202026,%2010_29_23%20PM%20(1).png",
    alt: "Submitted image showing Bombo Latcho outside a convenience store",
    title: "South Loop exterior image",
    note: "Second of four reported frames",
  },
];

const angles = [0, 30, 60, 90, 120, 180];

export default function Home() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [reportQuery, setReportQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAngle, setActiveAngle] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredReports = reports.filter((report) =>
    [
      report.id,
      report.location,
      report.classification,
      report.type,
      report.title,
      report.summary,
    ]
      .join(" ")
      .toLowerCase()
      .includes(reportQuery.toLowerCase()),
  );

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
        : "COPY CA";

  return (
    <main id="top" className="site-page">
      <a className="skip-link" href="#main-content">
        Skip to current research
      </a>

      <div className="utility-bar">
        <div className="page-width utility-inner">
          <span>Independent volunteer research network · Established 2004</span>
          <span className="utility-right">
            Field status: <strong>ACTIVE</strong>
          </span>
        </div>
      </div>

      <header className="org-header page-width">
        <a className="org-brand" href="#top" aria-label="BLFRO home">
          <span className="org-seal" aria-hidden="true">
            <img
              src="/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/0.png"
              alt=""
              width="500"
              height="500"
            />
          </span>
          <span className="org-name">
            <strong>Bombo Latcho</strong>
            <span>Field Research Organization</span>
            <small>Document · Verify · Preserve</small>
          </span>
        </a>

        <button
          id="contract"
          className={"contract-copy " + (copyStatus === "copied" ? "is-copied" : "")}
          type="button"
          onClick={copyContract}
          aria-label={"Copy Solana contract address: " + CONTRACT_ADDRESS}
        >
          <span className="contract-copy-text">
            <small>$BOMBO RESEARCH TOKEN / SOLANA</small>
            <strong>{CONTRACT_ADDRESS}</strong>
          </span>
          <span className="contract-copy-action">
            <span className="copy-symbol" aria-hidden="true" />
            {copyLabel}
          </span>
        </button>

        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <nav
        id="primary-navigation"
        className={"primary-nav " + (menuOpen ? "is-open" : "")}
        aria-label="Primary navigation"
      >
        <div className="page-width nav-inner">
          <a href="#main-content" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#reports" onClick={() => setMenuOpen(false)}>Sightings Database</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>Field Research</a>
          <a href="#evidence" onClick={() => setMenuOpen(false)}>Evidence Archive</a>
          <a href="#methodology" onClick={() => setMenuOpen(false)}>Methodology</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About BLFRO</a>
        </div>
      </nav>

      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="section-label">North American research initiative</p>
          <h1 id="hero-title">
            Documenting an unidentified small bipedal species.
          </h1>
          <p className="hero-deck">
            BLFRO is an independent network of field investigators, archivists,
            naturalists, and witness interviewers studying reports attributed to
            the animal commonly called <em>Bombo Latcho</em>.
          </p>
          <div className="hero-actions">
            <a className="button primary-button" href="#reports">
              Search encounter records
            </a>
            <a className="button secondary-button" href="#report-protocol">
              Report an observation
            </a>
          </div>
          <dl className="hero-facts">
            <div>
              <dt>Open reports</dt>
              <dd>31</dd>
            </div>
            <div>
              <dt>Active sectors</dt>
              <dd>07</dd>
            </div>
            <div>
              <dt>Evidence standard</dt>
              <dd>4 classes</dd>
            </div>
          </dl>
        </div>

        <figure className="hero-image">
          <img
            src="/content/Hyper-realistic_vertical_iPhone_202604142334.png"
            alt="Submitted field image showing a small pale-blue figure beneath a deck"
            width="2752"
            height="1536"
            fetchPriority="high"
          />
          <figcaption>
            <span><strong>Featured report BL-2026-0414</strong> · Willard County, TX</span>
            <span>Image courtesy of witness · April 14, 2026</span>
          </figcaption>
          <span className="image-classification">CLASS II</span>
        </figure>
      </section>

      <div className="notice-strip">
        <div className="page-width">
          <strong>FIELD BULLETIN 26-07</strong>
          <span>
            Investigators are reviewing a cluster of roadside reports along the
            Red River drainage corridor.
          </span>
          <a href="#reports">View related reports →</a>
        </div>
      </div>

      <section id="main-content" className="main-layout page-width">
        <div id="reports" className="reports-panel">
          <div className="content-heading">
            <div>
              <p className="section-label">Public encounter archive</p>
              <h2>Recently investigated reports</h2>
              <p>
                Public records are posted only with witness permission. Locations
                may be generalized to protect witnesses and active study areas.
              </p>
            </div>
            <div className="report-search">
              <label htmlFor="report-search">Search reports</label>
              <div>
                <input
                  id="report-search"
                  type="search"
                  value={reportQuery}
                  onChange={(event) => setReportQuery(event.target.value)}
                  placeholder="Case, county, class…"
                />
                <span>{filteredReports.length} records</span>
              </div>
            </div>
          </div>

          <div className="report-table-heading" aria-hidden="true">
            <span>Report</span>
            <span>Date</span>
            <span>Location</span>
            <span>Class</span>
          </div>

          <div className="report-list">
            {filteredReports.map((report, index) => (
              <details className="report-record" key={report.id} open={index === 0 && reportQuery === ""}>
                <summary>
                  <span className="report-id">{report.id}</span>
                  <span>{report.date}</span>
                  <span>{report.location}</span>
                  <span className={"report-class class-" + report.classification.toLowerCase().replace(" ", "-")}>
                    {report.classification}
                  </span>
                  <strong>{report.title}</strong>
                  <span className="expand-record">Open record</span>
                </summary>
                <div className="report-detail">
                  <div>
                    <h3>Witness account summary</h3>
                    <p>{report.summary}</p>
                  </div>
                  <div>
                    <h3>Investigator notes</h3>
                    <p>{report.investigator}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Evidence type</dt>
                      <dd>{report.type}</dd>
                    </div>
                    <div>
                      <dt>Review status</dt>
                      <dd>Published</dd>
                    </div>
                  </dl>
                </div>
              </details>
            ))}

            {filteredReports.length === 0 && (
              <div className="no-results">
                No public reports match that search. Try a county, report number,
                or classification.
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar">
          <section id="report-protocol" className="sidebar-card report-card">
            <p className="sidebar-kicker">Confidential intake</p>
            <h2>Have you observed something?</h2>
            <p>
              Reports may be submitted anonymously. We never publish witness
              names, precise home locations, or contact information without
              written permission.
            </p>
            <a href="#field-protocol" className="sidebar-button">
              Review witness protocol
            </a>
          </section>

          <section className="sidebar-card status-card">
            <h2>Current operations</h2>
            <dl>
              <div><dt>Red River corridor</dt><dd>Monitoring</dd></div>
              <div><dt>Ouachita sector</dt><dd>Camera array</dd></div>
              <div><dt>Willard County</dt><dd>Follow-up</dd></div>
              <div><dt>Audio catalog</dt><dd>Reviewing</dd></div>
            </dl>
          </section>

          <section className="sidebar-card brief-card">
            <h2>Research brief 06/26</h2>
            <p className="brief-date">Posted June 19, 2026</p>
            <p>
              Why recurring observations near residential drainage systems may
              matter more than distance from undeveloped habitat.
            </p>
            <a href="#methodology">Read working hypothesis →</a>
          </section>
        </aside>
      </section>

      <section id="research" className="programs-section">
        <div className="page-width">
          <div className="programs-intro">
            <p className="section-label light-label">Research divisions</p>
            <h2>Field work built around verifiable records.</h2>
            <p>
              Every public case begins with a direct witness interview. Field
              deployment is reserved for recent, internally consistent reports
              with the potential to produce repeatable evidence.
            </p>
          </div>
          <div className="program-grid">
            <article>
              <span>01</span>
              <h3>Observer reports</h3>
              <p>Structured interviews, timeline reconstruction, and location review.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Trace evidence</h3>
              <p>Tracks, hair, biological material, and site-specific environmental data.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Audio monitoring</h3>
              <p>Long-duration recorders and comparison against known regional wildlife.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Remote cameras</h3>
              <p>Passive, non-baited image collection in recurring report corridors.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="evidence" className="evidence-section page-width">
        <div className="content-heading evidence-heading">
          <div>
            <p className="section-label">Selected public media</p>
            <h2>Evidence review archive</h2>
            <p>
              Images shown below remain unproven. Publication indicates that a
              file passed initial integrity review—not that the subject has been identified.
            </p>
          </div>
          <a className="text-link" href="#methodology">How media is evaluated →</a>
        </div>

        <div className="evidence-grid">
          {evidence.map((item) => (
            <figure key={item.id} className="evidence-item">
              <div className="evidence-image">
                <img src={item.src} alt={item.alt} loading="lazy" width="900" height="700" />
                <span>{item.id}</span>
              </div>
              <figcaption>
                <strong>{item.title}</strong>
                <small>{item.note}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="methodology" className="methodology-section">
        <div className="page-width method-grid">
          <div className="method-copy">
            <p className="section-label light-label">Standards and methods</p>
            <h2>A report is not evidence until it survives review.</h2>
            <p>
              The BLFRO working hypothesis proposes that a rare, intelligent,
              and highly adaptable small biped may be responsible for a narrow
              subset of reported observations. The hypothesis is provisional and
              is tested against ordinary wildlife, hoaxing, image manipulation,
              mistaken scale, and witness memory.
            </p>
            <p>
              Most submissions do not advance beyond intake. Reports are retained
              for pattern analysis even when a conventional explanation is likely.
            </p>
          </div>

          <div className="class-table">
            <div className="class-row class-head">
              <span>Class</span>
              <span>Public definition</span>
            </div>
            <div className="class-row">
              <strong>I</strong>
              <span>Direct observation with independent corroboration or physical trace.</span>
            </div>
            <div className="class-row">
              <strong>II</strong>
              <span>Credible visual encounter with media or multiple consistent witnesses.</span>
            </div>
            <div className="class-row">
              <strong>III</strong>
              <span>Possible trace, audio, or single-witness event requiring additional support.</span>
            </div>
            <div className="class-row">
              <strong>U</strong>
              <span>Unclassified, incomplete, or under active investigation.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="field-protocol" className="field-section page-width">
        <div className="field-video">
          <div className="video-frame">
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
              Your browser does not support this field video.
            </video>
            <span>BLFRO MEDIA REVIEW / BL-0415-V1</span>
          </div>
          <div>
            <p className="section-label">Field media review</p>
            <h2>Preserve the original file.</h2>
            <p>
              Do not crop, stabilize, brighten, or resend through social media
              before submitting an encounter. Original device files retain the
              timestamps and compression data investigators need most.
            </p>
          </div>
        </div>

        <ol className="protocol-list">
          <li><strong>Record from a safe position.</strong><span>Do not approach, follow, feed, or attempt to capture the animal.</span></li>
          <li><strong>Mark your exact location.</strong><span>Save coordinates privately and photograph fixed reference objects.</span></li>
          <li><strong>Write before discussing.</strong><span>Record your account before reading comments or comparing memories.</span></li>
          <li><strong>Retain original media.</strong><span>Keep the first-generation file on the device where it was captured.</span></li>
        </ol>
      </section>

      <section className="catalog-section">
        <div className="page-width catalog-grid">
          <div className="specimen-panel">
            <div className="catalog-heading">
              <p className="section-label">Identification reference</p>
              <h2>Reported morphology</h2>
              <p>
                Composite model based on internally consistent descriptions.
                This reference is not presented as a verified specimen.
              </p>
            </div>
            <div className="specimen-view">
              <img
                key={activeAngle}
                src={"/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/" + activeAngle + ".png"}
                alt={"Bombo Latcho morphology reference at " + activeAngle + " degrees"}
                width="500"
                height="500"
              />
              <span>Approx. 86–102 cm</span>
            </div>
            <div className="angle-controls" aria-label="Rotate morphology reference">
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

          <div className="audio-panel">
            <p className="section-label">Recorded audio catalog</p>
            <h2>Catalog entry BL-AUD-09</h2>
            <p className="audio-meta">
              Lower Ouachita sector · 02:17 AM · unattended recorder · source undetermined
            </p>
            <div className="waveform" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span />
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <button type="button" className="audio-button" onClick={toggleAudio}>
              <span aria-hidden="true">{audioPlaying ? "Ⅱ" : "▶"}</span>
              {audioPlaying ? "Pause catalog audio" : "Play catalog audio"}
            </button>
            <p className="audio-note">
              Comparison pending. Playback volume has been normalized; no other
              processing was applied to the public file.
            </p>
            <audio
              ref={audioRef}
              src="/content/wants%20and%20needs.mp3"
              preload="none"
              onEnded={() => setAudioPlaying(false)}
            />
          </div>
        </div>
      </section>

      <section id="about" className="support-section">
        <div className="page-width support-inner">
          <div>
            <p className="section-label light-label">Community field support</p>
            <h2>Keep the archive independent.</h2>
            <p>
              $BOMBO is a community token on Solana supporting the fictional
              BLFRO archive. No promises, no guaranteed utility, and no financial advice.
            </p>
          </div>
          <button
            className={"support-contract " + (copyStatus === "copied" ? "is-copied" : "")}
            type="button"
            onClick={copyContract}
            aria-label={"Copy Solana contract address: " + CONTRACT_ADDRESS}
          >
            <span>
              <small>SOLANA CONTRACT</small>
              <strong>{CONTRACT_ADDRESS}</strong>
            </span>
            <span className="support-copy">{copyLabel}</span>
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div className="footer-brand">
            <span className="org-seal small-seal" aria-hidden="true">
              <img
                src="/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/0.png"
                alt=""
                width="500"
                height="500"
              />
            </span>
            <div>
              <strong>Bombo Latcho Field Research Organization</strong>
              <span>Independent witness archive and field research network</span>
            </div>
          </div>
          <div>
            <strong>Research</strong>
            <a href="#reports">Public reports</a>
            <a href="#evidence">Evidence archive</a>
            <a href="#methodology">Classification system</a>
          </div>
          <div>
            <strong>Field resources</strong>
            <a href="#field-protocol">Witness protocol</a>
            <a href="#research">Research divisions</a>
            <a href="#contract">Research token</a>
          </div>
          <p>
            BLFRO is a fictional organization created for Bombo Latcho. All case
            records and statistics on this site are part of the project narrative.
          </p>
        </div>
        <div className="footer-bottom page-width">
          <span>© 2026 BLFRO · Public archive revision 06.19</span>
          <a href="#top">Return to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
