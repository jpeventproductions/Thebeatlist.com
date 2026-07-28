"use client";

/* eslint-disable @next/next/no-img-element -- owned, local media is served directly. */
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const EMAIL = "thebeatlistofficial@gmail.com";
const FORM_URL =
  "https://docs.google.com/forms/d/1w4J54sEFMyquXQstcFfbLcHf_Ov29AIbnd01qhY_4Fw/viewform?embedded=true";
const EVENTBRITE_PROFILE =
  "https://www.eventbrite.com/o/jarrel-pierson-21728969468";
const BRACKET_KEY = "the-beat-list-pocket-bracket-v3";

const instagramPosts = [
  "https://www.instagram.com/thebeatlistofficial/reel/DZnd5X8vkcF/embed",
  "https://www.instagram.com/thebeatlistofficial/reel/DZSyxJAP4AS/embed",
  "https://www.instagram.com/thebeatlistofficial/reel/DZK_aVdvK3H/embed",
  "https://www.instagram.com/thebeatlistofficial/p/DZEeQ2bNbkv/embed",
  "https://www.instagram.com/thebeatlistofficial/reel/DXdHzYtDdUz/embed",
  "https://www.instagram.com/thebeatlistofficial/reel/DXVMo0FD0Ws/embed",
];

const youtubeVideos = [
  {
    id: "6nyWN07F2j0",
    title: "Road to NBB XX",
    caption: "The championship pathway in 2:13.",
  },
  {
    id: "QGu42B3zIYE",
    title: "Nashville Music Boost",
    caption: "A quick look at the development work.",
  },
  {
    id: "7jtAs4KQj_A",
    title: "Nashville Beat Battle 11",
    caption: "An earlier chapter in the live series.",
  },
] as const;

const catalog = [
  {
    title: "Ok Yeah",
    producer: "J Reggaerica",
    detail: "Kodak Black × Migos type beat",
    genres: "Hip-Hop · Trap",
    audio:
      "https://thebeatlist.com/wp-content/uploads/2021/07/J-Reggaerica-Ok-Yeah-7-7-2021.mp3",
    product: "https://thebeatlist.com/downloads/kodak-black-type-beat/",
  },
  {
    title: "Who’s That",
    producer: "J Reggaerica",
    detail: "Meg Thee Stallion × DaBaby type beat",
    genres: "EDM · Orchestral · Trap",
    audio:
      "https://thebeatlist.com/wp-content/uploads/2021/07/meg-thee-stallion-x-da-baby-type-beat-whos-that-7-6-2021.mp3",
    product:
      "https://thebeatlist.com/downloads/meg-thee-stallion-x-da-baby-type-beat-whos-that/",
  },
  {
    title: "Say It",
    producer: "J Reggaerica",
    detail: "DaBaby × Moneybagg Yo type beat",
    genres: "R&B · Rap · Trap",
    audio:
      "https://thebeatlist.com/wp-content/uploads/2021/07/Da-Baby-x-Money-Bagg-Yo-TYPE-BEAT-Say-It-7-6-2021.mp3",
    product:
      "https://thebeatlist.com/downloads/da-baby-x-moneybagg-yosay-it-type-beat/",
  },
];

const impact = [
  ["20", "Nashville Beat Battles"],
  ["61", "verified submissions"],
  ["51", "unique producer contacts"],
  ["≈1,250", "in-room participation instances"],
  ["60K–200K", "estimated campaign reach"],
];

const partners = [
  ["/media/partners/metro-arts.png", "Metro Arts"],
  ["/media/partners/jefferson-street-sound.png", "Jefferson Street Sound Museum"],
  ["/media/partners/collective-41.png", "Collective 41"],
  ["/media/partners/home.png", "HOME — Helping Our Music Evolve"],
  [
    "/media/partners/helping-music-foundation.png",
    "Helping Music Foundation",
  ],
] as const;

const outcomes = [
  {
    label: "CLOSEOUT TESTIMONIAL",
    text:
      "“Metro Arts’ Thrive investment made it possible for us to compensate producers and cultural workers, keep the Nashville Beat Battle accessible, and create a stage where underrepresented music creators could be heard, challenged, celebrated, and connected.”",
    credit: "J Pierson · Founder + Project Director",
  },
  {
    label: "DOCUMENTED PRODUCER OUTCOME",
    text:
      "An established creator used the battle to debut new, self-directed work for a live audience—hearing it at event scale, receiving immediate response, and centering his own artistry.",
    credit: "FY26 closeout working copy",
  },
  {
    label: "CHAMPIONSHIP STORY",
    text:
      "Bleaux continued competing while working back-to-back shifts and completing college, then connected beats, performance, and crowd energy to earn the NBB XX title and $500 prize.",
    credit: "FY26 closeout working copy",
  },
  {
    label: "REACH BEYOND THE ROOM",
    text:
      "Producer spotlights, interviews, battle highlights, and recaps gave creators reusable photo and video assets while carrying the experience to more than 20,000 Instagram accounts.",
    credit: "Documented project outcome",
  },
] as const;

