import { Movie, Participant, UserProfile, WatchParty } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user-alex',
  name: 'Alex Rivera',
  username: 'alex',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB_GMrZhWQiIXEtPUiBOq2ZzLZKq4j31nd4r4DwHQkbGWciCBJ5vEgLMy1CCTPwrv40s9k-636xtfJg95YwrCzqimDWyUcjDJNMxj-hGX56UQbO3UGBm6RpoG2aInhGrsW1SF5KOrsz8LUEs1T3ujBN-LxfhuHaj87wZpOK-TOi34l5ynLZE7CzY9Zuy715TlClQelg53NNYgUrrp1ojZ1RRt__a0DUv9h7NZ_mXIM',
  presence: 'Ready'
};

export const MOCK_FRIENDS: Participant[] = [
  {
    id: 'friend-elena',
    name: 'Elena V.',
    username: 'elena',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9iKratuWnkjq1_Fs6mZhXJwIcK86nIev7NkwZhSx7UnV_YL4y_F2jVbQ1O_6aygiO16c-4-zlJo36T8LZBpqJvw3trzVvtHXEOHzc1k28HpMBej_MXjVEw75u1hlecKbgPRl7PZOS45G51k1PxqNq3DxJ_ZZlF6Twt_BDvVNAn5Tb1K4ddypMSIKc463QwP5a2NIcQL2uhM3tBbrpVK0DPo0QSbXeUdJkc3f_Wok',
    presence: 'Watching',
    currentActivity: 'Cyberpunk: EDG (01:14:20)'
  },
  {
    id: 'friend-marcus',
    name: 'Marcus T.',
    username: 'marcus',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVTnAFPgQFAXJMqqju6lJEsGHDr-VWpIzICoPYx3isn8K9c7W6nw7uTfV-c7BX3Z2WsMT_mOFiHaPJHV8VviG2DJ2ILj50ThrbFNr4l--QY0ttOEBbzAMvflNcIT7WikJeHJl6X3J_q8tUbxkHwnT8LwHrTf0W_X_6rlGmwSTAHNkEZ3lQf9E580ZHkR21JB4AnMW7qdvThNFenEZeki63nGfu1dkb8gtbWyxoNpnB',
    presence: 'Ready',
    currentActivity: 'In Lobby (Pre-show lounge)'
  },
  {
    id: 'friend-sarah-k',
    name: 'Sarah K.',
    username: 'sarah_k',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh5O7JXlgn2dG8TEpNdYeOVdQPRwvnJbdxZL2xxj9VUvTTfL-fjCMOQeKz-VNqjaJW9CRYPFaol43XneYo3abaQaWEDPWTK99z8SpFAhcVTyXJCUSYF5tCZ9fWlwqTir8vbYLAv9MiXh-GKG5WRrXgXNSba-EwGPpS3LGxCc9_dOOFuSlIuJObEBYfGbzSiRCssQGXuMzpb6LBunILfIvQe59QYskp_CYXKjv7Ps0V',
    presence: 'Away',
    currentActivity: 'Browsing Sci-Fi catalog'
  },
  {
    id: 'friend-jin',
    name: 'Jin Woo',
    username: 'jin',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfpQkx7hCUilEiU0ph87OHFbsVTq_FUFCVIpnFaygDfMXabEGtxcYN7eFvHFkVnBwM0dMzMEB0Pa55pvPxBYBlOd99Auz6Stfkg9mvQ9WS0i3yCswxEIO7n1eWO6p7t4m3R6wf5nK4OnvepTgpGxeWGc-Lm_4kRp_hkak8kS02Mdmggt-m4QeDXK8sprZSUb-v7Hfg6CSN3PuT9fhRTgeHVFPhp9RZkAsY-kphzGKw',
    presence: 'Ready',
    currentActivity: 'Anime Club Room (Mic on)'
  }
];

