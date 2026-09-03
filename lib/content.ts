import { FORMS } from "@/lib/site";

export type Lang = "en" | "nl" | "fr";
export type FormKey = keyof typeof FORMS;

export const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: "en", label: "EN", href: "/" },
  { code: "nl", label: "NL", href: "/nl" },
  { code: "fr", label: "FR", href: "/fr" },
];

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
  langSwitch: { aria: string };
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
  coverage: {
    heading: string;
    body: string;
    note: string;
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
    langSwitch: { aria: "Change language" },
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
        { n: "02", title: "We notify available goalkeepers", body: "We reach out to keepers from the Ghent community who are free at that time." },
        { n: "03", title: "A goalkeeper accepts", body: "Once someone confirms, you can stop waiting for a reply." },
        { n: "04", title: "The match goes ahead", body: "The keeper turns up, and you keep your booking and your match." },
      ],
    },
    coverage: {
      heading: "Every pitch, every format",
      body: "The idea is to cover every kind of pitch (futsal, artificial turf, natural grass) and every match format.",
      note: "It all depends on keeper availability, so don't expect full coverage across every service from day one.",
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
    langSwitch: { aria: "Taal wijzigen" },
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
        { n: "02", title: "We verwittigen beschikbare keepers", body: "We nemen contact op met keepers uit de Gentse community die op dat moment vrij zijn." },
        { n: "03", title: "Een keeper accepteert", body: "Zodra iemand bevestigt, hoef je niet meer op een antwoord te wachten." },
        { n: "04", title: "De match gaat door", body: "De keeper komt opdagen, en jij houdt je reservatie en je match." },
      ],
    },
    coverage: {
      heading: "Elk veld, elk format",
      body: "Het idee is om elk soort veld te dekken (zaalvoetbal, kunstgras, natuurgras) en elk wedstrijdformat.",
      note: "Het hangt allemaal af van de beschikbaarheid van keepers, dus verwacht niet vanaf dag één volledige dekking voor elke dienst.",
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
  fr: {
    city: "Gand",
    htmlLang: "fr",
    navPilot: "Gand · pilote",
    langSwitch: { aria: "Changer de langue" },
    hero: {
      badge: "Football amateur · Gand",
      titleTop: "Ne décommandez plus un match",
      titleBottom: "parce que votre gardien manque à l'appel",
      sub: "Nous explorons une idée pour le football à Gand : un moyen simple pour toute équipe ou groupe d'amis de trouver un gardien, que votre match ait été décommandé à la dernière minute ou que vous n'en ayez jamais eu un attitré, et pour les gardiens de jouer plus souvent. Avant de construire quoi que ce soit, nous voulons savoir si vous l'utiliseriez.",
      ctaTeams: "Je l'utiliserais →",
      ctaKeepers: "Je suis gardien",
      note: "Quelques questions rapides. Vous nous aidez à décider si ça vaut la peine d'être construit.",
    },
    problem: {
      heading: "Pas de gardien, moins bon match",
      sub: "Deux problèmes différents, le même résultat : un moins bon match. Parfois votre gardien décommande à la dernière minute. Parfois votre groupe n'en a jamais eu un attitré.",
      cards: [
        { title: "Supplier dans le groupe", body: "Écrire à tout le monde en espérant une réponse avant le coup d'envoi." },
        { title: "Poster sur des groupes Facebook", body: "Demander autour de vous et attendre, sans savoir qui va vraiment venir." },
        { title: "Annuler le match", body: "Laisser tomber l'équipe, perdre le terrain réservé, et chercher une nouvelle date." },
        { title: "Tourner dans les buts", body: "Toutes les 10 minutes, c'est au tour de quelqu'un d'autre. L'équipe perd sa structure à chaque fois, et comme c'est un joueur de champ qui dépanne, vous encaissez des buts qu'un vrai gardien aurait arrêtés." },
      ],
    },
    how: {
      heading: "Comment ça fonctionnerait",
      steps: [
        { n: "01", title: "Parlez-nous du match", body: "La date, l'heure et le terrain. Une minute, montre en main." },
        { n: "02", title: "Nous prévenons les gardiens disponibles", body: "On contacte les gardiens de la communauté gantoise disponibles à ce moment-là." },
        { n: "03", title: "Un gardien accepte", body: "Dès qu'un gardien confirme, vous n'avez plus besoin d'attendre une réponse." },
        { n: "04", title: "Le match a lieu", body: "Le gardien se présente, et vous gardez votre réservation et votre match." },
      ],
    },
    coverage: {
      heading: "Tous les terrains, tous les formats",
      body: "L'idée est de couvrir tous les types de terrain (futsal, gazon synthétique, gazon naturel) et tous les formats de match.",
      note: "Tout dépend de la disponibilité des gardiens, donc ne vous attendez pas à une couverture complète pour chaque service dès le premier jour.",
    },
    takePart: {
      heading: "Envie de nous aider à le savoir ?",
      sub: "Nous décidons encore si ça vaut la peine. La meilleure façon de nous aider est de remplir le court formulaire qui vous correspond.",
      cards: [
        {
          tag: "Équipes & joueurs",
          title: "L'utiliseriez-vous ?",
          body: "Que vous gériez une équipe ou que vous jouiez simplement entre amis, dites-nous si un service comme celui-ci vous aiderait. Deux minutes.",
          cta: "Répondre au sondage →",
          href: "teams",
        },
        {
          tag: "Gardiens",
          title: "Envie de jouer plus ?",
          body: "Dites-nous à quel point vous seriez intéressé pour obtenir des matchs via nous et jouer pour des équipes qui cherchent un gardien.",
          cta: "Nous le dire →",
          href: "goalkeepers",
        },
        {
          tag: "Liste des gardiens",
          title: "Rejoindre la liste des gardiens",
          body: "Prêt à être appelé ? Laissez vos coordonnées pour qu'on puisse vous contacter quand une équipe à proximité cherche un gardien.",
          cta: "M'ajouter à la liste →",
          href: "goalkeeperRegistration",
        },
      ],
    },
    status: {
      kicker: "Où on en est",
      heading: "Une idée récente, pas encore un service",
      body: "On commence à Gand et on parle à de vraies équipes et de vrais gardiens. Rien ici ne tourne encore automatiquement. Ce sont quelques personnes qui essaient de résoudre un problème qu'on rencontre nous-mêmes régulièrement, et on veut voir si d'autres l'ont aussi.",
      chips: [
        "Gand — on commence ici",
        "Anvers — peut-être plus tard",
        "Bruxelles — peut-être plus tard",
        "Bruges · Louvain — peut-être plus tard",
      ],
    },
    finalCta: {
      heading: "Aidez-nous à décider si ça devrait exister",
      sub: "Choisissez le formulaire qui vous correspond. Ça ne prend que quelques minutes.",
      buttons: [
        { label: "Je l'utiliserais (équipes & joueurs)", href: "teams" },
        { label: "Je suis gardien", href: "goalkeepers" },
        { label: "M'ajouter à la liste des gardiens", href: "goalkeeperRegistration" },
      ],
    },
    footerTagline: "Un projet communautaire · Gand, Belgique",
    meta: {
      title: "GK Service — un gardien pour chaque match à Gand",
      description:
        "Nous explorons un moyen simple pour les équipes amateurs de Gand de trouver un gardien, et pour les gardiens de jouer plus souvent. Dites-nous si vous l'utiliseriez.",
    },
  },
};
