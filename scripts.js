// app.js
// All snippet definitions live here.
// To add/remove examples, just edit AUDIO_LIBRARY.

const AUDIO_LIBRARY = [
  {
    system: "SNES",
    examples: [
      {
        game: "Actraiser",
        file: "audio/snes/snes-actr.mp3",
      },
      {
        game: "Mega Man X",
        file: "audio/snes/snes-mmx.mp3",
      },
      {
        game: "Secret of Mana",
        file: "audio/snes/snes-sd2.mp3",
      },
      {
        game: "SimCity",
        file: "audio/snes/snes-simcity.mp3",
      },
      {
        game: "The Legend of Zelda: A Link to the Past",
        file: "audio/snes/snes-loz3.mp3",
      },
    ],
  },
  {
    system: "PlayStation",
    examples: [
      {
        game: "Final Fantasy IX",
        file: "audio/psx/psx-ff9.mp3",
      },
      {
        game: "Final Fantasy Tactics",
        file: "audio/psx/psx-fft.mp3",
      },
      {
        game: "Mega Man 8",
        file: "audio/psx/psx-mm8.mp3",
      },
      {
        game: "Parasite Eve",
        file: "audio/psx/psx-parasiteeve.mp3",
      },
      {
        game: "Saga Frontier 2",
        file: "audio/psx/psx-saga2.mp3",
      }
    ],
  },
  {
    system: "Saturn",
    examples: [
      {
        game: "Clockwork Knight",
        file: "audio/saturn/saturn-clockwork.mp3",
      },
      {
        game: "Nights into Dreams",
        file: "audio/saturn/saturn-nights.mp3",
      },
      {
        game: "Panzer Dragoon II Zwei",
        file: "audio/saturn/saturn-panzer2.mp3",
      },
    ],
  },
  {
    system: "PlayStation 2",
    examples: [
      {
        game: "Final Fantasy X",
        file: "audio/ps2/ps2-ffx.mp3",
      },
      {
        game: "Final Fantasy X-2",
        file: "audio/ps2/ps2-ffx2.mp3",
      },
      {
        game: "Front Mission 4",
        file: "audio/ps2/ps2-fm4.mp3",
      },
      {
        game: "Onimusha",
        file: "audio/ps2/ps2-onimusha.mp3",
      }
    ],
  },
  {
    system: "Nintendo DS",
    examples: [
      {
        game: "Castlevania: Dawn of Sorrow",
        file: "audio/nds/nds-cdos.mp3",
      },
      {
        game: "Contra 4",
        file: "audio/nds/nds-contra4.mp3",
      },
    ],
  },
  {
    system: "Arcade - Konami GX",
    examples: [
      {
        game: "Mystic Warriors",
        file: "audio/konamigx/konamigx-mystwarr.mp3",
      },
      {
        game: "Salamander 2",
        file: "audio/konamigx/konamigx-salmndr2.mp3",
      },
      {
        game: "Violent Storm",
        file: "audio/konamigx/konamigx-viostorm.mp3",
      },
    ],
  },
  {
    system: "Arcade - CPS1",
    note: "FM synthesis is rendered using a forthcoming VGMTrans build.",
    examples: [
      {
        game: "Final Fight",
        file: "audio/cps1/cps1-ffight.mp3",
      },
      {
        game: "Street Fighter II",
        file: "audio/cps1/cps1-sf2.mp3",
      },
      {
        game: "Strider",
        file: "audio/cps1/cps1-strider.mp3",
      },
    ],
  },
  {
    system: "Arcade - CPS2",
    examples: [
      {
        game: "Super Street Fighter II",
        file: "audio/cps2/cps2-ssf2.mp3",
      },
      {
        game: "Vampire Savior",
        file: "audio/cps2/cps2-vsav.mp3",
      },
    ],
  },
  {
    system: "Arcade - CPS3",
    examples: [
      {
        game: "Street Fighter III: 2nd Impact",
        file: "audio/cps3/cps3-sfiii2.mp3",
      },
      {
        game: "Street Fighter III: 3rd Strike",
        file: "audio/cps3/cps3-sfiii3.mp3",
      },
    ],
  },
];

// ------- UI + audio wiring -------

