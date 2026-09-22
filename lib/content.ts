import { FORMS } from "@/lib/site";

export type FormKey = keyof typeof FORMS;

type ActionCard = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: FormKey;
};

type BenefitColumn = {
  kicker: string;
  title: string;
  items: { title: string; body: string }[];
  cta: string;
  href: FormKey;
};

type LandingContent = {
  city: string;
  htmlLang: string;
  navPilot: string;
  hero: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    sub: string;
    ctaTeams: string;
    ctaKeepers: string;
    note: string;
    photoAlt: string;
  };
  benefits: {
    heading: string;
    sub: string;
    teams: BenefitColumn;
    keepers: BenefitColumn;
  };
  story: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    pullquote: string;
    scenarios: { title: string; body: string }[];
  };
  how: {
    heading: string;
    sub: string;
    steps: { n: string; title: string; body: string }[];
    note: string;
    coverage: { heading: string; body: string; note: string };
  };
  finalCta: {
    kicker: string;
    heading: string;
    sub: string;
    cards: ActionCard[];
  };
  footerTagline: string;
  meta: { title: string; description: string };
};

export const content: LandingContent = {
  city: "London",
  htmlLang: "en",
  navPilot: "Early access",
  hero: {
    badge: "Amateur football",
    titleTop: "Missing a keeper?",
    titleBottom: "Let's sort it.",
    sub: "One form, and we start looking for a goalkeeper for your match. No more begging the group chat an hour before kickoff.",
    ctaTeams: "I need a goalkeeper",
    ctaKeepers: "I'm a goalkeeper",
    note: "We're building this right now and lining up our first keepers. Tell us what you need and you'll be first in line.",
    photoAlt: "A goalkeeper leaping to make a save during an amateur football match",
  },
  benefits: {
    heading: "Two sides, one problem",
    sub: "Teams can't find a keeper. Keepers can't find a game. We're trying to close that gap.",
    teams: {
      kicker: "For teams & organisers",
      title: "Your match goes ahead",
      items: [
        {
          title: "Keep the pitch you paid for",
          body: "No more losing a booking because one player pulled out the night before.",
        },
        {
          title: "Stop rotating an outfield player",
          body: "A real keeper holds the shape. Your side stops conceding goals nobody should concede.",
        },
        {
          title: "Keepers come to you",
          body: "Post your match once and available keepers apply. No more chasing people down yourself.",
        },
        {
          title: "Every format",
          body: "5-a-side, futsal, 7s, 11s. Turf, indoor or grass.",
        },
      ],
      cta: "Tell us about your match →",
      href: "teams",
    },
    keepers: {
      kicker: "For goalkeepers",
      title: "You actually get to play",
      items: [
        {
          title: "More minutes, not more waiting",
          body: "Most keepers get one slot per squad. We bring you the games nobody can cover.",
        },
        {
          title: "Get paid for turning up",
          body: "Teams already pay to hire a pitch. Paying the keeper who saves the match is the easy part.",
        },
        {
          title: "Play on your terms",
          body: "You choose which matches to take. No obligation, no exclusivity, nothing locked in.",
        },
        {
          title: "Only games near you",
          body: "We won't send you across the city for a Tuesday kickabout.",
        },
      ],
      cta: "Get on the keeper list →",
      href: "goalkeeperRegistration",
    },
  },
  story: {
    kicker: "Where we're at",
    heading: "We're not pretending to be big yet",
    paragraphs: [
      "MatchKeeper is new. We're not going to invent testimonials or claim we have thousands of keepers signed up, because we don't. What we do have is a problem we keep running into ourselves, and a growing list of people who have it too.",
      "Right now it works the honest way: you tell us about your match or put your name down as a keeper, and a real person goes and makes the connection. No algorithm, no app, no fake reviews.",
    ],
    pullquote: "Every match deserves a real keeper.",
    scenarios: [
      {
        title: "\"Our keeper bailed at 9pm\"",
        body: "Game's at 10am. The group chat goes quiet. Someone volunteers who hasn't played in goal since school.",
      },
      {
        title: "\"We never had one\"",
        body: "A regular kickabout with mates where everyone takes ten minutes in goal and nobody wants to.",
      },
      {
        title: "\"I'm a keeper with no team\"",
        body: "You've got the gloves and the ability, but only one keeper starts, and it isn't you this week.",
      },
    ],
  },
  how: {
    heading: "How it works",
    sub: "Post a match, and goalkeepers come to you.",
    steps: [
      { n: "01", title: "Post your match", body: "Date, time, pitch and format. Takes a minute." },
      { n: "02", title: "Keepers apply", body: "Available goalkeepers nearby put themselves forward for your match." },
      { n: "03", title: "You choose who plays", body: "Compare keepers and pick the one you want in goal." },
      { n: "04", title: "Match goes ahead", body: "Agree the details directly, and the keeper turns up." },
    ],
    note: "We're brand new, so there's no track record of reviews and ratings yet. That builds up as more matches happen, and we'll never fake it in the meantime.",
    coverage: {
      heading: "Every pitch, every format",
      body: "5-a-side, futsal, 7-a-side and 11-a-side. Indoor courts, turf and natural grass.",
      note: "We're just getting started, so coverage depends on how many keepers are free in your area. We'll always tell you straight if we can't cover your match.",
    },
  },
  finalCta: {
    kicker: "Get involved",
    heading: "Pick the one that's you",
    sub: "Each takes about two minutes, and it genuinely shapes what we build next.",
    cards: [
      {
        tag: "Teams & players",
        title: "I need a goalkeeper",
        body: "Whether you run a side or just play with mates. Tell us what you need and how often you need it.",
        cta: "I need a keeper →",
        href: "teams",
      },
      {
        tag: "Goalkeepers",
        title: "I'd play more if I could",
        body: "Not ready to sign up yet? Tell us what would make this worth your time as a keeper.",
        cta: "Have your say →",
        href: "goalkeepers",
      },
      {
        tag: "Keeper list",
        title: "Put me on the list",
        body: "Ready to get called up for matches near you. Leave your details and we'll be in touch.",
        cta: "Add me to the list →",
        href: "goalkeeperRegistration",
      },
    ],
  },
  footerTagline: "A community project · UK",
  meta: {
    title: "MatchKeeper — find a goalkeeper for your football match",
    description:
      "Missing a keeper for your amateur football match? MatchKeeper connects teams who need a goalkeeper with keepers who want more game time.",
  },
};