export const BLADE_RUNNER_MOVIE: Movie = {
  id: 'blade-runner-2049',
  title: 'Blade Runner 2049',
  year: 2017,
  duration: '2h 44m',
  ratingImdb: '8.0',
  ratingRottenTomatoes: '88%',
  ageRating: 'R • 163 min',
  synopsis: "Thirty years after the events of the first film, a new Blade Runner, LAPD Officer K (Ryan Gosling), unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former LAPD blade runner who has been missing for three decades.",
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63AaJ1tcrwkTqN9_4HYix3MhPRSqurheBTN8Y_G5xgmdzVfxmDb6PWbYbqNw4uZ30FCUWhDu3S2-aNw4gJEPg2RgJj0H6TUpnzsY0kTXlA1I-Z_bsp6__aEZ0I6ilCj6L8BjgXj9oliIguvGciSD0vX2xifkL9VQTvEpXbBkOpOcdmYGFMkecinfetRfg_AxZqmL5uay7A5Dd_K_04-kEYPZANcsK52tlF7LsVRSy',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63AaJ1tcrwkTqN9_4HYix3MhPRSqurheBTN8Y_G5xgmdzVfxmDb6PWbYbqNw4uZ30FCUWhDu3S2-aNw4gJEPg2RgJj0H6TUpnzsY0kTXlA1I-Z_bsp6__aEZ0I6ilCj6L8BjgXj9oliIguvGciSD0vX2xifkL9VQTvEpXbBkOpOcdmYGFMkecinfetRfg_AxZqmL5uay7A5Dd_K_04-kEYPZANcsK52tlF7LsVRSy',
  genres: ['Sci-Fi', 'Mystery', 'Action'],
  director: {
    name: 'Denis Villeneuve',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZlvnqcWPw4Ys7z47grvORQ4vGNb9eVJ_d89pOj5o6OUiMUzM9Fe1pB1f5IjlMH-2MYJj6ikjHWydam1J97zcCEMI3uk9_PDxtjUpBPla5Et1j6iBpJ8rNu4uUbF-7UdW6W-xxmVXeO6urEYvQ0kkXnM3my5LSFgFtiP0c8bIfyCzk-R5fVodxsIJd4D9E6qAjX6D2axne8H2Z79DuWD5EDKmsKgM8QT_s66OUCbZH'
  },
  cast: [
    {
      name: 'Ryan Gosling',
      character: 'Officer K',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNvjgMODMGGtRou1R7RjzcBDmUa8s3pE3t4lVIRivbYhbEfHgCQOMsZnAq3dtfn_FZsNdZCNyT5IC-OW_tia_7W2lgvAi0A3VMS27ZIVVvJ4_PuA1IR4viNQG6ii-EJNzxxIKNp8fxnyUJWWuIVx86cEV_R0AF-hfOOi2Cyp_WBxe2ZJKUtKxYf-ZHun0nf0qe828RQx7qO_JPXO5BoGvGdeY5hOQZ7hpCYMUalV9z'
    },
    {
      name: 'Harrison Ford',
      character: 'Rick Deckard',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiQ8eRxgygQXrUcHG3LW3ueaPrYZBQjIJU1fbYX9fUKE-7l1l46VM-fla6U0NY25edaLmztoGFc1HHx0WGbcBaOE05t86m63LyrMmryOy9Grwy6RnZ54NT71nzMGm27L_eAye64cVBIzvGNK-tJSU2yekJjD5AJYGLJMHeMMKihlYcUTAvaFHxpW0m1I1elV_qZ4UxbK0u38Px6ZOhHgi5j8a7X9pgiUwz9gW76S89'
    },
    {
      name: 'Ana de Armas',
      character: 'Joi',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPtnn_ZETtoZJvUku4PyOW8oewJmyAD42Xeb0azV0wU7v_MYxytXxYc56E3Ik8TKvC_ln87U-ixXEY1ykVYgJchC8_IYinfnq8ZIU8BWCEPPwCNdMQ5qv8XgrjRXDcifEit4lmoRVJRrtNd2T2ia5ThQFsb7TYpBLUU-ZCF0gVMaq0CaLSpAWDTG5oHx93Fn0o5qpXWKIFsGCvI6FNtbN1nxHP-rhFlQwQP13m1BSB'
    }
  ],
  qualityTags: ['4K ULTRA HD', 'DOLBY ATMOS', '2h 44m', '2017'],
  trailerDuration: '2:18 HD',
  trailerThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuC5WLSYO9OjSk7XYqEOS3PTiXxFGCmENpUYjD3e3QChJG3urZSerGvdr7silZTxLYPtXAPxDu9_YCJpZviQt6LIsMY-h3CV6oHQDdiXspLvUKwgXYlEduwzjiaZVxa-TEYsNrHK5CM-133JsqfhBOlClb--3sAaaCVuOBzNS2xx5hFCj0J2UjwuPFPn0881261p7t6-OwmmFgj_ljYtBv7e_gHrSjXSOj3iAFQaPD',
  mutualFriendsCount: 4
};