const articles = [
  {
    year: "2019",
    title: "Community Boost: the room becomes an instrument",
    body:
      "The Beat List Community Boost began with a practical problem: Nashville producers—especially Black creators working near North Nashville—needed recurring space to be heard, challenged, and connected. After six early beat battles, the proposal joined single-elimination competition, community voting, paid artist leadership, and a planned community album at Jefferson Street Sound. The work treated Jefferson Street’s recording history as a living foundation for its next generation.",
    facts: "6 early battles · community voting · Jefferson Street Sound",
  },
  {
    year: "2023–24",
    title: "Nashville Music Boost: competition becomes development",
    body:
      "Music Boost widened the pathway beyond one night on stage. The grant-supported design proposed up to 40 free sessions covering music production software, music theory, songwriting, professional development, collaborative creation, live sound, and sync licensing. Sessions at Jefferson Street Sound and HOME were built to help emerging creators finish work together—not only compete.",
    facts: "Up to 40 sessions · free learning · planned community album",
  },
  {
    year: "2026",
    title: "Industry Insights + Nashville Beat Battle",
    body:
      "The 2026 series paired public beat battles with industry conversations and paid creative roles. A working closeout documents 19 registrations, four events, roughly 200–300 in-person participation instances, and more than 20,000 Instagram accounts reached. Qualifiers developed toward a championship format while producers, panelists, and event staff received meaningful professional exposure.",
    facts: "19 registrations · 4 documented events · 20K+ verified reach",
  },
  {
    year: "Proposed 2026–27",
    title: "Nashville Producer Accelerator",
    body:
      "The next proposed chapter is a nine-month accelerator for producers, songwriters, artists, engineers, and independent creators. If grant support is secured, the program is designed around six educational experiences and two showcases spanning theory, collaborative writing, production, sync licensing, mentorship, and industry relationships. The plan includes participant stipends and paid instructors so access does not depend on who can afford to work for free.",
    facts:
      "Seeking grant funding · 6 learning experiences · 2 showcases · paid participation",
  },
];

type ModalKind = "submit" | "inquiry" | "vendor" | "support" | null;
type BracketState = {
  slots: number;
  names: string[];
  picks: Record<string, string>;
};

function buildDefaultBracket(slots = 2): BracketState {
  const names = Array.from({ length: slots }, (_, index) =>
    index === 0 ? "Bleaux" : `Producer ${index + 1}`,
  );
  return { slots, names, picks: {} };
}

function bracketCapacity(entrantCount: number) {
  return Math.min(32, Math.max(2, 2 ** Math.ceil(Math.log2(entrantCount))));
}

