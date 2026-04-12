# Pitchforkle — Current State & Roadmap

**Last updated:** April 2026  
**Status:** Active development — pre-launch

---

## Current State

### What exists

A daily music game where players guess a Pitchfork album rating from the album cover alone. Three guesses per round; each guess returns a "too high" or "too low" signal. If the player doesn't get it in three, the album info is revealed and they're invited to play again.

### Current tech stack

| Layer | Current |
|---|---|
| Framework | React + TypeScript + Vite |
| Styling | (not specified) |
| Database | Supabase — 96 albums with ratings and album art URLs |
| Auth | None |
| State management | React useState |
| Deployment | Not yet deployed |

### Current features

- Album cover display (art served from external URLs)
- Fetch random album from Supabase
- 3-guess limit per round
- Too high / too low feedback per guess
- Album info reveal on game over
- Play again prompt
- Loading states and basic error handling for database failures

### Current limitations

- No daily puzzle — game is fully random with no Wordle-style date lock
- No user accounts or score persistence
- No streaks or history
- No archive or browse mode
- No progressive difficulty or information unlocks
- No shareable results
- No monitoring or error tracking
- No TypeScript strict mode

---

## Target Stack

| Layer | Current | Target | Skill gap closed |
|---|---|---|---|
| Framework | React + Vite | **Next.js (App Router)** | SSR for puzzle seeding, SEO |
| Styling | — | **Tailwind CSS** | Already in stack |
| Auth | None | **NextAuth v5 + Supabase adapter** | Auth & security ✓ |
| Database | Self-hosted | **Supabase (PostgreSQL)** | Supabase (developing) ✓ |
| State management | useState | **Zustand** | State management ✓ |
| Data fetching | — | **React Query (TanStack Query)** | React Query ✓ |
| Album art | External URLs | **MusicBrainz Cover Art Archive CDN** | External API integration |
| Music metadata | — | **MusicBrainz GraphQL API** | GraphQL ✓ |
| Monitoring | None | **Sentry** | Monitoring & observability ✓ |
| Deployment | None | **Vercel** | Already in stack |

---

## Supabase Schema

```sql
-- Daily puzzles queue
puzzles (
  id uuid primary key,
  scheduled_date date unique not null,
  album_id text not null,           -- MusicBrainz or Spotify ID
  album_title text not null,
  artist text not null,
  cover_url text not null,
  pitchfork_score numeric(3,1) not null,
  pitchfork_url text,
  is_best_new_music boolean default false,
  reviewer_name text,
  genre text,
  release_year int,
  created_at timestamptz default now()
)

-- User scores per puzzle
scores (
  id uuid primary key,
  user_id uuid references users(id),
  puzzle_id uuid references puzzles(id),
  guesses_taken int not null,
  hints_used text[],                -- which info unlocks were used
  final_score int not null,
  completed_at timestamptz default now(),
  unique(user_id, puzzle_id)
)

-- Streak tracking (derived, but cached for performance)
streaks (
  user_id uuid references users(id) primary key,
  current_streak int default 0,
  longest_streak int default 0,
  last_played_date date
)
```

---

## Feature Roadmap

### Phase 1 — Foundation (Week 1)
*Goal: get a working daily puzzle with the upgraded stack*

- [ ] Migrate from Vite to Next.js (App Router)
- [ ] Enable TypeScript strict mode
- [ ] Add `scheduled_date` column to existing Supabase `puzzles` table and queue all 96 albums
- [ ] Migrate album art URLs to MusicBrainz Cover Art Archive CDN
- [ ] Server-side daily puzzle seed — puzzle resolved by date on the server, answer never exposed to client JS
- [ ] Countdown timer to next puzzle + "come back tomorrow" message on completion
- [ ] Zustand game state machine — states: `idle → guessing → revealed → complete`
- [ ] Preserve existing 3-guess loop with too high / too low feedback
- [ ] Animated feedback on each guess
- [ ] Deploy to Vercel
- [ ] Sentry integration from day one
- [ ] Privacy-focused analytics (Plausible or Fathom)

### Phase 2 — Progressive Info Unlocks (Week 1–2)
*Goal: make guessing richer and more strategic*

The player starts with album art only. Before each guess they can unlock additional information, but each unlock **reduces their maximum possible score**. Unlocks are cumulative and can't be undone.

| Unlock | Score ceiling impact | Notes |
|---|---|---|
| Release year | −1 point | Least revealing — good first unlock |
| Genre | −1 point | Narrows field meaningfully |
| Reviewer name | −2 points | Pitchfork-savvy players can exploit reviewer tendencies |
| Best New Music | −3 points | Strong signal that score is 8.0+ — most revealing |

Scoring model (out of 10):
- Correct on guess 1, no unlocks = **10 points**
- Each wrong guess = −2 points
- Each unlock = penalty as above
- Minimum score for a correct answer = **1 point**

- [ ] Unlock UI — toggle panel below album art, disabled after game ends
- [ ] Score ceiling display — shows current max score in real time as unlocks are activated
- [ ] Zustand state tracks which unlocks are active and adjusts scoring accordingly
- [ ] Unlocks stored in `scores.hints_used` for archive display