export const INTERSTELLAR_MOVIE: Movie = {
  id: 'interstellar',
  title: 'Interstellar (2014)',
  year: 2014,
  duration: '2h 49m',
  ratingImdb: '8.7',
  ratingRottenTomatoes: '73%',
  ageRating: 'PG-13 • 169 min',
  synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U',
  genres: ['Sci-Fi', 'Adventure', 'Drama'],
  director: {
    name: 'Christopher Nolan',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZlvnqcWPw4Ys7z47grvORQ4vGNb9eVJ_d89pOj5o6OUiMUzM9Fe1pB1f5IjlMH-2MYJj6ikjHWydam1J97zcCEMI3uk9_PDxtjUpBPla5Et1j6iBpJ8rNu4uUbF-7UdW6W-xxmVXeO6urEYvQ0kkXnM3my5LSFgFtiP0c8bIfyCzk-R5fVodxsIJd4D9E6qAjX6D2axne8H2Z79DuWD5EDKmsKgM8QT_s66OUCbZH'
  },
  cast: [],
  qualityTags: ['4K ATMOS', 'IMAX RATIO'],
  trailerDuration: '2:30 HD',
  trailerThumbnail: ''
};

export const DUNE_TWO_MOVIE: Movie = {
  id: 'dune-part-two',
  title: 'Dune: Part Two',
  year: 2024,
  duration: '2h 46m',
  ratingImdb: '8.6',
  ratingRottenTomatoes: '92%',
  ageRating: 'PG-13 • 166 min',
  synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ6G8-JYf82zjnauINMGlwywnk9XWGLy6sIaQxk-TnIssX5AdUvhqH4hodmNRBoLYBXveJMIcXpQCqAsEROl560JQYQQ1R7KlYe1mplFGgVKwfPwMRM6PYWD79vXcfm_mL3S98ZEqH8qlHjABZDfybX2PsQu_k9YFMwcCvrZ92_fygvpNuz4Kd-fvghBwZuRscmdZ186LJi-a2vrzUcsJfLBcXILa2vDi0n9lkuQL',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ6G8-JYf82zjnauINMGlwywnk9XWGLy6sIaQxk-TnIssX5AdUvhqH4hodmNRBoLYBXveJMIcXpQCqAsEROl560JQYQQ1R7KlYe1mplFGgVKwfPwMRM6PYWD79vXcfm_mL3S98ZEqH8qlHjABZDfybX2PsQu_k9YFMwcCvrZ92_fygvpNuz4Kd-fvghBwZuRscmdZ186LJi-a2vrzUcsJfLBcXILa2vDi0n9lkuQL',
  genres: ['Sci-Fi', 'Adventure'],
  director: { name: 'Denis Villeneuve', avatarUrl: '' },
  cast: [],
  qualityTags: ['4K ULTRA HD', 'DOLBY ATMOS'],
  trailerDuration: '',
  trailerThumbnail: ''
};

export const SPIDER_MAN_MOVIE: Movie = {
  id: 'spider-man-spider-verse',
  title: 'Spider-Man: Across the Spider-Verse',
  year: 2023,
  duration: '2h 20m',
  ratingImdb: '8.7',
  ratingRottenTomatoes: '95%',
  ageRating: 'PG • 140 min',
  synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H',
  genres: ['Animation', 'Action', 'Sci-Fi'],
  director: { name: 'Joaquim Dos Santos', avatarUrl: '' },
  cast: [],
  qualityTags: ['4K ATMOS', 'LIVE SYNC'],
  trailerDuration: '',
  trailerThumbnail: ''
};

export const PAST_LIVES_MOVIE: Movie = {
  id: 'past-lives',
  title: 'Past Lives',
  year: 2023,
  duration: '1h 45m',
  ratingImdb: '7.9',
  ratingRottenTomatoes: '98%',
  ageRating: 'PG-13 • 105 min',
  synopsis: 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora’s family emigrates from South Korea.',
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2',
  genres: ['Drama', 'Romance'],
  director: { name: 'Celine Song', avatarUrl: '' },
  cast: [],
  qualityTags: ['Crowd Fav', 'Crying Alert 😭'],
  trailerDuration: '',
  trailerThumbnail: ''
};

export const ALL_MOVIES: Movie[] = [
  BLADE_RUNNER_MOVIE,
  INTERSTELLAR_MOVIE,
  DUNE_TWO_MOVIE,
  SPIDER_MAN_MOVIE,
  PAST_LIVES_MOVIE
];

