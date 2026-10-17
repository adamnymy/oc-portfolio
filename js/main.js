(function () {
  "use strict";

  function setYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  function initNav() {
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("click", function (event) {
      if (
        menu.classList.contains("is-open") &&
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) close();
    });
  }

  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
      var label = button.querySelector("[data-copy-label]");
      var original = label ? label.textContent : "Copy";
      var resetTimer;

      button.addEventListener("click", function () {
        var value = button.getAttribute("data-copy");
        if (!value) return;

        function feedback(text) {
          if (!label) return;
          label.textContent = text;
          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(function () {
            label.textContent = original;
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(
            function () {
              feedback("Copied");
            },
            function () {
              feedback("Copy failed");
            }
          );
        } else {
          feedback("Copy failed");
        }
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initTyping() {
    var text = document.querySelector(".status__text");
    if (!text) return;
    var full = text.textContent.trim();
    if (!full) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    text.textContent = "";
    var i = 0;
    (function type() {
      text.textContent = full.slice(0, ++i);
      if (i < full.length) window.setTimeout(type, 38);
    })();
  }

  function initPad() {
    var messages = [
      "press start!",
      "welcome to adam's site.",
      "beep boop.",
      "still hand-built, no frameworks.",
      "try poking the ufo.",
      "double-tap to play.",
    ];
    var reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "pad";
    button.setAttribute("aria-label", "Press start");
    button.innerHTML =
      '<span class="pad__bubble" aria-live="polite"><span class="pad__text"></span><span class="pad__caret" aria-hidden="true"></span></span>' +
      '<span class="pad__case" aria-hidden="true"></span>';
    document.body.appendChild(button);

    var text = button.querySelector(".pad__text");
    var index = 0;
    var timer;

    button.addEventListener("click", function () {
      button.classList.add("is-awake");
      var message = messages[index % messages.length];
      index += 1;
      if (index >= messages.length) unlock("chatty");
      window.clearTimeout(timer);

      if (reduced) {
        text.textContent = message;
        return;
      }

      var i = 0;
      text.textContent = "";
      (function type() {
        text.textContent = message.slice(0, ++i);
        if (i < message.length) timer = window.setTimeout(type, 45);
      })();
    });
  }

  function initSky() {
    var ufoSvg =
      '<svg width="44" height="44" viewBox="0 0 44 44" fill="none">' +
      '<rect class="sky__dome" x="16" y="2" width="12" height="4"/>' +
      '<rect class="sky__dome" x="12" y="6" width="20" height="4"/>' +
      '<polygon class="sky__beam" points="16,16 28,16 36,44 8,44"/>' +
      '<rect class="sky__hull" x="4" y="10" width="36" height="6"/>' +
      '<rect class="sky__light-a" x="10" y="16" width="4" height="4"/>' +
      '<rect class="sky__light-b" x="20" y="16" width="4" height="4"/>' +
      '<rect class="sky__light-c" x="30" y="16" width="4" height="4"/>' +
      "</svg>";
    var jetSvg =
      '<svg width="36" height="16" viewBox="0 0 36 16" fill="none">' +
      '<rect class="sky__glass" x="10" y="2" width="6" height="4"/>' +
      '<rect class="sky__hull" x="4" y="6" width="24" height="4"/>' +
      '<rect class="sky__hull" x="28" y="2" width="6" height="4"/>' +
      '<rect class="sky__wing" x="12" y="10" width="10" height="4"/>' +
      '<rect class="sky__flame" x="28" y="6" width="6" height="4"/>' +
      "</svg>";

    var sky = document.createElement("div");
    sky.className = "sky";
    sky.setAttribute("aria-hidden", "true");
    sky.innerHTML =
      '<span class="sky__ufo">' +
      ufoSvg +
      '</span><span class="sky__jet">' +
      jetSvg +
      "</span>";
    document.body.appendChild(sky);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var ufo = sky.querySelector(".sky__ufo");
    var colors = [
      "--color-yellow",
      "--color-beacon",
      "--color-mint",
      "--color-violet",
    ];

    var ufoClicks = 0;

    ufo.addEventListener("click", function () {
      var rect = ufo.getBoundingClientRect();
      ufo.classList.remove("is-hit");
      void ufo.offsetWidth;
      ufo.classList.add("is-hit");
      ufoClicks += 1;
      unlock("ufo");
      if (ufoClicks >= 3) unlock("ufo3");

      colors.forEach(function (color, i) {
        var spark = document.createElement("span");
        spark.className = "sky__spark";
        spark.style.left = rect.left + rect.width / 2 + (i - 1.5) * 12 + "px";
        spark.style.top = rect.top + rect.height * 0.55 + "px";
        spark.style.background = "var(" + color + ")";
        sky.appendChild(spark);
        window.setTimeout(function () {
          spark.remove();
        }, 1000);
      });

      window.setTimeout(function () {
        ufo.classList.remove("is-hit");
      }, 1400);
    });
  }

  var TROPHY_INFO = {
    ufo: "met the ufo",
    ufo3: "poke it thrice",
    chatty: "chatty gamepad",
    cheat: "konami code",
    gamer: "score 30 in snake",
    night: "night owl",
    quests: "read every quest",
  };

  function readStore(store, key, fallback) {
    try {
      var raw = store.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(store, key, value) {
    try {
      store.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  function trophies() {
    return readStore(window.localStorage, "ahj:trophies", {});
  }

  function showToast(text) {
    var stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }

    var toast = document.createElement("p");
    toast.className = "toast";
    toast.innerHTML = '<span class="toast__badge" aria-hidden="true"></span>';
    toast.appendChild(document.createTextNode(text));
    stack.appendChild(toast);

    while (stack.children.length > 3) {
      stack.firstElementChild.remove();
    }
    window.setTimeout(function () {
      toast.remove();
    }, 4200);
  }

  function unlock(id) {
    var earned = trophies();
    if (earned[id]) return;
    earned[id] = true;
    writeStore(window.localStorage, "ahj:trophies", earned);
    showToast("Trophy unlocked — " + TROPHY_INFO[id]);
    refreshShelf();
  }

  function refreshShelf() {
    var shelf = document.querySelector(".shelf__list");
    if (!shelf) return;
    var earned = trophies();
    var count = 0;
    shelf.querySelectorAll("[data-trophy]").forEach(function (item) {
      var got = Boolean(earned[item.getAttribute("data-trophy")]);
      item.classList.toggle("is-unlocked", got);
      if (got) count += 1;
    });
    var counter = document.querySelector("[data-shelf-count]");
    if (counter) counter.textContent = count + " / 7";
  }

  function initTrophies() {
    var quest = window.location.pathname.match(/\/work\/([a-z-]+)\.html$/);
    if (quest && window.location.protocol !== "file:") {
      var visited = readStore(window.localStorage, "ahj:quests", []);
      if (visited.indexOf(quest[1]) === -1) visited.push(quest[1]);
      writeStore(window.localStorage, "ahj:quests", visited);
      if (visited.length >= 5) unlock("quests");
    }
    refreshShelf();
  }

  function initTheme() {
    var meta = document.querySelector('meta[name="theme-color"]');
    var toggles = document.querySelectorAll(".theme-toggle");

    function apply(night, persist) {
      if (night) {
        document.documentElement.dataset.theme = "night";
        if (meta) meta.setAttribute("content", "#211E2E");
      } else {
        delete document.documentElement.dataset.theme;
        if (meta) meta.setAttribute("content", "#FAF7EE");
      }
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-pressed", night ? "true" : "false");
        toggle.setAttribute(
          "aria-label",
          night ? "Switch to day mode" : "Switch to night mode"
        );
      });
      if (persist) {
        try {
          window.localStorage.setItem("ahj:theme", night ? "night" : "day");
        } catch (error) {}
      }
    }

    apply(document.documentElement.dataset.theme === "night", false);

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var night = document.documentElement.dataset.theme !== "night";
        apply(night, true);
        if (night) unlock("night");
      });
    });
  }

  function coinRain() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var rain = document.createElement("div");
    rain.className = "rain";
    rain.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 36; i += 1) {
      var coin = document.createElement("span");
      coin.className = "rain__coin";
      coin.style.left = Math.random() * 100 + "%";
      coin.style.setProperty("--delay", (Math.random() * 1.2).toFixed(2) + "s");
      coin.style.setProperty(
        "--fall",
        (2.4 + Math.random() * 1.6).toFixed(2) + "s"
      );
      rain.appendChild(coin);
    }
    document.body.appendChild(rain);
    window.setTimeout(function () {
      rain.remove();
    }, 6000);
  }

  function initKonami() {
    var sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    var progress = 0;

    document.addEventListener("keydown", function (event) {
      var key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === sequence[progress]) {
        progress += 1;
        if (progress === sequence.length) {
          progress = 0;
          coinRain();
          unlock("cheat");
        }
        return;
      }
      progress = key === sequence[0] ? 1 : 0;
    });
  }

  function initGame() {
    var pad = document.querySelector(".pad");
    if (!pad) return;

    var COLS = 20;
    var ROWS = 14;
    var CELL = 16;
    var DIRS = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    var game = null;
    var ctx = null;
    var state = null;

    function colors() {
      var css = window.getComputedStyle(document.documentElement);
      function token(name) {
        return css.getPropertyValue(name).trim();
      }
      return {
        bg: token("--color-screen"),
        snake: token("--color-mint"),
        food: token("--color-yellow"),
        faint: token("--color-on-screen-faint"),
        veil: token("--color-veil"),
        text: token("--color-on-screen"),
      };
    }

    function paint() {
      var c = colors();
      ctx.fillStyle = c.bg;
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

      if (c.faint) {
        ctx.fillStyle = c.faint;
        for (var gy = 0; gy < ROWS; gy += 1) {
          for (var gx = 0; gx < COLS; gx += 1) {
            if ((gx + gy) % 2 === 0) {
              ctx.fillRect(gx * CELL, gy * CELL, CELL, CELL);
            }
          }
        }
      }

      if (state.food) {
        ctx.fillStyle = c.food;
        ctx.fillRect(state.food.x * CELL + 4, state.food.y * CELL + 4, 8, 8);
      }

      ctx.fillStyle = c.snake;
      state.snake.forEach(function (part, i) {
        ctx.fillRect(part.x * CELL + 1, part.y * CELL + 1, CELL - 2, CELL - 2);
        if (i === 0) {
          ctx.fillStyle = c.bg;
          ctx.fillRect(part.x * CELL + 5, part.y * CELL + 5, 6, 6);
          ctx.fillStyle = c.snake;
        }
      });

      var scoreEl = game.querySelector('[data-game="score"]');
      if (scoreEl) scoreEl.textContent = state.score;
      var bestEl = game.querySelector('[data-game="best"]');
      if (bestEl) bestEl.textContent = state.best;
    }

    function placeFood() {
      do {
        state.food = {
          x: Math.floor(Math.random() * COLS),
          y: Math.floor(Math.random() * ROWS),
        };
      } while (
        state.snake.some(function (part) {
          return part.x === state.food.x && part.y === state.food.y;
        })
      );
    }

    function die() {
      state.dead = true;
      state.running = false;
      window.clearTimeout(state.timer);
      if (state.score > state.best) {
        state.best = state.score;
        writeStore(window.localStorage, "ahj:snake-best", state.best);
      }
      var c = colors();
      ctx.fillStyle = c.veil;
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = c.text;
      ctx.textAlign = "center";
      ctx.font = "20px monospace";
      ctx.fillText("GAME OVER", COLS * CELL / 2, 104);
      ctx.font = "12px monospace";
      ctx.fillText(
        "score " + state.score + " · click or space to retry",
        COLS * CELL / 2,
        132
      );
      ctx.textAlign = "start";
      var bestEl = game.querySelector('[data-game="best"]');
      if (bestEl) bestEl.textContent = state.best;
    }

    function tick() {
      if (state.dead) return;
      state.dir = state.nextDir;
      var head = {
        x: state.snake[0].x + state.dir.x,
        y: state.snake[0].y + state.dir.y,
      };
      var hitWall =
        head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
      var hitSelf = state.snake.some(function (part) {
        return part.x === head.x && part.y === head.y;
      });
      if (hitWall || hitSelf) {
        die();
        return;
      }

      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 1;
        if (state.speed > 70) state.speed -= 6;
        if (state.score >= 30) unlock("gamer");
        placeFood();
      } else {
        state.snake.pop();
      }
      paint();
      state.timer = window.setTimeout(tick, state.speed);
    }

    function start() {
      if (state) window.clearTimeout(state.timer);
      state = {
        snake: [{ x: 9, y: 7 }],
        dir: DIRS.right,
        nextDir: DIRS.right,
        food: null,
        score: 0,
        speed: 150,
        best: readStore(window.localStorage, "ahj:snake-best", 0),
        dead: false,
        running: true,
        timer: null,
      };
      placeFood();
      paint();
      state.timer = window.setTimeout(tick, 500);
    }

    function turn(dir) {
      if (!state || state.dead) return;
      var d = DIRS[dir];
      if (d.x === -state.dir.x && d.y === -state.dir.y) return;
      state.nextDir = d;
    }

    function keyDir(key) {
      if (key === "ArrowUp" || key === "w" || key === "W") return "up";
      if (key === "ArrowDown" || key === "s" || key === "S") return "down";
      if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
      if (key === "ArrowRight" || key === "d" || key === "D") return "right";
      return null;
    }

    function onKey(event) {
      if (game.hidden) return;
      if (event.key === "Escape") {
        close();
        return;
      }
      if (state && state.dead && event.key === " ") {
        event.preventDefault();
        start();
        return;
      }
      var dir = keyDir(event.key);
      if (dir) {
        event.preventDefault();
        turn(dir);
      }
    }

    function open() {
      if (!game) build();
      game.hidden = false;
      document.body.style.overflow = "hidden";
      game.querySelector(".game__close").focus();
      start();
    }

    function close() {
      game.hidden = true;
      document.body.style.overflow = "";
      if (state) {
        window.clearTimeout(state.timer);
        state.running = false;
      }
      pad.focus();
    }

    function build() {
      game = document.createElement("div");
      game.className = "game";
      game.hidden = true;
      game.innerHTML =
        '<div class="game__panel" role="dialog" aria-modal="true" aria-label="Snake mini-game">' +
        '<div class="game__head">' +
        "<span>snake.exe · score " +
        '<span data-game="score">0</span> · best ' +
        '<span data-game="best">0</span></span>' +
        '<button class="game__close" type="button" aria-label="Close game">x</button>' +
        "</div>" +
        '<canvas class="game__screen" width="320" height="224"></canvas>' +
        '<div class="game__pad">' +
        '<button class="game__key" type="button" data-dir="up" aria-label="Up">&#9650;</button>' +
        '<button class="game__key" type="button" data-dir="left" aria-label="Left">&#9664;</button>' +
        '<button class="game__key" type="button" data-dir="down" aria-label="Down">&#9660;</button>' +
        '<button class="game__key" type="button" data-dir="right" aria-label="Right">&#9654;</button>' +
        "</div>" +
        "</div>";
      document.body.appendChild(game);

      ctx = game.querySelector(".game__screen").getContext("2d");
      game.querySelector(".game__close").addEventListener("click", close);
      game.querySelector(".game__screen").addEventListener("click", function () {
        if (state && state.dead) start();
      });
      game.addEventListener("click", function (event) {
        if (event.target === game) close();
      });
      game.querySelectorAll(".game__key").forEach(function (key) {
        key.addEventListener("click", function () {
          turn(key.getAttribute("data-dir"));
        });
      });
      document.addEventListener("keydown", onKey);
      document.addEventListener("visibilitychange", function () {
        if (!state || state.dead) return;
        if (document.hidden) {
          window.clearTimeout(state.timer);
          state.running = false;
        } else if (!state.running && !game.hidden) {
          state.running = true;
          state.timer = window.setTimeout(tick, state.speed);
        }
      });

      var lastTouch = 0;
      pad.addEventListener("touchend", function (event) {
        var now = Date.now();
        if (now - lastTouch < 350) {
          event.preventDefault();
          lastTouch = 0;
          open();
          return;
        }
        lastTouch = now;
      }, { passive: false });
      pad.addEventListener("dblclick", open);
    }

    build();
  }

  function ghDays(events) {
    var counts = {};
    events.forEach(function (event) {
      if (event.type !== "PushEvent") return;
      var key = event.created_at.slice(0, 10);
      counts[key] = (counts[key] || 0) + 1;
    });

    var today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    var mondayOffset = (today.getUTCDay() + 6) % 7;
    var start = new Date(today);
    start.setUTCDate(today.getUTCDate() - mondayOffset - 11 * 7);

    var days = [];
    for (var i = 0; i < 84; i += 1) {
      var day = new Date(start);
      day.setUTCDate(start.getUTCDate() + i);
      var key = day.toISOString().slice(0, 10);
      days.push({ key: key, count: counts[key] || 0, future: day > today });
    }
    return days;
  }

  function renderGh(days) {
    var panel = document.querySelector(".gh");
    if (!panel) return;
    var grid = panel.querySelector(".gh__grid");
    grid.textContent = "";
    var total = 0;
    days.forEach(function (day) {
      var cell = document.createElement("span");
      cell.className = "gh__cell";
      if (day.future) {
        cell.classList.add("gh__cell--empty");
      } else if (day.count > 0) {
        var level = day.count >= 6 ? "l3" : day.count >= 3 ? "l2" : "l1";
        cell.classList.add("gh__cell--" + level);
        total += day.count;
      }
      grid.appendChild(cell);
    });
    grid.setAttribute(
      "aria-label",
      "GitHub push activity: " + total + " pushes in the last 12 weeks"
    );
    panel.hidden = false;
  }

  function initGhGraph() {
    if (!document.querySelector(".gh")) return;
    var cache = readStore(window.sessionStorage, "ahj:gh", null);
    if (cache && Date.now() - cache.at < 15 * 60 * 1000) {
      renderGh(cache.days);
      return;
    }
    window
      .fetch(
        "https://api.github.com/users/adamnymy/events/public?per_page=100"
      )
      .then(function (response) {
        if (!response.ok) throw new Error("github " + response.status);
        return response.json();
      })
      .then(function (events) {
        var days = ghDays(events);
        writeStore(window.sessionStorage, "ahj:gh", {
          at: Date.now(),
          days: days,
        });
        renderGh(days);
      })
      .catch(function () {});
  }

  function init() {
    setYear();
    initNav();
    initCopy();
    initReveal();
    initTyping();
    initPad();
    initSky();
    initTheme();
    initTrophies();
    initKonami();
    initGame();
    initGhGraph();
    window.__siteReady = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