function MailForm({
  kind,
  close,
}: {
  kind: "inquiry" | "vendor" | "support";
  close: () => void;
}) {
  const formVisual = {
    vendor: {
      src: "/media/history-nbb-xi-lobby.jpg",
      alt: "Guests and vendors gathering at a Beat List event",
      label: "FOOD · MERCH · MUSIC · COMMUNITY",
    },
    support: {
      src: "/media/producer-accelerator-flyer.png",
      alt: "Nashville Producer Accelerator proposal artwork",
      label: "ACCESS · STIPENDS · MENTORSHIP · SHOWCASES",
    },
    inquiry: {
      src: "/media/history-nbb-xi-stage.jpg",
      alt: "A producer on the Nashville Beat Battle stage",
      label: "PARTNER · BOOK · BUILD WITH US",
    },
  }[kind];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const lines = Array.from(values.entries()).map(
      ([key, value]) =>
        `${key
          .replace(/\b\w/g, (letter) => letter.toUpperCase())
          .trim()}: ${String(value)}`,
    );
    const emailTitle =
      kind === "vendor"
        ? "VENDOR APPLICATION"
        : kind === "support"
          ? "PRODUCER ACCELERATOR SUPPORT"
          : "PARTNERSHIP + BOOKING INQUIRY";
    const subject =
      kind === "vendor"
        ? "🎪 The Beat List — Vendor Application"
        : kind === "support"
          ? `💛 Producer Accelerator Support — ${String(values.get("support interest") || "Proposal")}`
          : `🎵 The Beat List — ${String(values.get("request") || "Inquiry")}`;
    const body = [
      "🎵 THE BEAT LIST · ONLY THE BEST",
      "",
      `${kind === "vendor" ? "🎪" : kind === "support" ? "💛" : "🤝"} ${emailTitle}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      ...lines.map((line) => `• ${line}`),
      "",
      "📍 NASHVILLE, TENNESSEE",
      "🔊 Where Producers Get Heard.",
      "",
      "✅ NEXT STEP",
      "Please reply to confirm receipt and continue the conversation.",
      "",
      "Sent from TheBeatList.com",
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="pop-form" onSubmit={submit}>
      <p className="eyebrow">
        {kind === "vendor"
          ? "VENDOR APPLICATION"
          : kind === "support"
            ? "SUPPORT THE PRODUCER ACCELERATOR"
            : "CONTACT THE TEAM"}
      </p>
      <div className={`form-visual form-visual-${kind}`}>
        <img src={formVisual.src} alt={formVisual.alt} />
        <span>{formVisual.label}</span>
      </div>
      <h2>
        {kind === "vendor"
          ? "Bring something to the room."
          : kind === "support"
            ? "Help fund the next chapter."
          : "Tell us what you’re building."}
      </h2>
      <p className="form-intro">
        {kind === "vendor"
          ? "Request space for food, merchandise, music services, community resources, or another event-ready idea."
          : kind === "support"
            ? "Choose the role that fits. Your answers will become a ready-to-send message to J Pierson and The Beat List team."
          : "Partnerships, sponsorships, booking, press, and community-program questions belong here."}
      </p>
      {kind === "inquiry" && (
        <label>
          Request
          <select name="request" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Become a partner</option>
            <option>Sponsorship inquiry</option>
            <option>Book The Beat List</option>
            <option>Community program</option>
            <option>Press / media</option>
            <option>General question</option>
          </select>
        </label>
      )}
      {kind === "vendor" && (
        <>
          <label>
            Vendor type
            <select name="vendor type" required defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              <option>Food / beverage</option>
              <option>Merchandise booth</option>
              <option>Music-related service</option>
              <option>Community resource</option>
              <option>Artist / creator booth</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Business or booth name
            <input name="business" required />
          </label>
        </>
      )}
      {kind === "support" && (
        <>
          <label>
            How would you like to help?
            <select name="support interest" required defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              <option>Sponsor a course or showcase</option>
              <option>Support participant stipends</option>
              <option>Serve as an instructor or mentor</option>
              <option>Provide a venue or industry connection</option>
              <option>Offer equipment, food, or in-kind resources</option>
              <option>Grant, fiscal, or institutional partnership</option>
              <option>Let’s discuss the best fit</option>
            </select>
          </label>
          <label>
            Organization
            <input name="organization" />
          </label>
        </>
      )}
      <div className="form-pair">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="form-pair">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        {kind === "vendor" && (
          <label>
            Space needed
            <select name="space needed" defaultValue="6-foot table">
              <option>6-foot table</option>
              <option>10 × 10 booth</option>
              <option>Food truck / trailer</option>
              <option>Not sure yet</option>
            </select>
          </label>
        )}
      </div>
      {kind === "vendor" && (
        <div className="form-pair">
          <label>
            Power needed?
            <select name="power">
              <option>No</option>
              <option>Standard outlet</option>
              <option>Special power needs</option>
              <option>Not sure</option>
            </select>
          </label>
          <label>
            Food permit status
            <select name="permit">
              <option>Not a food vendor</option>
              <option>Permitted</option>
              <option>In progress</option>
              <option>Need guidance</option>
            </select>
          </label>
        </div>
      )}
      {kind === "support" && (
        <div className="form-pair">
          <label>
            Potential support range
            <select name="support range">
              <option>Let’s discuss</option>
              <option>Under $500</option>
              <option>$500–$1,499</option>
              <option>$1,500–$4,999</option>
              <option>$5,000+</option>
              <option>In-kind / nonfinancial</option>
            </select>
          </label>
          <label>
            Preferred timing
            <select name="timing">
              <option>As soon as possible</option>
              <option>Within 30 days</option>
              <option>Within 3 months</option>
              <option>Exploring future support</option>
            </select>
          </label>
        </div>
      )}
      <label>
        Details
        <textarea
          name="details"
          rows={5}
          placeholder={
            kind === "vendor"
              ? "What will you offer? Include setup needs, pricing range, and any links."
              : kind === "support"
                ? "Share what you can offer, questions you have, or the outcome you want to support."
              : "Share the event, opportunity, timeline, and what you need from us."
          }
          required
        />
      </label>
      <p className="form-note">
        Submit opens your email app with this request addressed to {EMAIL}.
      </p>
      <div className="form-actions">
        <button type="button" className="text-button" onClick={close}>
          Cancel
        </button>
        <button className="button button-dark" type="submit">
          Prepare email ↗
        </button>
      </div>
    </form>
  );
}

function CinematicExperience({ close }: { close: () => void }) {
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    let cleanup = () => {};
    let raf = 0;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]) => {
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const contexts = canvases.current.map((canvas, index) => {
          if (!canvas) return null;
          const scene = canvas.closest(".cinematic-scene");
          if (!scene) return null;
          const state = { progress: 0 };
          const paint = () => {
            const context = canvas.getContext("2d");
            if (!context) return;
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            canvas.width = Math.max(1, width * ratio);
            canvas.height = Math.max(1, height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            const gradient = context.createRadialGradient(
              width * (0.35 + state.progress * 0.35),
              height * 0.48,
              20,
              width / 2,
              height / 2,
              width * 0.8,
            );
            gradient.addColorStop(0, "#c58b29");
            gradient.addColorStop(0.38, "#17130d");
            gradient.addColorStop(1, "#050403");
            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);
            const bars = 28;
            for (let bar = 0; bar < bars; bar += 1) {
              const pulse =
                25 +
                Math.abs(
                  Math.sin(state.progress * 18 + bar * 0.63 + index * 1.4),
                ) *
                  height *
                  0.28;
              context.fillStyle =
                bar % 4 === 0 ? "#fff8e7" : index === 2 ? "#d3a44d" : "#b98527";
              context.globalAlpha = 0.3 + (bar % 5) * 0.12;
              context.fillRect(
                (bar / bars) * width,
                height / 2 - pulse / 2,
                Math.max(3, width / bars - 7),
                pulse,
              );
            }
            context.globalAlpha = 1;
            context.strokeStyle = "#f4d28f";
            context.lineWidth = 2;
            context.beginPath();
            for (let x = 0; x < width; x += 5) {
              const y =
                height * 0.5 +
                Math.sin(x * 0.025 + state.progress * 20) *
                  (18 + state.progress * 44);
              if (x === 0) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.stroke();
          };
          paint();
          return gsap.to(state, {
            progress: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "+=115%",
              scrub: true,
              pin: true,
              onUpdate: () => {
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(paint);
              },
            },
          });
        });
        ScrollTrigger.refresh();
        cleanup = () => {
          contexts.forEach((context) => context?.kill());
          ScrollTrigger.getAll().forEach((trigger) => {
            if (
              (trigger.trigger as HTMLElement | undefined)?.closest(
                ".cinematic-experience",
              )
            )
              trigger.kill();
          });
        };
      },
    );
    return () => {
      cleanup();
      cancelAnimationFrame(raf);
    };
  }, []);

  const scenes = [
    ["01", "The room responds.", "A raw pulse powers on the production space."],
    [
      "02",
      "The signal travels.",
      "Ideas, files, stems, and feedback move into a shared system.",
    ],
    [
      "03",
      "The crowd decides.",
      "The finished beat leaves the screen and becomes a live cultural moment.",
    ],
  ];

  return (
    <section className="cinematic-experience" aria-label="Cinematic experience">
      <button className="experience-close" type="button" onClick={close}>
        Close experience ×
      </button>
      {scenes.map(([number, title, copy], index) => (
        <article className="cinematic-scene" key={number}>
          <canvas
            ref={(node) => {
              canvases.current[index] = node;
            }}
            aria-hidden="true"
          />
          <div className="cinematic-copy">
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Bracket() {
  const [bracket, setBracket] = useState<BracketState>(() =>
    buildDefaultBracket(),
  );
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let restored: BracketState | null = null;
    try {
      const saved = localStorage.getItem(BRACKET_KEY);
      if (saved) restored = JSON.parse(saved) as BracketState;
    } catch {
      // A private browser can decline storage; the bracket still works in memory.
    }
    const timer = window.setTimeout(() => {
      if (restored) setBracket(restored);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(BRACKET_KEY, JSON.stringify(bracket));
    } catch {
      // Keep the live state even if storage is unavailable.
    }
  }, [bracket]);

  const rounds = useMemo(() => {
    const tournament: string[][][] = [];
    let entrants = [
      ...bracket.names,
      ...Array.from(
        { length: Math.max(0, bracket.slots - bracket.names.length) },
        () => "",
      ),
    ];
    const roundCount = Math.log2(bracket.slots);
    for (let round = 0; round < roundCount; round += 1) {
      const matches = Array.from(
        { length: entrants.length / 2 },
        (_, index) => [
          entrants[index * 2] || `Winner ${index * 2 + 1}`,
          entrants[index * 2 + 1] || `Winner ${index * 2 + 2}`,
        ],
      );
      tournament.push(matches);
      entrants = matches.map(
        (_, index) => bracket.picks[`${round}-${index}`] || "",
      );
    }
    return tournament;
  }, [bracket]);

  const champion =
    bracket.picks[`${rounds.length - 1}-0`] || "Champion TBD";

  function chooseWinner(round: number, match: number, name: string) {
    if (!name || name.startsWith("Winner")) return;
    setBracket((current) => {
      const picks = Object.fromEntries(
        Object.entries(current.picks).filter(
          ([key]) => Number(key.split("-")[0]) <= round,
        ),
      );
      picks[`${round}-${match}`] = name;
      return { ...current, picks };
    });
  }

  const roundLabels = Array.from(
    { length: Math.log2(bracket.slots) },
    (_, index) => {
      const remaining = bracket.slots / 2 ** index;
      if (remaining === 2) return "FINAL";
      if (remaining === 4) return "SEMIFINALS";
      if (remaining === 8) return "QUARTERFINALS";
      return `ROUND OF ${remaining}`;
    },
  );

  function addProducer() {
    setBracket((current) => {
      if (current.names.length >= 32) return current;
      const names = [...current.names, ""];
      return {
        slots: bracketCapacity(names.length),
        names,
        picks: {},
      };
    });
  }

  function removeProducer() {
    setBracket((current) => {
      if (current.names.length <= 2) return current;
      const names = current.names.slice(0, -1);
      return {
        slots: bracketCapacity(names.length),
        names,
        picks: {},
      };
    });
  }

  return (
    <div className="bracket-pocket">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">LIVE TOURNAMENT</p>
          <h3>Nashville Beat Battle</h3>
        </div>
        <button
          className="text-button"
          type="button"
          onClick={() => setEditing((value) => !value)}
        >
          {editing ? "Close setup" : "Manage producer slots"}
        </button>
      </div>
      {editing && (
        <div className="bracket-setup">
          <div className="slot-toggle" aria-label="Manage bracket producers">
            <button className="add-producer" type="button" onClick={addProducer}>
              <span aria-hidden="true">＋</span> Add producer
            </button>
            <button
              type="button"
              onClick={removeProducer}
              disabled={bracket.names.length <= 2}
            >
              Remove last
            </button>
            <small>
              {bracket.names.length} producers · {bracket.slots}-position bracket
            </small>
          </div>
          <p className="bracket-help">
            Start head-to-head, then add producers one at a time. The bracket
            expands automatically through 4, 8, 16, and 32 positions.
          </p>
          <div className="roster-grid">
            {bracket.names.map((name, index) => (
              <label key={index}>
                Slot {index + 1}
                <input
                  value={name}
                  onChange={(event) =>
                    setBracket((current) => ({
                      ...current,
                      names: current.names.map((item, itemIndex) =>
                        itemIndex === index ? event.target.value : item,
                      ),
                    }))
                  }
                />
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="bracket-scroll">
        {rounds.map((round, roundIndex) => (
          <div className="bracket-round" key={roundIndex}>
            <p>{roundLabels[roundIndex]}</p>
            <div className={`round-matches round-${roundIndex}`}>
              {round.map((match, matchIndex) => (
                <div className="match" key={matchIndex}>
                  {match.map((name, entrantIndex) => (
                    <button
                      key={`${name}-${entrantIndex}`}
                      type="button"
                      disabled={!name}
                      className={
                        bracket.picks[`${roundIndex}-${matchIndex}`] === name
                          ? "is-winner"
                          : ""
                      }
                      onClick={() =>
                        chooseWinner(roundIndex, matchIndex, name)
                      }
                    >
                      {name || `Winner ${matchIndex * 2 + entrantIndex + 1}`}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="champion-pocket">
          <small>BRACKET WINNER</small>
          <strong>{champion}</strong>
          <span>NASHVILLE BEAT BATTLE</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [boostOpen, setBoostOpen] = useState(false);
  const [battleOpen, setBattleOpen] = useState(false);
  const [bracketOpen, setBracketOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [leasesOpen, setLeasesOpen] = useState(false);
  const [modal, setModal] = useState<ModalKind>(null);
  const [activeArticle, setActiveArticle] = useState<number | null>(3);
  const [instagramIndex, setInstagramIndex] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 500);
    let nextPost = Math.floor(Math.random() * instagramPosts.length);
    try {
      const last = Number(localStorage.getItem("beat-list-instagram") || "-1");
      nextPost =
        (last + 1 + Math.floor(Math.random() * 3)) % instagramPosts.length;
      localStorage.setItem("beat-list-instagram", String(nextPost));
    } catch {}
    const postTimer = window.setTimeout(() => setInstagramIndex(nextPost), 0);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(postTimer);
    };
  }, []);

  useEffect(() => {
    let stop = () => {};
    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisModule, gsapModule, scrollModule]) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const Lenis = lenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 0.85, smoothWheel: true });
      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((element) =>
        gsap.fromTo(
          element,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: element, start: "top 88%" },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );
      });
      stop = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });
    return stop;
  }, [boostOpen, battleOpen, archiveOpen, leasesOpen]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
        setBoostOpen(false);
        setBattleOpen(false);
        setLeasesOpen(false);
        setBracketOpen(false);
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  function toggleAudio(index: number) {
    audioRefs.current.forEach((audio, audioIndex) => {
      if (audioIndex !== index) audio?.pause();
    });
    const audio = audioRefs.current[index];
    if (!audio) return;
    if (playing === index) {
      audio.pause();
      setPlaying(null);
    } else {
      void audio.play();
      setPlaying(index);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`site-loader ${loaded ? "is-loaded" : ""}`}>
        <img src="/media/beat-list-logo-full.png" alt="" />
        <span>Loading the room</span>
      </div>

      <header className="site-header">
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>Menu</span>
          <i aria-hidden="true">••</i>
        </button>
        <a className="header-logo" href="#top" aria-label="The Beat List home">
          <img src="/media/beat-list-logo-full.png" alt="The Beat List" />
        </a>
        <button
          className="header-join"
          type="button"
          onClick={() => setModal("submit")}
        >
          Join ↗
        </button>
        {menuOpen && (
          <nav className="menu-drawer" aria-label="Main navigation">
            <a href="#music-boost" onClick={() => setMenuOpen(false)}>
              Nashville Music Boost
            </a>
            <a href="#battle" onClick={() => setMenuOpen(false)}>
              Nashville Beat Battle
            </a>
            <a href="#history" onClick={() => setMenuOpen(false)}>
              Archive
            </a>
            <a href="#founder" onClick={() => setMenuOpen(false)}>
              Founder
            </a>
            <button type="button" onClick={() => setModal("vendor")}>
              Vendor application
            </button>
            <button type="button" onClick={() => setModal("inquiry")}>
              Contact / booking
            </button>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <img
            className="hero-logo"
            src="/media/beat-list-logo-full.png"
            alt="The Beat List — Only The Best"
          />
          <p className="hero-kicker">NASHVILLE · PRODUCERS · OPPORTUNITY</p>
          <h1>
            Where Producers
            <br />
            Get Heard.
          </h1>
          <p className="hero-copy">
            Beat battles, paid creative development, industry access, and
            Nashville-made music.
          </p>
          <div className="hero-actions">
            <button
              className="button button-dark"
              type="button"
              onClick={() => setBattleOpen(true)}
            >
              Enter the next battle ↗
            </button>
            <button
              className="button button-light"
              type="button"
              onClick={() => setExperienceOpen(true)}
            >
              Enter the experience
            </button>
          </div>
          <div className="impact-wheel" aria-label="The Beat List reach">
            <div className="impact-track">
              {[...impact, ...impact].map(([number, label], index) => (
                <div className="impact-chip" key={`${label}-${index}`}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="partner-reel" aria-label="Past and proposed partners">
            <p>BUILT WITH NASHVILLE PARTNERS</p>
            <div className="partner-window">
              <div className="partner-track">
                {[...partners, ...partners].map(([src, name], index) => (
                  <div className="partner-logo" key={`${name}-${index}`}>
                    <img src={src} alt={name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="impact-actions" aria-label="Quick actions">
            <button
              className="button button-dark"
              type="button"
              onClick={() => setModal("submit")}
            >
              Submit music
            </button>
            <button
              className="button button-light"
              type="button"
              onClick={() => setModal("vendor")}
            >
              Vendor application
            </button>
            <button
              className="button button-light"
              type="button"
              onClick={() => setModal("inquiry")}
            >
              Partner / book
            </button>
          </div>
          <details className="method-note">
            <summary>How the figures are calculated</summary>
            <p>
              Submission totals come from three connected forms: 61 rows and 51
              unique producer contacts. Attendance uses the midpoint of the
              reported 50–75 people across 20 battles. Campaign reach estimates
              3K–10K per battle and is cumulative—not unique people.
            </p>
          </details>
        </section>

        {experienceOpen && (
          <CinematicExperience close={() => setExperienceOpen(false)} />
        )}

        <section className="room-section">
          <img src="/media/history-nbb-xi-stage.jpg" alt="" data-parallax />
          <div className="room-shade" />
          <div className="room-copy" data-reveal>
            <p className="eyebrow light">BEFORE THE BRACKET</p>
            <h2 aria-label="The room responds.">
              {"THE ROOM RESPONDS.".split("").map((letter, index) => (
                <span style={{ "--letter": index } as React.CSSProperties} key={index}>
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </h2>
            <p>
              A beat leaves the laptop. The producer reads the room. The room
              answers back.
            </p>
          </div>
        </section>

        <section className="history-intro" id="history">
          <img src="/media/history-nbb-xiii.jpg" alt="" data-parallax />
          <div className="history-overlay" />
          <div className="history-content" data-reveal>
            <p className="eyebrow light">BUILT OVER TIME</p>
            <h2>Beats. Community. Competition.</h2>
            <p>
              Twenty battles later, the archive holds the people, rooms, and
              decisions that built the platform.
            </p>
            <button
              className="button button-white"
              type="button"
              onClick={() => setArchiveOpen((value) => !value)}
            >
              {archiveOpen ? "Close archive" : "Explore the archive"}
            </button>
          </div>
        </section>

        {archiveOpen && (
          <section className="archive-panel" aria-label="Beat Battle archive">
            <div className="archive-grid">
              <figure>
                <img
                  src="/media/history-nbb-xi-lobby.jpg"
                  alt="Guests gathering at a Nashville Beat Battle"
                />
                <figcaption>THE ROOM FORMS · NBB XI</figcaption>
              </figure>
              <figure>
                <img
                  src="/media/history-nbb-xi-stage.jpg"
                  alt="Producer performing on a Nashville Beat Battle stage"
                />
                <figcaption>THE FORMAT SHARPENS · LIVE ON STAGE</figcaption>
              </figure>
              <figure>
                <img
                  src="/media/nbb-xix-stage.png"
                  alt="Nashville Beat Battle semifinal stage"
                />
                <figcaption>THE SERIES GROWS · NBB XIX</figcaption>
              </figure>
            </div>
            <div className="instagram-pocket">
              <div>
                <p className="eyebrow">FROM @THEBEATLISTOFFICIAL</p>
                <h3>A different post every visit.</h3>
                <button
                  className="text-button"
                  type="button"
                  onClick={() =>
                    setInstagramIndex(
                      (current) => (current + 1) % instagramPosts.length,
                    )
                  }
                >
                  Show another post ↻
                </button>
              </div>
              <iframe
                key={instagramPosts[instagramIndex]}
                title="The Beat List Instagram post"
                src={instagramPosts[instagramIndex]}
                loading="lazy"
              />
            </div>
          </section>
        )}

        <section className="platform-grid" aria-label="The Beat List programs">
          <article className="platform-card" id="music-boost" data-reveal>
            <span>01</span>
            <div className="platform-image">
              <img
                src="/media/nmb-2026-flyer.jpg"
                alt="Nashville Music Boost program flyer"
              />
            </div>
            <p className="eyebrow">NASHVILLE MUSIC BOOST</p>
            <h2>Talent deserves access.</h2>
            <p>
              Grant-backed education, paid creative work, mentorship, and
              public showcases.
            </p>
            <button
              className="card-action"
              type="button"
              onClick={() => setBoostOpen((value) => !value)}
            >
              {boostOpen ? "Close the story −" : "Read the grant story +"}
            </button>
          </article>
          <article className="platform-card featured" id="battle" data-reveal>
            <span>02</span>
            <div className="champion-card">
              <small>CURRENT CHAMPION</small>
              <strong>BLEAUX</strong>
              <em>NBB XX</em>
            </div>
            <p className="eyebrow">NASHVILLE BEAT BATTLE</p>
            <h2>Beats become moments.</h2>
            <p>
              Producers play original work. The crowd and judges decide what
              advances.
            </p>
            <button
              className="card-action"
              type="button"
              onClick={() => setBattleOpen((value) => !value)}
            >
              {battleOpen ? "Close live hub −" : "Open live hub +"}
            </button>
          </article>
          <article className="platform-card" data-reveal>
            <span>03</span>
            <div className="vinyl-visual" aria-hidden="true">
              <i />
            </div>
            <p className="eyebrow">BEAT LICENSES</p>
            <h2>The catalog stays live.</h2>
            <p>
              Preview original production and keep the existing lease flow
              available.
            </p>
            <button
              className="card-action"
              type="button"
              onClick={() => setLeasesOpen((value) => !value)}
            >
              {leasesOpen ? "Close catalog −" : "Browse beat leases +"}
            </button>
          </article>
        </section>

        <section className="outcomes-section" aria-label="Documented outcomes">
          <div className="outcomes-heading">
            <p className="eyebrow">WHAT THE WORK MADE POSSIBLE</p>
            <h2>Stories from the closeout record.</h2>
          </div>
          <div className="outcomes-window">
            <div className="outcomes-track">
              {[...outcomes, ...outcomes].map((outcome, index) => (
                <article className="outcome-card" key={`${outcome.label}-${index}`}>
                  <span>{outcome.label}</span>
                  <p>{outcome.text}</p>
                  <small>{outcome.credit}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        {boostOpen && (
          <div
            className="content-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setBoostOpen(false);
            }}
          >
          <section className="expanded-pocket boost-pocket content-popout">
            <button
              className="content-close"
              type="button"
              onClick={() => setBoostOpen(false)}
            >
              Close ×
            </button>
            <div className="section-heading">
              <div>
                <p className="eyebrow">NASHVILLE MUSIC BOOST</p>
                <h2>Development work, chapter by chapter.</h2>
              </div>
              <span className="funding-badge">Seeking 2026–27 grant support</span>
            </div>
            <div className="article-list">
              {articles.map((article, index) => (
                <article
                  className={`grant-article ${
                    activeArticle === index ? "is-open" : ""
                  }`}
                  key={article.year}
                >
                  <button
                    className="article-summary"
                    type="button"
                    aria-expanded={activeArticle === index}
                    onClick={() =>
                      setActiveArticle((current) =>
                        current === index ? null : index,
                      )
                    }
                  >
                    <span>{article.year}</span>
                    <strong>{article.title}</strong>
                    <i>+</i>
                  </button>
                  <div className="article-body-wrap">
                    <div className="article-body">
                      <p>{article.body}</p>
                      <small>{article.facts}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="accelerator-feature">
              <img
                src="/media/producer-accelerator-flyer.png"
                alt="Proposed Nashville Producer Accelerator"
              />
              <div>
                <p className="eyebrow">THE PROPOSED NEXT CHAPTER</p>
                <h3>Create with purpose. Connect with industry.</h3>
                <p>
                  If funding is awarded, the Producer Accelerator will connect
                  six learning experiences and two showcases across Jefferson
                  Street Sound Museum, Collective 41, and HOME. Participants
                  would be paid for each course and showcase they complete.
                </p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => setModal("support")}
                >
                  Support the proposal ↗
                </button>
              </div>
            </div>
          </section>
          </div>
        )}

        {battleOpen && (
          <div
            className="content-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setBattleOpen(false);
            }}
          >
          <section className="expanded-pocket battle-live content-popout">
            <button
              className="content-close"
              type="button"
              onClick={() => {
                setBattleOpen(false);
                setBracketOpen(false);
              }}
            >
              Close ×
            </button>
            <div className="live-heading">
              <div>
                <p className="eyebrow">THE STAGE IS READY</p>
                <h2>Nashville Beat Battle Live</h2>
                <p>
                  Enter the field, follow the bracket, vend at the next event,
                  or revisit the rooms that built the series.
                </p>
              </div>
              <div className="battle-motion">
                <video
                  src="/media/beat-battle-motion.mp4"
                  poster="/media/nbb-xx-flyer.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Nashville Beat Battle event montage"
                />
                <span>LIVE ENERGY · ORIGINAL BEATS · NASHVILLE</span>
              </div>
            </div>
            <div className="battle-actions">
              <button
                className="button button-dark"
                type="button"
                onClick={() => setModal("submit")}
              >
                Join the battle ↗
              </button>
              <button
                className="button button-light"
                type="button"
                onClick={() => setModal("submit")}
              >
                Submit music
              </button>
              <button
                className="button button-light"
                type="button"
                onClick={() => setBracketOpen((value) => !value)}
              >
                {bracketOpen ? "Hide bracket" : "Open live bracket"}
              </button>
              <button
                className="button button-light"
                type="button"
                onClick={() => setModal("vendor")}
              >
                Set up a vendor booth
              </button>
              <button
                className="button button-light"
                type="button"
                onClick={() => setModal("inquiry")}
              >
                Partner / book
              </button>
            </div>
            <div className="video-library">
              <div className="video-library-heading">
                <div>
                  <p className="eyebrow">WATCH THE PROGRESSION</p>
                  <h3>From early rooms to NBB XX.</h3>
                </div>
                <a
                  className="text-button"
                  href="https://www.youtube.com/@thebeatlistofficial/videos"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the official YouTube channel ↗
                </a>
              </div>
              <div className="video-rail">
                {youtubeVideos.map((video) => (
                  <article className="video-card" key={video.id}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <div>
                      <strong>{video.title}</strong>
                      <span>{video.caption}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="ticket-pocket">
              <div>
                <p className="eyebrow">TICKETS + UPCOMING EVENTS</p>
                <h3>Follow The Beat List on Eventbrite.</h3>
                <p>
                  The organizer profile keeps the next ticketed experience in
                  one place.
                </p>
              </div>
              <div className="eventbrite-frame">
                <iframe
                  src={EVENTBRITE_PROFILE}
                  title="The Beat List Eventbrite organizer page"
                  loading="lazy"
                />
                <a
                  className="button button-dark"
                  href={EVENTBRITE_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full Eventbrite profile ↗
                </a>
              </div>
            </div>
          </section>
          </div>
        )}

        {bracketOpen && (
          <div
            className="bracket-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setBracketOpen(false);
            }}
          >
            <div className="bracket-modal">
              <button
                className="bracket-modal-close"
                type="button"
                onClick={() => setBracketOpen(false)}
              >
                Close bracket ×
              </button>
              <Bracket />
            </div>
          </div>
        )}

        {leasesOpen && (
          <div
            className="content-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setLeasesOpen(false);
            }}
          >
          <section className="expanded-pocket catalog-pocket content-popout">
            <button
              className="content-close"
              type="button"
              onClick={() => setLeasesOpen(false)}
            >
              Close ×
            </button>
            <div className="section-heading">
              <div>
                <p className="eyebrow">BEAT CATALOG</p>
                <h2>Your next record may already be waiting.</h2>
              </div>
            </div>
            <div className="track-list">
              {catalog.map((track, index) => (
                <article className="track" key={track.title}>
                  <button
                    className="track-play"
                    type="button"
                    aria-label={`${playing === index ? "Pause" : "Play"} ${track.title}`}
                    onClick={() => toggleAudio(index)}
                  >
                    {playing === index ? "Ⅱ" : "▶"}
                  </button>
                  <div>
                    <strong>{track.title}</strong>
                    <span>{track.detail}</span>
                  </div>
                  <small>{track.genres}</small>
                  <a href={track.product} target="_blank" rel="noreferrer">
                    License ↗
                  </a>
                  <audio
                    ref={(node) => {
                      audioRefs.current[index] = node;
                    }}
                    src={track.audio}
                    preload="none"
                    onEnded={() => setPlaying(null)}
                  >
                    <track kind="captions" />
                  </audio>
                </article>
              ))}
            </div>
          </section>
          </div>
        )}

        <section className="founder-section" id="founder">
          <div className="founder-image">
            <img
              src="/media/over-the-years.png"
              alt="J Pierson working across Beat List events"
            />
          </div>
          <div className="founder-copy" data-reveal>
            <p className="eyebrow">FOUNDER · PRODUCER · EDUCATOR</p>
            <h2>J Pierson built it from inside the room.</h2>
            <p>
              A Nashville producer, audio engineer, educator, and Recording
              Industry graduate of MTSU, J Pierson has spent roughly 15 years
              building creative programs. His work includes production and
              poetry workshops with hundreds of Metro Nashville students,
              repeated Metro Arts Thrive support, and collaborations with
              Jefferson Street Sound Museum, HOME, Southern Word, and working
              producers across the city.
            </p>
            <p>
              The Beat List and Nashville Beat Battle turn that experience into
              a visible pathway: hear the work, challenge the work, develop the
              person, and open the next door.
            </p>
            <button
              className="text-button"
              type="button"
              onClick={() => setModal("inquiry")}
            >
              Contact J Pierson ↗
            </button>
          </div>
        </section>

        <section className="final-cta">
          <img src="/media/beat-list-logo-full.png" alt="The Beat List" />
          <p>MAKE THE BEAT. BUILD THE RECORD. MOVE THE CULTURE.</p>
          <h2>Your sound belongs on the list.</h2>
          <a className="email-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </section>
      </main>

      {modal && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setModal(null);
          }}
        >
          <div className={`modal-window ${modal === "submit" ? "form-window" : ""}`}>
            <button
              className="modal-close"
              type="button"
              aria-label="Close"
              onClick={() => setModal(null)}
            >
              ×
            </button>
            {modal === "submit" ? (
              <>
                <p className="eyebrow">JOIN THE NEXT BATTLE</p>
                <h2>Put your sound in the field.</h2>
                <iframe
                  src={FORM_URL}
                  title="Nashville Beat Battle submission form"
                >
                  Loading…
                </iframe>
              </>
            ) : (
              <MailForm
                kind={modal}
                close={() => setModal(null)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