export const ACTIVE_WATCH_PARTY: WatchParty = {
  id: 'CIN-892',
  title: "Miller's Planet — Interstellar",
  movie: INTERSTELLAR_MOVIE,
  host: {
    id: 'user-sarah',
    name: 'Sarah C.',
    username: 'sarah_c',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghZAKFgYIQ5SQqXIWDepQqPf-tIWimFceIHWVdtdoXNeG_cnLdz7AZ8X1RBK-E5BHX2PgghvAoNQhOD4KAb4aVB4Cux81zwHtARkjg43TSStlGJWa1WrxCAum9dnDs2QLN8JyoPh4JS8wJWebXSznhQLSPCiVr1d_-s2LcrPO8xpXNZBa3UDuX0Pi8CELsbPhWe-IlnL1D-1D49ZAZLMZuFZdX-izZYYBbX_IP0H5',
    presence: 'Watching',
    roomRole: 'HOST'
  },
  participants: [
    {
      id: 'user-sarah',
      name: 'Sarah C.',
      username: 'sarah_c',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghZAKFgYIQ5SQqXIWDepQqPf-tIWimFceIHWVdtdoXNeG_cnLdz7AZ8X1RBK-E5BHX2PgghvAoNQhOD4KAb4aVB4Cux81zwHtARkjg43TSStlGJWa1WrxCAum9dnDs2QLN8JyoPh4JS8wJWebXSznhQLSPCiVr1d_-s2LcrPO8xpXNZBa3UDuX0Pi8CELsbPhWe-IlnL1D-1D49ZAZLMZuFZdX-izZYYBbX_IP0H5',
      presence: 'Watching',
      roomRole: 'HOST',
      isSpeaking: true,
      audioLevel: 85,
      timelinePin: 60.5
    },
    {
      id: 'friend-marcus',
      name: 'Marcus',
      username: 'marcus',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFgKjdPXMwhCHfi_axfIVkr2oZj9Wo8azyJTSgKQeL2IH8yvy8WOoKtv_LD8toQ-hECo6c-8OU8dTFM9JHVCBn-fIFJRRYolZbPGQ6Lr6kXTW7p_p2YFfUkzrSwMCdLYLy_aEwyIOJjzxBBECzVLh-4DzcMwGNZTH04doVut2AQde4SgExThKI8dnANYn8XdQtpqgVOlk5_fcLXSR3mhp9_1pNa-zW6UBaPCeOID7S',
      presence: 'Watching',
      roomRole: 'MEMBER',
      isMuted: true,
      reactionEmoji: '🍿',
      timelinePin: 59.8
    },
    {
      id: 'friend-elena',
      name: 'Elena',
      username: 'elena',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh5qSQUvvX1UVpDR-aZDzBDqsMMmfooMf2OIS6G_oaHBlagbLV1fqHRSv8TMNs6zFmwmIq1FFtzO0kZ6JvjMpBmbb35rO3UF-dIEaTz42SeR-3fNMTCfwfXqFEgFcWqlSH7s7B-p60xgh9oEnrbNCmRXwuJAMgX4B0hlhd-3CfCpfMvuFol4oFsS3RfMLynburKHhjvGz-8_ZbJUpefI8QlS-9zACwcOoROW5hnz1C',
      presence: 'Watching',
      roomRole: 'MEMBER',
      isMuted: true
    },
    {
      id: 'user-alex',
      name: 'Alex',
      username: 'alex',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB_GMrZhWQiIXEtPUiBOq2ZzLZKq4j31nd4r4DwHQkbGWciCBJ5vEgLMy1CCTPwrv40s9k-636xtfJg95YwrCzqimDWyUcjDJNMxj-hGX56UQbO3UGBm6RpoG2aInhGrsW1SF5KOrsz8LUEs1T3ujBN-LxfhuHaj87wZpOK-TOi34l5ynLZE7CzY9Zuy715TlClQelg53NNYgUrrp1ojZ1RRt__a0DUv9h7NZ_mXIM',
      presence: 'Watching',
      roomRole: 'MEMBER',
      isMuted: false,
      isCamOff: false
    }
  ],
  currentPlaybackTime: 6135, // 01:42:15 in seconds
  totalDuration: 10140, // 02:49:00 in seconds
  isPlaying: true,
  isSyncLocked: true,
  spatialVoiceEnabled: true,
  privacy: 'friends',
  mode: 'video',
  viewersCount: 4
};