### Phase 3 — Anonymous Stats & Share (Week 2)
*Goal: social sharing and streak tracking without requiring a login — lower barrier to virality*

LocalStorage stats for logged-out users:
- Games played
- Win rate
- Average attempts
- Current streak
- Best streak

- [ ] LocalStorage stats tracker — persists across sessions without auth
- [ ] "Save your streak" prompt on game complete — nudges toward account creation
- [ ] Share card generator — emoji grid + score + unlock summary (copy to clipboard)
- [ ] Countdown timer shown on result screen
- [ ] `og:image` meta tag for link previews (stretch)

Result share card format:

```
🎵 Pitchforkle #47
⭐ Score: 7/10

🟩 Too high
🟥 Too low
✅ Got it!

Unlocks used: Year, Genre
play.pitchforkle.com
```

### Phase 4 — Auth & Persistence (Week 2)
*Goal: sync stats to the cloud and give players a reason to return across devices*

- [ ] NextAuth v5 setup — Google and GitHub login
- [ ] Supabase NextAuth adapter — users table auto-populated on first login
- [ ] Migrate LocalStorage stats to Supabase on first login
- [ ] Row-level security on `scores` table — users can only read/write their own scores
- [ ] Score saving on game complete
- [ ] Streak tracking — `streaks` table updated after each completed puzzle
- [ ] Cross-device progress sync
- [ ] Protected routes for profile / history pages

### Phase 5 — Archive & Browse (Post-MVP)
*Goal: surface the full dataset and keep users engaged between daily puzzles*

- [ ] Archive page — list of all past puzzles, date-sorted, with user's result shown inline
- [ ] Replay mode — past puzzles playable but clearly marked, no streak impact
- [ ] Filter by genre, decade, Best New Music status
- [ ] Free-play / practice mode — random album from the full archive, no score saving

### Phase 6 — GraphQL, Data Expansion & UI Polish (Post-MVP)
*Goal: close the GraphQL skill gap, grow the dataset, and improve the overall experience*

- [ ] Integrate MusicBrainz GraphQL API for richer album/artist metadata queries
- [ ] Use GraphQL to fetch genre, release year, and related albums dynamically
- [ ] Explore Spotify API as an upgrade path for higher-res cover art CDN (requires OAuth setup)
- [ ] Automated scraping pipeline — keep Pitchfork ratings up to date and expand beyond 96 albums
- [ ] Album metadata enrichment — label, Spotify links, additional review data
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Sound effects (optional, user preference)
- [ ] Mobile UX improvements
- [ ] Accessibility audit — ARIA labels, screen reader support, keyboard navigation
- [ ] PWA support — offline mode, home screen install
- [ ] SEO optimisation — structured data, sitemap, meta tags
- [ ] Unit tests for game logic
- [ ] E2E tests for critical flows (daily puzzle, share, auth)

### Stretch Features (Backlog)

| Feature | Notes |
|---|---|
| Genre mode | Horror soundtracks, Hip-Hop, Indie only — niche daily puzzles |
| Decade filter | Only 90s albums, only 2000s — adds replayability |
| Best New Music only mode | Puzzle pulled exclusively from BNM-badged albums |
| Global leaderboard | Daily challenge rankings — requires auth |
| Friends leaderboard | Compare scores with followed users |
| Achievements / badges | Milestone rewards for streaks, perfect scores, etc. |
| Difficulty settings | Easy (5 guesses), Normal (3), Hard (1 guess, stricter rating tolerance, no unlocks) |
| Admin puzzle picker | Internal UI to schedule upcoming daily puzzles |
| AI hint (Anthropic API) | Claude generates a cryptic clue from album metadata — costs max 2 points |

---

## Skills Closed by This Project

| Gap from skills profile | How Pitchforkle closes it |
|---|---|
| State management (Zustand) | Game state machine with defined transitions and scoring logic |
| Auth & security | NextAuth v5, Supabase RLS, protected routes |
| GraphQL | MusicBrainz GraphQL API for metadata queries |
| React Query | External API fetching, caching, and autocomplete |
| Supabase (developing) | Auth adapter, schema design, RLS policies |
| Monitoring (Sentry) | Integrated from day one, production observability |
| Full-stack Next.js | SSR puzzle seeding, API routes for score submission |
| AI API integration | Claude hint system (stretch) |

---

## Open Questions

- **Dataset expansion:** 96 albums = ~3 months of daily puzzles. Automated scraping pipeline planned for Phase 6 — worth deciding on a target count before launch.
- **Spotify CDN:** MusicBrainz Cover Art Archive for MVP; Spotify API (OAuth) as a Phase 6 upgrade for higher-res art. Confirm image quality is acceptable before launch.
- **Score model:** Is a 10-point ceiling the right scale, or should it map more directly to Pitchfork's 0.0–10.0 scale for thematic consistency?
- **Guess feedback granularity:** Could add "very close" / "close" / "far off" banding in addition to too high / too low — would need to define thresholds (e.g. within 0.5 = very close). Decide before building Zustand state machine.
- **LocalStorage → Supabase migration:** What happens to a user's local streak if they sign up mid-run? Define the merge behaviour before building auth.