(function () {
  const state = {
    audio: null,
    currentKey: null, // "systemIndex-trackIndex"
  };

  function createAudio() {
    const audio = new Audio();
    audio.preload = "none";
    return audio;
  }

  function keyFromIndices(systemIndex, trackIndex) {
    return `${systemIndex}-${trackIndex}`;
  }

  function buildUI() {
    const library = Array.isArray(AUDIO_LIBRARY) ? AUDIO_LIBRARY : [];
    const root = document.getElementById("app");
    if (!root) return;

    root.innerHTML = "";

    if (!library.length) {
      const empty = document.createElement("p");
      empty.textContent = "No examples have been added yet.";
      empty.style.color = "#a0a7b2";
      root.appendChild(empty);
      return;
    }

    state.audio = createAudio();

    library.forEach((systemEntry, systemIndex) => {
      const section = document.createElement("section");
      section.className = "system-section";

      const heading = document.createElement("div");
      heading.className = "system-heading";

      const nameEl = document.createElement("h2");
      nameEl.className = "system-name";
      nameEl.textContent = systemEntry.system;

      // const countEl = document.createElement("span");
      // countEl.className = "system-count";
      // const count = (systemEntry.examples || []).length;
      // countEl.textContent =
      //   count > 0 ? `${count} example${count > 1 ? "s" : ""}` : "No examples";

      heading.appendChild(nameEl);
      // heading.appendChild(countEl);
      section.appendChild(heading);

       // Optional note under system heading
      if (systemEntry.note) {
        const noteEl = document.createElement("p");
        noteEl.className = "system-note";
        noteEl.textContent = systemEntry.note;
        section.appendChild(noteEl);
      }

      const list = document.createElement("ul");
      list.className = "track-list";

      (systemEntry.examples || []).forEach((track, trackIndex) => {
        const li = document.createElement("li");
        li.className = "track-item";
        li.dataset.key = keyFromIndices(systemIndex, trackIndex);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "play-button";
        btn.textContent = "▶"; // play icon
        btn.setAttribute("aria-label", `Play ${track.game}`);
        btn.setAttribute("aria-pressed", "false");
        btn.dataset.game = track.game;

        // Equalizer indicator (3 bars inside a square)
        const eq = document.createElement("span");
        eq.className = "eq";
        for (let i = 0; i < 3; i++) {
          const bar = document.createElement("span");
          bar.className = "eq-bar";
          eq.appendChild(bar);
        }

        const label = document.createElement("span");
        label.className = "track-label";
        label.textContent = track.game;

        li.appendChild(btn);
        li.appendChild(eq);
        li.appendChild(label);
        list.appendChild(li);

        btn.addEventListener("click", () => {
          handlePlayPause(systemIndex, trackIndex, track.file);
        });
      });

      section.appendChild(list);
      root.appendChild(section);
    });

    wireAudioEvents();
  }

  function wireAudioEvents() {
    if (!state.audio) return;

    state.audio.addEventListener("ended", () => {
      if (state.currentKey) {
        setTrackPlayingState(state.currentKey, false);
      }
      state.currentKey = null;
    });

    state.audio.addEventListener("pause", () => {
      if (state.currentKey && state.audio.currentTime > 0 && !state.audio.ended) {
        setTrackPlayingState(state.currentKey, false);
      }
    });
  }

  function setTrackPlayingState(key, isPlaying) {
    const root = document.getElementById("app");
    if (!root) return;

    // Reset all items
    const allItems = root.querySelectorAll(".track-item");
    allItems.forEach((item) => {
      const btn = item.querySelector(".play-button");
      if (!btn) return;
      const gameName = btn.dataset.game || "snippet";
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "▶";
      btn.setAttribute("aria-label", `Play ${gameName}`);
      item.classList.remove("playing");
    });

    if (!isPlaying) return;

    const target = root.querySelector(`.track-item[data-key="${key}"]`);
    if (!target) return;
    const btn = target.querySelector(".play-button");
    if (!btn) return;

    const gameName = btn.dataset.game || "snippet";
    btn.setAttribute("aria-pressed", "true");
    btn.textContent = "⏸";
    btn.setAttribute("aria-label", `Pause ${gameName}`);
    target.classList.add("playing");
  }

  function handlePlayPause(systemIndex, trackIndex, filePath) {
    if (!state.audio) return;

    const key = keyFromIndices(systemIndex, trackIndex);

    // Clicked the current track: toggle
    if (state.currentKey === key) {
      if (state.audio.paused) {
        state.audio.play();
        setTrackPlayingState(key, true);
      } else {
        state.audio.pause();
        setTrackPlayingState(key, false);
      }
      return;
    }

    // Switch to a different track
    state.currentKey = key;
    state.audio.src = filePath;
    state.audio
      .play()
      .then(() => setTrackPlayingState(key, true))
      .catch((err) => {
        console.error("Error playing audio:", err);
        setTrackPlayingState(key, false);
        state.currentKey = null;
      });
  }

  document.addEventListener("DOMContentLoaded", buildUI);
})();
