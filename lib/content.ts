import { FORMS } from "@/lib/site";

export type Lang = "en" | "nl";
export type FormKey = keyof typeof FORMS;

type ActionCard = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: FormKey;
};

type LandingContent = {
  city: string;
  htmlLang: string;
  navPilot: string;
  langSwitch: { label: string; aria: string };
  hero: {
    badge: string;
    titleTop: string;
    titleBottom: string;
    sub: string;
    ctaTeams: string;
    ctaKeepers: string;
    note: string;
  };
  problem: {
    heading: string;
    sub: string;
    cards: { title: string; body: string }[];
  };
  how: {
    heading: string;
    steps: { n: string; title: string; body: string }[];
  };
  takePart: {
    heading: string;
    sub: string;
    cards: ActionCard[];
  };
  status: {
    kicker: string;
    heading: string;
    body: string;
    chips: string[];
  };
  finalCta: {
    heading: string;
    sub: string;
    buttons: { label: string; href: FormKey }[];
  };
  footerTagline: string;
  meta: { title: string; description: string };
};

export const content: Record<Lang, LandingContent> = {
  en: {
    city: "Ghent",
    htmlLang: "en",
    navPilot: "Ghent · pilot",
    langSwitch: { label: "NL", aria: "Bekijk deze pagina in het Nederlands" },
    hero: {
      badge: "Amateur football · Ghent",
      titleTop: "Never cancel a match",
      titleBottom: "because your keeper didn't show",
      sub: "We're looking into an idea for football in Ghent: an easy way for any team or group of friends to get a goalkeeper, whether yours cancelled last-minute or your matches never had a fixed one, and for keepers to get more game time. Before we build anything, we want to know if you'd use it.",
      ctaTeams: "I'd use this →",
      ctaKeepers: "I'm a goalkeeper",
      note: "A few quick questions. You're helping us decide whether this is worth building.",
    },
    problem: {
      heading: "No keeper, worse match",
      sub: "Two different headaches, same result: a worse match. Sometimes your keeper cancels last-minute. Sometimes your group never had a fixed one to begin with.",
      cards: [
        { title: "Beg the group chat", body: "Message everyone and hope someone replies before kickoff." },
        { title: "Post in Facebook groups", body: "Ask around and wait, with no idea who'll actually turn up." },
        { title: "Call it off", body: "Let the team down, lose the pitch you booked, and find a new date." },
        { title: "Take turns in goal", body: "Every 10 minutes it's someone else's turn. The team loses its shape each time, and since it's just an outfield player standing in, you concede goals a real keeper would've saved." },
      ],
    },
    how: {
      heading: "How it would work",
      steps: [
        { n: "01", title: "Tell us about the match", body: "The date, time and pitch. A minute, tops." },
        { n: "02", title: "We find a goalkeeper", body: "We put you in touch with an available keeper from the Ghent community." },
        { n: "03", title: "You play", body: "The keeper turns up, and you keep your booking and your match." },
      ],
    },
    takePart: {
      heading: "Want to help us find out?",
      sub: "We're still deciding if this is worth doing. The best way to help is to fill in the short form that fits you.",
      cards: [
        {
          tag: "Teams & players",
          title: "Would you use it?",
          body: "Whether you run a team or just play with friends, tell us if a service like this would help you. Two minutes.",
          cta: "Take the survey →",
          href: "teams",
        },
        {
          tag: "Goalkeepers",
          title: "Want to play more?",
          body: "Tell us how interested you'd be in getting matches through us and playing for teams that need a keeper.",
          cta: "Tell us →",
          href: "goalkeepers",
        },
        {
          tag: "Goalkeeper list",
          title: "Join the keeper list",
          body: "Ready to get called up? Add your details so we can reach you when a team nearby needs a goalkeeper.",
          cta: "Add me to the list →",
          href: "goalkeeperRegistration",
        },
      ],
    },
    status: {
      kicker: "Where we are",
      heading: "An early idea, not a finished service",
      body: "We're starting in Ghent and talking to real teams and goalkeepers. Nothing here runs automatically yet. It's a few people trying to solve a problem we keep running into ourselves, and we want to see if others have it too.",
      chips: [
        "Ghent — starting here",
        "Antwerp — maybe later",
        "Brussels — maybe later",
        "Bruges · Leuven — maybe later",
      ],
    },
    finalCta: {
      heading: "Help us decide if this should exist",
      sub: "Pick the form that fits you. It only takes a couple of minutes.",
      buttons: [
        { label: "I'd use it (teams & players)", href: "teams" },
        { label: "I'm a goalkeeper", href: "goalkeepers" },
        { label: "Add me to the keeper list", href: "goalkeeperRegistration" },
      ],
    },
    footerTagline: "A community project · Ghent, Belgium",
    meta: {
      title: "GK Service — a goalkeeper for every match in Ghent",
      description:
        "We're exploring a simple way for amateur teams in Ghent to find a goalkeeper, and for goalkeepers to get more game time. Tell us if you'd use it.",
    },
  },
  nl: {
    city: "Gent",
    htmlLang: "nl",
    navPilot: "Gent · pilot",
    langSwitch: { label: "EN", aria: "View this page in English" },
    hero: {
      badge: "Amateurvoetbal · Gent",
      titleTop: "Zeg nooit meer een match af",
      titleBottom: "omdat je keeper er niet is",
      sub: "We onderzoeken een idee voor voetbal in Gent: een makkelijke manier voor elke ploeg of groep vrienden om een keeper te vinden, of je match nu op het laatste moment afgezegd werd of gewoon nooit een vaste keeper had, en voor keepers om meer te spelen. Voor we iets bouwen, willen we weten of jij het zou gebruiken.",
      ctaTeams: "Ik zou dit gebruiken →",
      ctaKeepers: "Ik ben keeper",
      note: "Een paar korte vragen. Zo help je ons beslissen of dit de moeite waard is.",
    },
    problem: {
      heading: "Geen keeper, slechtere match",
      sub: "Twee verschillende kopzorgen, hetzelfde resultaat: een slechtere match. Soms zegt je keeper op het laatste moment af. Soms had je groep er nooit een vaste.",
      cards: [
        { title: "Smeken in de groepschat", body: "Iedereen appen en hopen dat er iemand antwoordt voor de aftrap." },
        { title: "Posten in Facebookgroepen", body: "Rondvragen en wachten, zonder te weten wie er echt komt opdagen." },
        { title: "De match afzeggen", body: "De ploeg teleurstellen, je gereserveerde veld kwijt, en een nieuwe datum zoeken." },
        { title: "Om beurt in doel", body: "Om de 10 minuten is het iemand anders zijn beurt. De ploeg verliest telkens haar structuur, en omdat het gewoon een veldspeler is die invalt, incasseer je doelpunten die een echte keeper had gestopt." },
      ],
    },
    how: {
      heading: "Hoe het zou werken",
      steps: [
        { n: "01", title: "Vertel ons over de match", body: "De datum, het uur en het veld. Hooguit een minuut." },
        { n: "02", title: "Wij zoeken een keeper", body: "We brengen je in contact met een beschikbare keeper uit de Gentse community." },
        { n: "03", title: "Jij speelt", body: "De keeper komt opdagen, en jij houdt je reservatie en je match." },
      ],
    },
    takePart: {
      heading: "Wil je ons helpen uitzoeken?",
      sub: "We beslissen nog of dit de moeite waard is. Je helpt het best door het korte formulier in te vullen dat bij jou past.",
      cards: [
        {
          tag: "Ploegen & spelers",
          title: "Zou je het gebruiken?",
          body: "Of je nu een ploeg hebt of gewoon met vrienden speelt: laat weten of zo'n dienst jou zou helpen. Twee minuten.",
          cta: "Doe de enquête →",
          href: "teams",
        },
        {
          tag: "Keepers",
          title: "Meer spelen?",
          body: "Laat weten hoe geïnteresseerd je bent om via ons matchen te krijgen en te spelen voor ploegen die een keeper zoeken.",
          cta: "Laat het ons weten →",
          href: "goalkeepers",
        },
        {
          tag: "Keeperslijst",
          title: "Kom op de keeperslijst",
          body: "Klaar om opgeroepen te worden? Laat je gegevens achter zodat we je kunnen bereiken als een ploeg in de buurt een keeper nodig heeft.",
          cta: "Zet me op de lijst →",
          href: "goalkeeperRegistration",
        },
      ],
    },
    status: {
      kicker: "Waar we staan",
      heading: "Een pril idee, geen afgewerkte dienst",
      body: "We beginnen in Gent en praten met echte ploegen en keepers. Er draait hier nog niets automatisch. Het zijn een paar mensen die een probleem proberen op te lossen dat we zelf blijven tegenkomen, en we willen weten of anderen het ook hebben.",
      chips: [
        "Gent — hier beginnen we",
        "Antwerpen — misschien later",
        "Brussel — misschien later",
        "Brugge · Leuven — misschien later",
      ],
    },
    finalCta: {
      heading: "Help ons beslissen of dit moet bestaan",
      sub: "Kies het formulier dat bij jou past. Het duurt maar een paar minuten.",
      buttons: [
        { label: "Ik zou het gebruiken (ploegen & spelers)", href: "teams" },
        { label: "Ik ben keeper", href: "goalkeepers" },
        { label: "Zet me op de keeperslijst", href: "goalkeeperRegistration" },
      ],
    },
    footerTagline: "Een communityproject · Gent, België",
    meta: {
      title: "GK Service — een keeper voor elke match in Gent",
      description:
        "We onderzoeken een makkelijke manier voor amateurploegen in Gent om een keeper te vinden, en voor keepers om meer te spelen. Laat weten of je het zou gebruiken.",
    },
  },
};
