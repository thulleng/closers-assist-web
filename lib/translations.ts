export type Lang = "en" | "es" | "fr";

export const t: Record<string, Record<Lang, string>> = {
  // ═══════════════════════════════════════════
  // NAV
  // ═══════════════════════════════════════════
  "nav.signIn": { en: "Sign In", es: "Iniciar Sesión", fr: "Connexion" },
  "nav.getStarted": { en: "Get Started", es: "Comenzar", fr: "Commencer" },
  "nav.howItWorks": { en: "How it works", es: "Cómo funciona", fr: "Comment ça marche" },
  "nav.industries": { en: "Industries", es: "Industrias", fr: "Industries" },
  "nav.dashboard": { en: "Dashboard", es: "Panel", fr: "Tableau de bord" },
  "nav.compare": { en: "Compare", es: "Comparar", fr: "Comparer" },
  "nav.pricing": { en: "Pricing", es: "Precios", fr: "Tarifs" },
  "nav.founder": { en: "Founder", es: "Fundador", fr: "Fondateur" },
  "nav.blog": { en: "Blog", es: "Blog", fr: "Blog" },
  "nav.refer": { en: "Refer & Earn", es: "Recomienda y Gana", fr: "Parrainer et Gagner" },
  "nav.enterprise": { en: "Enterprise", es: "Empresarial", fr: "Entreprise" },

  // ═══════════════════════════════════════════
  // BOTTOM NAV
  // ═══════════════════════════════════════════
  "bottom.home": { en: "Home", es: "Inicio", fr: "Accueil" },
  "bottom.industries": { en: "Industries", es: "Industrias", fr: "Industries" },
  "bottom.dashboard": { en: "Dashboard", es: "Panel", fr: "Tableau" },
  "bottom.pricing": { en: "Pricing", es: "Precios", fr: "Tarifs" },
  "bottom.enterprise": { en: "Enterprise", es: "Empresa", fr: "Entreprise" },
  "bottom.more": { en: "More", es: "Más", fr: "Plus" },

  // ═══════════════════════════════════════════
  // HOMEPAGE — HERO (Meet Dora)
  // ═══════════════════════════════════════════
  "hero.dora.meet": { en: "Meet Dora", es: "Conoce a Dora", fr: "Voici Dora" },
  "hero.dora.subtitle": { en: "Your AI Closer", es: "Tu Cerradora IA", fr: "Votre Closer IA" },
  "hero.dora.tagline": { en: "She closes. You collect.", es: "Ella cierra. Tú cobras.", fr: "Elle conclut. Vous encaissez." },
  "hero.dora.body": {
    en: "Ask her anything — pricing, how it works, whether she can really handle your deals AND your life.",
    es: "Pregúntale lo que sea — precios, cómo funciona, si realmente puede manejar tus ventas Y tu vida.",
    fr: "Demandez-lui n'importe quoi — tarifs, fonctionnement, si elle peut vraiment gérer vos affaires ET votre vie."
  },
  "hero.dora.gotAnswers": { en: "She's got the answers.", es: "Ella tiene las respuestas.", fr: "Elle a les réponses." },
  "hero.dora.cta": { en: "👇 Talk to Dora — she's live", es: "👇 Habla con Dora — está en vivo", fr: "👇 Parlez à Dora — elle est en direct" },
  "hero.dora.skip": { en: "Or skip the chat — see plans & pricing →", es: "O salta el chat — ver planes y precios →", fr: "Ou passez le chat — voir les offres →" },

  // ═══════════════════════════════════════════
  // HOMEPAGE — SECOND HERO (You can't clone yourself)
  // ═══════════════════════════════════════════
  "hero2.badge": { en: "The best AI agent in the business · Built by a working rep", es: "El mejor agente IA del negocio · Construido por un vendedor", fr: "Le meilleur agent IA du marché · Créé par un vendeur" },
  "hero2.title1": { en: "You can't clone yourself.", es: "No puedes clonarte.", fr: "Vous ne pouvez pas vous cloner." },
  "hero2.title2": { en: "We did.", es: "Nosotros lo hicimos.", fr: "Nous l'avons fait." },
  "hero2.subtitle": {
    en: "An AI employee that handles your deals AND your life. Never drops a ball. Never forgets a detail. Never clocks out.",
    es: "Un empleado IA que maneja tus ventas Y tu vida. Nunca deja caer nada. Nunca olvida un detalle. Nunca se va.",
    fr: "Un employé IA qui gère vos affaires ET votre vie. Ne rate jamais rien. N'oublie jamais un détail. Ne s'arrête jamais."
  },
  "hero2.email": { en: "your@email.com", es: "tu@email.com", fr: "votre@email.com" },
  "hero2.cta": { en: "Deploy My Agent", es: "Desplegar Mi Agente", fr: "Déployer Mon Agent" },
  "hero2.trust1": { en: "No credit card", es: "Sin tarjeta de crédito", fr: "Sans carte bancaire" },
  "hero2.trust2": { en: "No contracts. Cancel anytime.", es: "Sin contratos. Cancela cuando quieras.", fr: "Sans engagement. Annulez quand vous voulez." },
  "hero2.trust3": { en: "Cancel in 1 click", es: "Cancela en 1 clic", fr: "Annulez en 1 clic" },
  "hero2.watch": { en: "▶ Watch it close a deal in under 4 minutes", es: "▶ Míralo cerrar un trato en menos de 4 minutos", fr: "▶ Regardez-le conclure une vente en moins de 4 minutes" },
  "hero2.closersDeployed": { en: "CLOSERS DEPLOYED", es: "VENDEDORES DESPLEGADOS", fr: "CLOSERS DÉPLOYÉS" },
  "hero2.statsTitle": { en: "The math closers can't argue with", es: "Las matemáticas que los vendedores no pueden refutar", fr: "Les chiffres que les closers ne peuvent pas contester" },
  "hero2.industries": { en: "INDUSTRIES", es: "INDUSTRIAS", fr: "INDUSTRIES" },
  "hero2.alwaysOn": { en: "ALWAYS ON", es: "SIEMPRE ACTIVO", fr: "TOUJOURS ACTIF" },
  "hero2.questionToPlay": { en: "QUESTION TO PLAY", es: "PREGUNTA A RESPUESTA", fr: "QUESTION À RÉPONSE" },
  "hero2.realUi": { en: "REAL UI · Thul's floor · Sun Toyota", es: "UI REAL · El piso de Thul · Sun Toyota", fr: "VRAIE UI · Le terrain de Thul · Sun Toyota" },

  // ═══════════════════════════════════════════
  // HOMEPAGE — POSITIONING STRIP
  // ═══════════════════════════════════════════
  "positioning.line1": {
    en: "We don't build AI tools. We build AI employees — the only ones in the world that handle your deals AND your life.",
    es: "No construimos herramientas de IA. Construimos empleados IA — los únicos en el mundo que manejan tus ventas Y tu vida.",
    fr: "Nous ne créons pas d'outils IA. Nous créons des employés IA — les seuls au monde à gérer vos affaires ET votre vie."
  },
  "positioning.line2": { en: "Category-defining · Floor-built · No competition", es: "Categoría definitoria · Construido en el piso · Sin competencia", fr: "Catégorie inédite · Créé sur le terrain · Sans concurrence" },

  // ═══════════════════════════════════════════
  // HOMEPAGE — THREE BENEFITS
  // ═══════════════════════════════════════════
  "benefits.badge": { en: "Why closers choose us", es: "Por qué los vendedores nos eligen", fr: "Pourquoi les closers nous choisissent" },
  "benefits.title1": { en: "More than a bot.", es: "Más que un bot.", fr: "Plus qu'un bot." },
  "benefits.title2": { en: "This is your employee.", es: "Este es tu empleado.", fr: "C'est votre employé." },
  "benefits.never.title": { en: "Never forgets a deal", es: "Nunca olvida un trato", fr: "N'oublie jamais une vente" },
  "benefits.never.body": {
    en: "Remembers every customer. Every objection. Every close. Six months later, a customer walks back on the lot — Deal Clozr knows exactly what you said, what they pushed back on, and what closed them last time.",
    es: "Recuerda cada cliente. Cada objeción. Cada cierre. Seis meses después, un cliente vuelve al lote — Deal Clozr sabe exactamente qué dijiste, qué objetaron y qué los cerró la última vez.",
    fr: "Se souvient de chaque client. Chaque objection. Chaque conclusion. Six mois plus tard, un client revient — Deal Clozr sait exactement ce que vous avez dit, ce sur quoi il a résisté, et ce qui l'a convaincu."
  },
  "benefits.never.tag": { en: "Persistent memory across sessions", es: "Memoria persistente entre sesiones", fr: "Mémoire persistante entre les sessions" },
  "benefits.zero.title": { en: "Zero setup. Zero training.", es: "Cero configuración. Cero entrenamiento.", fr: "Zéro configuration. Zéro formation." },
  "benefits.zero.body": {
    en: "Pick your industry. Start closing. No prompt engineering. No training period. No IT ticket. You already know how to text — that's the entire interface.",
    es: "Elige tu industria. Empieza a cerrar. Sin ingeniería de prompts. Sin período de entrenamiento. Sin ticket de TI. Ya sabes enviar mensajes — esa es toda la interfaz.",
    fr: "Choisissez votre secteur. Commencez à closer. Pas d'ingénierie de prompt. Pas de formation. Pas de ticket IT. Vous savez déjà envoyer des messages — c'est toute l'interface."
  },
  "benefits.zero.tag": { en: "Close your first deal in under 2 minutes", es: "Cierra tu primer trato en menos de 2 minutos", fr: "Concluez votre première vente en moins de 2 minutes" },
  "benefits.voice.title": { en: "Sounds like you. Not a bot.", es: "Suena como tú. No como un bot.", fr: "Elle parle comme vous. Pas comme un robot." },
  "benefits.voice.body": {
    en: "Your scripts. Your style. Your floor. Deal Clozr learns how YOU talk — not some generic AI that sounds like a press release. Every play reads like you typed it between customers.",
    es: "Tus guiones. Tu estilo. Tu piso. Deal Clozr aprende cómo hablas TÚ — no una IA genérica que suena como un comunicado de prensa. Cada jugada se lee como si la hubieras escrito entre clientes.",
    fr: "Vos scripts. Votre style. Votre terrain. Deal Clozr apprend comment VOUS parlez — pas une IA générique qui sonne comme un communiqué. Chaque réponse se lit comme si vous l'aviez écrite entre deux clients."
  },
  "benefits.voice.tag": { en: "Built on Thul's floor at Sun Toyota", es: "Construido en el piso de Thul en Sun Toyota", fr: "Créé sur le terrain de Thul chez Sun Toyota" },

  // ═══════════════════════════════════════════
  // HOMEPAGE — WHAT YOUR AGENT DOES
  // ═══════════════════════════════════════════
  "agent.badge": { en: "What your agent does", es: "Lo que hace tu agente", fr: "Ce que fait votre agent" },
  "agent.title1": { en: "One agent.", es: "Un agente.", fr: "Un seul agent." },
  "agent.title2": { en: "Your entire life. Handled.", es: "Toda tu vida. Resuelta.", fr: "Toute votre vie. Gérée." },
  "agent.deals.title": { en: "Closes Deals", es: "Cierra Tratos", fr: "Conclut des ventes" },
  "agent.deals.subtitle": { en: "Your agent handles the revenue side — so you focus on closing, not admin.", es: "Tu agente maneja los ingresos — para que te enfoques en cerrar, no en administrar.", fr: "Votre agent gère les revenus — pour que vous vous concentriez sur la vente, pas l'admin." },
  "agent.deals.followup": { en: "Follows up with leads automatically", es: "Hace seguimiento automático de prospectos", fr: "Relance les prospects automatiquement" },
  "agent.deals.pipeline": { en: "Manages pipeline stage-by-stage", es: "Gestiona el pipeline etapa por etapa", fr: "Gère le pipeline étape par étape" },
  "agent.deals.contracts": { en: "Drafts contracts & invoices", es: "Redacta contratos y facturas", fr: "Rédige contrats et factures" },
  "agent.deals.crm": { en: "Syncs with email & CRM", es: "Sincroniza con email y CRM", fr: "Se synchronise avec email et CRM" },
  "agent.deals.cold": { en: "Never lets a cold lead go cold", es: "Nunca deja que un prospecto se enfríe", fr: "Ne laisse jamais un prospect refroidir" },
  "agent.life.title": { en: "Handles Life", es: "Maneja Tu Vida", fr: "Gère votre vie" },
  "agent.life.subtitle": { en: "Your agent remembers the personal stuff — so you never drop a ball at home.", es: "Tu agente recuerda lo personal — para que nunca dejes caer nada en casa.", fr: "Votre agent se souvient du personnel — pour ne jamais rien oublier à la maison." },
  "agent.life.appointments": { en: "Books appointments & reservations", es: "Reserva citas y reservaciones", fr: "Réserve rendez-vous et réservations" },
  "agent.life.birthdays": { en: "Reminds you of birthdays & events", es: "Te recuerda cumpleaños y eventos", fr: "Vous rappelle anniversaires et événements" },
  "agent.life.travel": { en: "Researches flights & hotels", es: "Investiga vuelos y hoteles", fr: "Recherche vols et hôtels" },
  "agent.life.newsletters": { en: "Summarizes school newsletters", es: "Resume boletines escolares", fr: "Résume les newsletters scolaires" },
  "agent.life.todos": { en: "Manages your to-do list", es: "Gestiona tu lista de tareas", fr: "Gère votre liste de tâches" },

  // ═══════════════════════════════════════════
  // PRICING PAGE
  // ═══════════════════════════════════════════
  "pricing.title1": { en: "Pick the plan that", es: "Elige el plan que", fr: "Choisissez le plan qui" },
  "pricing.title2": { en: "fits your floor.", es: "se adapta a tu piso.", fr: "convient à votre terrain." },
  "pricing.subtitle": {
    en: "One extra deal covers your subscription for years. No feature gating. Every tier ships the same full agent — tiers differ by team size and support, never by capability.",
    es: "Un trato extra cubre tu suscripción por años. Sin restricción de funciones. Cada nivel incluye el mismo agente completo — los niveles difieren por tamaño de equipo y soporte, nunca por capacidad.",
    fr: "Une vente supplémentaire couvre votre abonnement pour des années. Pas de bridage. Chaque niveau inclut le même agent complet — les niveaux diffèrent par taille d'équipe et support, jamais par capacité."
  },
  "pricing.solo": { en: "I'm a solo rep", es: "Soy vendedor individual", fr: "Je suis vendeur solo" },
  "pricing.team": { en: "I run a team", es: "Dirijo un equipo", fr: "Je dirige une équipe" },
  "pricing.dealership": { en: "I run a dealership", es: "Dirijo una concesionaria", fr: "Je dirige une concession" },
  "pricing.monthly": { en: "Monthly", es: "Mensual", fr: "Mensuel" },
  "pricing.annual": { en: "Annual — save 20%", es: "Anual — ahorra 20%", fr: "Annuel — économisez 20%" },
  "pricing.trial": { en: "14-day free trial. Cancel anytime.", es: "Prueba gratuita de 14 días. Cancela cuando quieras.", fr: "Essai gratuit de 14 jours. Annulez quand vous voulez." },
  "pricing.getStarted": { en: "Get Started", es: "Comenzar", fr: "Commencer" },
  "pricing.talkSales": { en: "Talk to sales", es: "Hablar con ventas", fr: "Parler aux ventes" },
  "pricing.whyTitle": { en: "Why $29.99 when ChatGPT is free?", es: "¿Por qué $29.99 cuando ChatGPT es gratis?", fr: "Pourquoi 29,99 $ quand ChatGPT est gratuit ?" },

  // ═══════════════════════════════════════════
  // COMPARE PAGE
  // ═══════════════════════════════════════════
  "compare.title1": { en: "An AI employee vs", es: "Un empleado IA vs", fr: "Un employé IA contre" },
  "compare.title2": { en: "everything else.", es: "todo lo demás.", fr: "tout le reste." },
  "compare.scenarios": { en: "Real scenarios.", es: "Escenarios reales.", fr: "Scénarios réels." },
  "compare.differences": { en: "Real differences.", es: "Diferencias reales.", fr: "Différences réelles." },
  "compare.verdict": { en: "The verdict", es: "El veredicto", fr: "Le verdict" },
  "compare.bottomLine": { en: "The bottom line", es: "En resumen", fr: "En résumé" },
  "compare.bottomTitle": { en: "One extra deal pays for 10 years of Deal Clozr.", es: "Un trato extra paga 10 años de Deal Clozr.", fr: "Une vente supplémentaire paie 10 ans de Deal Clozr." },
  "compare.seePricing": { en: "See Pricing", es: "Ver Precios", fr: "Voir les tarifs" },
  "compare.howItWorks": { en: "How it works →", es: "Cómo funciona →", fr: "Comment ça marche →" },

  // ═══════════════════════════════════════════
  // HOW IT WORKS PAGE
  // ═══════════════════════════════════════════
  "how.title1": { en: "Four steps.", es: "Cuatro pasos.", fr: "Quatre étapes." },
  "how.title2": { en: "Ready to close.", es: "Listo para cerrar.", fr: "Prêt à closer." },
  "how.subtitle": {
    en: "No onboarding call. No setup wizard. No data entry. Pick your industry, load your profile, and put it to work the same day.",
    es: "Sin llamada de incorporación. Sin asistente de configuración. Sin entrada de datos. Elige tu industria, carga tu perfil y ponlo a trabajar el mismo día.",
    fr: "Pas d'appel d'intégration. Pas d'assistant. Pas de saisie. Choisissez votre secteur, chargez votre profil et mettez-le au travail le jour même."
  },
  "how.browse": { en: "Browse industries", es: "Explorar industrias", fr: "Explorer les secteurs" },
  "how.chatAnywhere": { en: "Your agent goes where you go.", es: "Tu agente va donde tú vayas.", fr: "Votre agent vous suit partout." },
  "how.chatSub": {
    en: "No new tab. No login every time. Your agent is always one tap away — on the lot, at the desk, or on your phone between customers.",
    es: "Sin nueva pestaña. Sin iniciar sesión cada vez. Tu agente está siempre a un toque — en el lote, en el escritorio o en tu teléfono entre clientes.",
    fr: "Pas de nouvel onglet. Pas de connexion à chaque fois. Votre agent est toujours à un tap — sur le terrain, au bureau, ou sur votre téléphone entre deux clients."
  },

  // ═══════════════════════════════════════════
  // ENTERPRISE PAGE
  // ═══════════════════════════════════════════
  "enterprise.title1": { en: "Your AI Closer.", es: "Tu Cerrador IA.", fr: "Votre Closer IA." },
  "enterprise.title2": { en: "Built. Hosted. Managed.", es: "Construido. Alojado. Gestionado.", fr: "Créé. Hébergé. Géré." },
  "enterprise.book": { en: "Book a Call", es: "Agendar Llamada", fr: "Réserver un appel" },
  "enterprise.selfServe": { en: "Prefer self-serve? Starter from $29.99/mo →", es: "¿Prefieres autoservicio? Desde $29.99/mes →", fr: "Préférez le libre-service ? À partir de 29,99 $/mois →" },

  // ═══════════════════════════════════════════
  // REFERRAL PAGE
  // ═══════════════════════════════════════════
  "referral.title1": { en: "Share the tool.", es: "Comparte la herramienta.", fr: "Partagez l'outil." },
  "referral.title2": { en: "Get paid.", es: "Recibe pago.", fr: "Soyez payé." },
  "referral.subtitle": { en: "Every closer you bring in earns you credit. Salespeople talk. Now that talk pays.", es: "Cada vendedor que traes te da crédito. Los vendedores hablan. Ahora esa charla paga.", fr: "Chaque closer que vous amenez vous rapporte. Les vendeurs parlent. Maintenant, ça paie." },
  "referral.badge": { en: "Refer & Earn", es: "Recomienda y Gana", fr: "Parrainer et Gagner" },
  "referral.topReferrers": { en: "Top Referrers", es: "Principales Referidores", fr: "Meilleurs Parrains" },
  "referral.closersHelp": { en: "Closers help closers", es: "Los vendedores ayudan a los vendedores", fr: "Les closers aident les closers" },
  "referral.howWorks": { en: "How it works", es: "Cómo funciona", fr: "Comment ça marche" },
  "referral.perSignup": { en: "Per signup", es: "Por registro", fr: "Par inscription" },
  "referral.freeMonth": { en: "Free for 5 refs", es: "Gratis por 5 refs", fr: "Gratuit pour 5 filleuls" },
  "referral.stack": { en: "Stack unlimited", es: "Acumula ilimitado", fr: "Cumul illimité" },

  // ═══════════════════════════════════════════
  // FOUNDER PAGE
  // ═══════════════════════════════════════════
  "founder.title": { en: "Built by a closer. For closers.", es: "Construido por un vendedor. Para vendedores.", fr: "Créé par un closer. Pour les closers." },

  // ═══════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════
  "footer.tagline": {
    en: "The AI agent every closer owns. Built on the floor. Deployed worldwide.",
    es: "El agente IA que todo vendedor tiene. Construido en el piso. Desplegado mundialmente.",
    fr: "L'agent IA que chaque closer possède. Créé sur le terrain. Déployé dans le monde entier."
  },
  "footer.product": { en: "PRODUCT", es: "PRODUCTO", fr: "PRODUIT" },
  "footer.industries": { en: "INDUSTRIES", es: "INDUSTRIAS", fr: "INDUSTRIES" },
  "footer.company": { en: "COMPANY", es: "EMPRESA", fr: "ENTREPRISE" },
  "footer.allIndustries": { en: "All 18 industries →", es: "Las 18 industrias →", fr: "Les 18 secteurs →" },
  "footer.contact": { en: "Contact", es: "Contacto", fr: "Contact" },
  "footer.privacy": { en: "Privacy", es: "Privacidad", fr: "Confidentialité" },
  "footer.terms": { en: "Terms", es: "Términos", fr: "Conditions" },

  // ═══════════════════════════════════════════
  // COMMON / CTAs
  // ═══════════════════════════════════════════
  "common.tryAgent": { en: "Try the agent", es: "Prueba el agente", fr: "Essayer l'agent" },
  "common.getStartedPrice": { en: "Get Started — $29.99/mo", es: "Comenzar — $29.99/mes", fr: "Commencer — 29,99 $/mois" },
  "common.trialNote": { en: "14-day free trial. No credit card. Cancel anytime.", es: "Prueba gratuita de 14 días. Sin tarjeta. Cancela cuando quieras.", fr: "Essai gratuit 14 jours. Sans CB. Annulez quand vous voulez." },

  // ═══════════════════════════════════════════
  // SANDBOX CHAT
  // ═══════════════════════════════════════════
  "sandbox.title": { en: "Try Sassy", es: "Prueba a Sassy", fr: "Essayer Sassy" },
  "sandbox.freeLeft": { en: "free left", es: "gratis restantes", fr: "gratuits restants" },
  "sandbox.placeholder": { en: "Log a deal, check math, write a script...", es: "Registra un trato, verifica matemáticas, escribe un guion...", fr: "Enregistrez une vente, vérifiez les calculs, écrivez un script..." },
  "sandbox.thinking": { en: "Sassy is thinking", es: "Sassy está pensando", fr: "Sassy réfléchit" },
  "sandbox.liked": { en: "Liked what you saw?", es: "¿Te gustó lo que viste?", fr: "Vous avez aimé ?" },
  "sandbox.signup": { en: "Sign up free — pick up right where you left off. No credit card.", es: "Regístrate gratis — continúa justo donde lo dejaste. Sin tarjeta.", fr: "Inscrivez-vous gratuitement — reprenez là où vous en étiez. Sans CB." },
  "sandbox.signupBtn": { en: "Sign up free", es: "Regístrate gratis", fr: "S'inscrire gratuitement" },
  // ═══════════════════════════════════════════
  // HOMEPAGE — REAL RESULTS SECTION
  // ═══════════════════════════════════════════
  "results.badge": { en: "Real results from real floors", es: "Resultados reales de pisos reales", fr: "R\u00E9sultats r\u00E9els de vrais terrains" },
  "results.title1": { en: "Closers who use it.", es: "Vendedores que lo usan.", fr: "Les closers qui l'utilisent." },
  "results.title2": { en: "Numbers that prove it.", es: "N\u00FAmeros que lo prueban.", fr: "Des chiffres qui le prouvent." },
  "results.joinCta": { en: "Join Them \u2014 Start Your Free Trial", es: "\u00DAnete \u2014 Comienza tu Prueba Gratis", fr: "Rejoignez-les \u2014 Essayez Gratuitement" },
  "results.trialNote": { en: "No credit card. Cancel anytime. Your agent ships in 5 minutes.", es: "Sin tarjeta. Cancela cuando quieras. Tu agente se despliega en 5 minutos.", fr: "Sans CB. Annulez quand vous voulez. Votre agent est pr\u00EAt en 5 minutes." },

  // HOMEPAGE — HOW IT WORKS
  "hiw.badge": { en: "How it works", es: "C\u00F3mo funciona", fr: "Comment \u00E7a marche" },
  "hiw.title1": { en: "Your agent is live", es: "Tu agente est\u00E1 en vivo", fr: "Votre agent est en direct" },
  "hiw.title2": { en: "in 5 minutes.", es: "en 5 minutos.", fr: "en 5 minutes." },
  "hiw.step1.title": { en: "Tell us about you", es: "Cu\u00E9ntanos sobre ti", fr: "Parlez-nous de vous" },
  "hiw.step1.tag": { en: "< 2 minutes", es: "< 2 minutos", fr: "< 2 minutes" },
  "hiw.step2.title": { en: "Deploy on Telegram", es: "Despliega en Telegram", fr: "D\u00E9ployez sur Telegram" },
  "hiw.step2.tag": { en: "Instant", es: "Instant\u00E1neo", fr: "Instantan\u00E9" },
  "hiw.step3.title": { en: "Start closing. Start living.", es: "Empieza a cerrar. Empieza a vivir.", fr: "Commencez \u00E0 closer. Commencez \u00E0 vivre." },
  "hiw.step3.tag": { en: "Day 1 value", es: "Valor desde el d\u00EDa 1", fr: "Valeur d\u00E8s le jour 1" },

  // HOMEPAGE — TUTORIAL
  "tutorial.badge": { en: "Watch the walkthrough", es: "Mira el recorrido", fr: "Regardez la d\u00E9mo" },
  "tutorial.title1": { en: "See exactly how it works", es: "Mira exactamente c\u00F3mo funciona", fr: "Voyez exactement comment \u00E7a marche" },
  "tutorial.title2": { en: " in under 4 minutes.", es: " en menos de 4 minutos.", fr: " en moins de 4 minutes." },
  "tutorial.caption": { en: "From sign-up to your first closed deal \u2014 everything you need in under 4 minutes.", es: "Del registro a tu primer trato cerrado \u2014 todo lo que necesitas en menos de 4 minutos.", fr: "De l'inscription \u00E0 votre premi\u00E8re vente conclue \u2014 tout ce qu'il vous faut en moins de 4 minutes." },

  // HOMEPAGE — ROI
  "roi.badge": { en: "Live ROI calculator", es: "Calculadora de ROI en vivo", fr: "Calculateur de ROI en direct" },
  "roi.title1": { en: "One deal pays for", es: "Un trato paga por", fr: "Une vente paie pour" },
  "roi.title2": { en: "10 years.", es: "10 a\u00F1os.", fr: "10 ans." },
  "roi.subtitle": { en: "Drag the sliders. Watch the green number. This is the math, not a pitch.", es: "Arrastra los controles. Mira el n\u00FAmero verde. Esto son matem\u00E1ticas, no un discurso de ventas.", fr: "D\u00E9placez les curseurs. Regardez le nombre vert. Ce sont les maths, pas un argumentaire." },

  // HOMEPAGE — FOUNDER
  "founderSection.badge": { en: "Built on the floor", es: "Construido en el piso", fr: "Cr\u00E9\u00E9 sur le terrain" },
  "founderSection.readStory": { en: "Read the full story", es: "Lee la historia completa", fr: "Lire l'histoire compl\u00E8te" },

  // HOMEPAGE — PRICING SNAPSHOT
  "hpPricing.badge": { en: "Pricing", es: "Precios", fr: "Tarifs" },
  "hpPricing.included": { en: "Both tiers include \u2014", es: "Ambos niveles incluyen \u2014", fr: "Les deux niveaux incluent \u2014" },

  // HOMEPAGE — COMPARISON
  "comparison.badge": { en: "Head to head", es: "Cara a cara", fr: "Face \u00E0 face" },
  "comparison.crm": { en: "Your CRM", es: "Tu CRM", fr: "Votre CRM" },
  "comparison.genericAI": { en: "Generic AI", es: "IA Gen\u00E9rica", fr: "IA G\u00E9n\u00E9rique" },
  "comparison.dealClozr": { en: "DEAL CLOZR", es: "DEAL CLOZR", fr: "DEAL CLOZR" },

  // HOMEPAGE — ENTERPRISE CTA
  "enterpriseCta.badge": { en: "Enterprise", es: "Empresarial", fr: "Entreprise" },

  // HOMEPAGE — FINAL CTA
  "finalCta.title1": { en: "Your agent is waiting.", es: "Tu agente te espera.", fr: "Votre agent vous attend." },
  "finalCta.title2": { en: "Deploy yours in 5 minutes.", es: "Despliega el tuyo en 5 minutos.", fr: "D\u00e9ployez le v\u00f4tre en 5 minutes." },

  "blog.title": { en: "From the Floor", es: "Desde el Piso", fr: "Du Terrain" },
  "blog.subtitle": { en: "Strategy, plays, and real talk from a working rep. No theory. Just what works.", es: "Estrategia, jugadas y conversaci\u00f3n real de un vendedor en activo. Sin teor\u00eda. Solo lo que funciona.", fr: "Strat\u00e9gie, techniques et vrais conseils d'un vendeur actif. Pas de th\u00e9orie. Que du concret." },

  "industries.subtitle": { en: "One AI agent. Every industry. Zero restrictions.", es: "Un agente IA. Cada industria. Cero restricciones.", fr: "Un agent IA. Tous les secteurs. Z\u00e9ro restrictions." },
  "industries.all": { en: "All 18 industries", es: "Las 18 industrias", fr: "Les 18 secteurs" },

};
