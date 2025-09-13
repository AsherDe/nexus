export default {
  navigation: {
    home: "Startseite",
    blog: "Blog",
    projects: "Projekte",
    about: "Über",
  },
  widgets: {
    github: {
      title: "GitHub-Aktivität",
      liveTitle: "Live GitHub-Feed",
      repositories: "Repositories",
      commits: "Commits",
      stars: "Sterne",
      forks: "Forks",
      failedToLoad: "Aktivität konnte nicht geladen werden.",
      noRecentActivity: "Keine aktuelle Aktivität",
    },
    investment: {
      title: "Anlageportfolio",
      totalReturn: "Gesamtrendite",
      holdingPeriod: "Haltedauer",
      days: "Tage",
      allocation: "Zuteilung",
      lastUpdated: "Zuletzt aktualisiert",
      failedToLoad: "Portfolio-Daten konnten nicht geladen werden",
      inspiredBy: "Inspiriert vom norwegischen Modell →",
    },
    articles: {
      title: "Empfohlene Artikel",
    },
    weather: {
      title: "Wetter",
    },
    challenges: {
      title: "Deutsche Herausforderung",
      levels: {
        breakthrough: {
          name: "Durchbruch",
          description: "Grundwortschatz",
        },
        waystage: {
          name: "Wegstadium",
          description: "Tägliche Kommunikation",
        },
        threshold: {
          name: "Schwellenwert",
          description: "Mittleres Verständnis",
        },
        vantage: {
          name: "Aussichtspunkt",
          description: "Fließende Ausdrucksweise",
        },
        proficiency: {
          name: "Kompetenz",
          description: "Fortgeschrittene Verwendung",
        },
        mastery: {
          name: "Beherrschung",
          description: "Fast muttersprachlich",
        },
      },
    },
    rss: {
      title: "RSS-Nachrichten",
    },
    events: {
      title: "Aktuelle Ereignisse",
    },
    currentFocus: {
      title: "Aktueller Fokus",
      status: "Status",
      viewRepository: "Repository anzeigen →",
    },
    terminal: {
      title: "Terminal",
      welcome: "$ Willkommen im simulierten Terminal",
      explore: "$ Befehle eingeben, um das System zu erkunden...",
      downloading: "Herunterladen...",
      downloadComplete: "Download abgeschlossen!",
      easterEgg: "🎉 Glückwunsch! Du hast das Easter Egg gefunden!",
      easterEggMessage1: "    ╭─────────────────────────────╮",
      easterEggMessage2: "    │   Du beherrschst bereits    │",
      easterEggMessage3: "    │   Linux-Befehle! Weiter so! │",
      easterEggMessage4: "    ╰─────────────────────────────╯",
      tip: "💡 Tipp: Die echte Linux-Welt ist viel reichhaltiger...",
      availableCommands: "Verfügbare Befehle:",
      commandList: {
        ls: "  ls                Dateiliste anzeigen",
        cat: "  cat readme        readme-Datei anzeigen",
        download: "  download report   Versuchsbericht herunterladen",
        clear: "  clear             Terminal leeren",
      },
      commandNotFound: ": Befehl nicht gefunden",
      placeholder: "Befehl eingeben...",
      hint: "Tipp: Versuche help, ls, cat readme oder download report",
    },
  },
  blog: {
    readingTime: "Min. Lesezeit",
    backToBlog: "← Zurück zum Blog",
    allPosts: "Alle Beiträge",
    showAllLanguages: "Alle Sprachen anzeigen",
    currentLanguageOnly: "Nur aktuelle Sprache",
  },
  common: {
    loading: "Laden...",
    error: "Fehler beim Laden der Daten",
  },
  about: {
    title: "Über mich",
    subtitle: "Ein Student, der erforscht, wie wir lernen und bauen.",
    portrait: {
      title: "Das Porträt",
      content:
        "Sie fragen sich vielleicht nach dem Porträt. Es wurde im Stil eines Studio Ghibli-Films gestaltet, und diese Wahl war beabsichtigt. Für mich repräsentiert Ghiblis Kunst eine Philosophie, die ich in meiner eigenen Arbeit zu verkörpern strebe: die nahtlose Integration komplexer Technologie mit einer tiefen, unerschütterlichen Menschlichkeit. Ihre Filme finden Wunder sowohl in handgefertigten Flugmaschinen als auch in stillen Momenten im Regen und erinnern uns daran, dass die mächtigsten Kreationen jene sind, die zugänglich, durchdacht und grundlegend menschlich wirken.",
      quote: "An diesem Schnittpunkt lebe und arbeite ich.",
    },
    whoIAm: {
      title: "Wer ich bin",
      content:
        "Mein Name ist <strong>Asher Ji (Yude Ji)</strong>, und ich bin ein Bachelorstudent der Informatik und Technologie an der Shihezi-Universität. Meine Reise in die Technologie dreht sich jedoch nicht nur um Algorithmen und Datenstrukturen; sie wird von einer tieferen Faszination dafür angetrieben, wie wir als Menschen Wissen aufbauen, teilen und damit interagieren.",
    },
    myWork: {
      title: "Meine Arbeit",
      intro:
        "Diese Neugier hat mich natürlich an die Grenze des maschinellen Lernens und der großen Sprachmodelle (LLMs) geführt. Ich glaube an das Lernen durch Handeln und hatte das Glück, meine Fähigkeiten auf greifbare Probleme anzuwenden. Durch Kooperationen mit der medizinischen Fakultät unserer Universität habe ich:",
      achievements: {
        vit: "<strong>Ein Vision Transformer (ViT)-Modell feinabgestimmt</strong>, um Zahn-Röntgenbilder zu analysieren und das Potenzial von KI in der diagnostischen Bildgebung zu erforschen.",
        cnn: "<strong>Ein Convolutional Neural Network (CNN) entwickelt und trainiert</strong> zur Interpretation von EKG-Signalen und dabei in die Muster der menschlichen Physiologie eingetaucht.",
      },
      current:
        'Diese Projekte waren mehr als technische Übungen; sie waren Lektionen in Verantwortung und der realen Auswirkung von Code. Derzeit kanalisiere ich meine Leidenschaft für Erforschung in akademische Forschung. Ich entwickle <strong>"Synapse"</strong>, ein Firefox-Plugin, das eine neuartige Technik aus der Robotik anwenden möchte, um Benutzerinteraktionen im Browser zu modellieren und zu verstehen - eine Herausforderung, die mich dazu bringt, über konventionelle Webentwicklung hinaus zu denken und Verbindungen zwischen unterschiedlichen Bereichen zu ziehen.',
    },
    philosophy: {
      title: "Meine Philosophie",
      intro:
        "Meine praktische Erfahrung hat meine Sicht auf KI tiefgreifend geprägt. Ich sehe LLMs nicht als Orakel, die definitive Antworten liefern. Stattdessen konzeptualisiere ich sie als:",
      echoChambersQuote:
        '<strong>"Echokammern der Zivilisation"</strong> - umfangreiche, komprimierte Archive menschlichen Wissens und Diskurses. Sie denken nicht; sie reflektieren.',
      mission: "Diese Perspektive definiert meine Mission: ein:",
      knowledgeArchitectQuote:
        '<strong>"Wissensarchitekt"</strong> zu werden. Meine Arbeit besteht nicht nur darin, Modelle zu erstellen, sondern zu lernen, wie man ihnen bessere Fragen stellt, Rahmenwerke zu entwerfen, die uns helfen, durch diese immense Echokammer zu navigieren, und neue Wege für das Lernen zu konstruieren.',
      education:
        'Ich bin besonders leidenschaftlich daran interessiert, wie sich dies auf die Bildung anwenden lässt, und glaube, dass KI das Werkzeug sein kann, das uns endlich von der "Angststeuer" des Auswendiglernens befreit und eine Zukunft personalisierter, neugiergetriebener Entdeckung ermöglicht.',
    },
    beyondCode: {
      title: "Jenseits des Codes",
      content:
        "Ich bin ein unabhängiger Denker, ein beharrlicher Problemlöser und endlos neugierig auf das, was vor uns liegt. Diese Philosophie des langfristigen, prinzipiengeleiteten Wachstums erstreckt sich über meinen Code hinaus - von meiner geduldigen, global diversifizierten Anlagestrategie bis hin zu meinem Glauben an den Zinseszinseffekt des täglichen Lernens. Und ja, wenn ich nicht die Architektur neuronaler Netzwerke erforsche, bin ich oft in den Welten verloren, die Hayao Miyazaki und Isao Takahata geschaffen haben, und ziehe Inspiration aus ihrer Mischung aus Kunstfertigkeit, Technik und Herz.",
      callToAction:
        "Wenn Sie sich für die Zukunft von KI, Bildung interessieren oder einfach mit einem Mitstreiter und Denker in Kontakt treten möchten, würde ich mich freuen, von Ihnen zu hören.",
    },
    connect: {
      title: "Verbinden",
      github: "GitHub",
      email: "di6f5dhgp@mozmail.com",
      rss: "RSS-Feed",
      copied: "Kopiert!",
      copyEmailTitle: "Klicken Sie, um die E-Mail-Adresse zu kopieren",
    },
    capabilities: {
      title: "Kernkompetenzen",
      ml: {
        title: "Maschinelles Lernen",
        description:
          "ViT- und CNN-Expertise mit medizinischen Bildgebungsanwendungen",
      },
      fullstack: {
        title: "Full-Stack-Entwicklung",
        description: "Next.js, TypeScript und Python-Lösungen",
      },
      design: {
        title: "Informationsdesign",
        description: "Leidenschaft für Swiss Design und Datenvisualisierung",
      },
      research: {
        title: "Unabhängige Forschung",
        description: "Synapse: 0-zu-1 Browser-Interaktionsmodellierung",
      },
    },
    values: {
      title: "Grundwerte",
      knowledgeArchitect: {
        title: "Wissensarchitekt",
        description:
          "Ordnung und Klarheit aus Komplexität schaffen, Wege zum Verständnis bauen.",
      },
      crossDomain: {
        title: "Bereichsübergreifende Verbindungen",
        description:
          "Unterschiedliche Bereiche überbrücken, um Innovation an ihren Schnittpunkten zu entdecken.",
      },
      humanCentric: {
        title: "Menschenzentrierte Technologie",
        description:
          "Sicherstellen, dass Technologie grundlegenden menschlichen Bedürfnissen und der Würde dient.",
      },
      independentThinking: {
        title: "Unabhängiges Denken",
        description:
          "Standardantworten hinterfragen und einzigartige konzeptuelle Rahmen konstruieren.",
      },
    },
  },
} as const;
