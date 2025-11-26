import { RawProductIdea } from "src/types/ProductIdea";

export const WE_WISH_PRODUCT_IDEA: RawProductIdea = {
    "id": "we-wish",
    "name": "We Wish",
    "isReady": true,
    "themeColor": "lavender",
    "logo": "dandelion",
    "features": [
        {
            "id": "multi-stores-wishlist",
            "icon": "mdi:cart-heart",
            "pain": {
                "en": "Stop sending dozens of links, keep all your gift ideas in one simple list.",
                "fr": "Fini les dizaines de liens envoyés, regroupez toutes vos envies dans une seule liste."
            },
            "title": {
                "en": "One wishlist for all shops",
                "fr": "Une wishlist pour tous les sites"
            },
            "items": [
                {
                    "icon": "mdi:web",
                    "title": {
                        "en": "From any website",
                        "fr": "Depuis n'importe quel site"
                    },
                    "description": {
                        "en": "Add a gift from any online store with a simple copy–paste or browser extension.",
                        "fr": "Ajoutez un cadeau depuis n'importe quelle boutique avec un simple copier–coller ou l’extension."
                    }
                },
                {
                    "icon": "mdi:gift-outline",
                    "title": {
                        "en": "All wishes in one place",
                        "fr": "Toutes vos envies au même endroit"
                    },
                    "description": {
                        "en": "Centralize books, toys, décor, experiences and more in a single wishlist.",
                        "fr": "Centralisez livres, jouets, déco, expériences et plus encore dans une seule wishlist."
                    }
                },
                {
                    "icon": "mdi:update",
                    "title": {
                        "en": "Always up to date",
                        "fr": "Toujours à jour"
                    },
                    "description": {
                        "en": "Edit, reorder or remove ideas in seconds without resending everything to your friends.",
                        "fr": "Modifiez, réorganisez ou supprimez vos idées en quelques secondes sans tout renvoyer à vos proches."
                    }
                }
            ],
            "imgUrl": "https://example.com/img/features/multi-stores-wishlist.png"
        },
        {
            "id": "easy-sharing",
            "icon": "mdi:share-variant",
            "pain": {
                "en": "Make it easy for loved ones to choose a gift without asking you a hundred questions.",
                "fr": "Aidez vos proches à choisir un cadeau sans qu'ils vous posent mille questions."
            },
            "title": {
                "en": "Share in two clicks",
                "fr": "Partage en deux clics"
            },
            "items": [
                {
                    "icon": "mdi:link-variant",
                    "title": {
                        "en": "A simple share link",
                        "fr": "Un simple lien à partager"
                    },
                    "description": {
                        "en": "Send your wishlist by link, email or messaging apps in a few seconds.",
                        "fr": "Envoyez votre wishlist par lien, e-mail ou messagerie en quelques secondes."
                    }
                },
                {
                    "icon": "mdi:account-off-outline",
                    "title": {
                        "en": "No account for guests",
                        "fr": "Pas de compte pour les invités"
                    },
                    "description": {
                        "en": "Your friends can see and reserve gifts without creating an account.",
                        "fr": "Vos proches peuvent voir et réserver les cadeaux sans créer de compte."
                    }
                },
                {
                    "icon": "mdi:checkbox-marked-circle-outline",
                    "title": {
                        "en": "No more duplicate gifts",
                        "fr": "Fini les cadeaux en double"
                    },
                    "description": {
                        "en": "Everyone sees what is already reserved so you avoid awkward duplicates.",
                        "fr": "Tout le monde voit ce qui est déjà réservé pour éviter les doublons gênants."
                    }
                }
            ],
            "imgUrl": "https://example.com/img/features/easy-sharing.png"
        },
        {
            "id": "events-and-lists",
            "icon": "mdi:calendar-heart",
            "pain": {
                "en": "Stop rebuilding a new list from scratch for every birthday, Christmas or big event.",
                "fr": "Arrêtez de recréer une nouvelle liste à chaque anniversaire, Noël ou grand événement."
            },
            "title": {
                "en": "Lists for every moment",
                "fr": "Des listes pour chaque moment"
            },
            "items": [
                {
                    "icon": "mdi:calendar-star",
                    "title": {
                        "en": "All your big events",
                        "fr": "Tous vos grands événements"
                    },
                    "description": {
                        "en": "Create lists for birthdays, Christmas, baby showers, weddings, housewarmings and more.",
                        "fr": "Créez des listes pour anniversaires, Noël, naissance, mariage, crémaillère et bien plus."
                    }
                },
                {
                    "icon": "mdi:infinity",
                    "title": {
                        "en": "Unlimited wishlists",
                        "fr": "Wishlists illimitées"
                    },
                    "description": {
                        "en": "Organize as many lists as you need: family, kids, couple or just for yourself.",
                        "fr": "Organisez autant de listes que vous voulez : famille, enfants, couple ou juste pour vous."
                    }
                },
                {
                    "icon": "mdi:account-multiple-outline",
                    "title": {
                        "en": "Collaborative lists",
                        "fr": "Listes collaboratives"
                    },
                    "description": {
                        "en": "Invite your partner or friends to build and manage a wishlist together.",
                        "fr": "Invitez votre partenaire ou vos amis pour créer et gérer une wishlist à plusieurs."
                    }
                }
            ],
            "imgUrl": "https://example.com/img/features/events-and-lists.png"
        },
        {
            "id": "tracking-payments",
            "icon": "mdi:gift-open-outline",
            "pain": {
                "en": "You never know who bought what, and guests are afraid to choose the same gift.",
                "fr": "Vous ne savez jamais qui a acheté quoi, et vos proches ont peur de choisir le même cadeau."
            },
            "title": {
                "en": "Reservations & cash pot",
                "fr": "Réservations & cagnotte"
            },
            "items": [
                {
                    "icon": "mdi:bell-outline",
                    "title": {
                        "en": "Smart reservations",
                        "fr": "Réservations intelligentes"
                    },
                    "description": {
                        "en": "Guests reserve gifts anonymously or not, and you’re notified when a gift is taken.",
                        "fr": "Les invités réservent les cadeaux, en anonyme ou non, et vous êtes averti quand un cadeau est pris."
                    }
                },
                {
                    "icon": "mdi:piggy-bank-outline",
                    "title": {
                        "en": "Add a money pot",
                        "fr": "Ajoutez une cagnotte"
                    },
                    "description": {
                        "en": "Connect a digital cash pot so friends can contribute when a gift is too expensive.",
                        "fr": "Reliez une cagnotte en ligne pour que vos proches participent aux cadeaux plus chers."
                    }
                },
                {
                    "icon": "mdi:shield-check",
                    "title": {
                        "en": "Clear view for everyone",
                        "fr": "Visibilité pour tous"
                    },
                    "description": {
                        "en": "Guests see prices, links and notes, so they can choose calmly within their budget.",
                        "fr": "Les invités voient prix, liens et notes pour choisir sereinement selon leur budget."
                    }
                }
            ],
            "imgUrl": "https://example.com/img/features/tracking-payments.png"
        },
        {
            "id": "simple-free-access",
            "icon": "mdi:cellphone-link",
            "pain": {
                "en": "Managing gift ideas across devices and apps quickly becomes a mess.",
                "fr": "Gérer ses idées cadeaux sur plusieurs appareils et applis devient vite un bazar."
            },
            "title": {
                "en": "Simple, mobile & free",
                "fr": "Simple, mobile et gratuit"
            },
            "items": [
                {
                    "icon": "mdi:cellphone",
                    "title": {
                        "en": "Works everywhere",
                        "fr": "Fonctionne partout"
                    },
                    "description": {
                        "en": "Use WeWish on your phone, tablet or computer with a clean, modern interface.",
                        "fr": "Utilisez WeWish sur téléphone, tablette ou ordinateur avec une interface claire et moderne."
                    }
                },
                {
                    "icon": "mdi:extension-puzzle",
                    "title": {
                        "en": "Browser extension",
                        "fr": "Extension navigateur"
                    },
                    "description": {
                        "en": "Save a product to your wishlist directly while browsing your favourite shops.",
                        "fr": "Enregistrez un produit dans votre wishlist directement en naviguant sur vos boutiques préférées."
                    }
                },
                {
                    "icon": "mdi:currency-eur-off",
                    "title": {
                        "en": "100% free service",
                        "fr": "Service 100 % gratuit"
                    },
                    "description": {
                        "en": "Create and share as many lists as you want, without fees for you or your guests.",
                        "fr": "Créez et partagez autant de listes que vous voulez, sans frais pour vous ni pour vos proches."
                    }
                }
            ],
            "imgUrl": "https://example.com/img/features/simple-free-access.png"
        }
    ],
    "heroTexts": {
        "description": {
            "en": "Create modern online wishlists for every event, add gifts from any website and share them in a few clicks so your loved ones always choose the right present.",
            "fr": "Créez des wishlists modernes pour tous vos événements, ajoutez des cadeaux depuis n'importe quel site et partagez-les en quelques clics pour que vos proches visent juste à chaque fois."
        },
        "headingPart1": {
            "en": "List your wishes,",
            "fr": "Listez vos envies,"
        },
        "headingPart2": {
            "en": "share and celebrate",
            "fr": "partagez et célébrez"
        }
    },
    "reviews": [
        {
            "id": "rev-1",
            "name": "Alex G.",
            "rating": 5,
            "jobTitle": {
                "en": "Busy parent",
                "fr": "Parent débordé"
            },
            "content": {
                "en": "For birthdays and Christmas, I just send my WeWish link. No more stress or duplicate toys.",
                "fr": "Pour les anniversaires et Noël, j'envoie juste mon lien WeWish. Plus de stress ni de jouets en doublon."
            },
            "postedAt": new Date("2025-01-10T09:15:00.000Z")
        },
        {
            "id": "rev-2",
            "name": "Marie L.",
            "rating": 5,
            "jobTitle": {
                "en": "Future bride",
                "fr": "Future mariée"
            },
            "content": {
                "en": "Our wedding gifts were perfectly managed. Guests loved how easy the list was to use.",
                "fr": "Nos cadeaux de mariage ont été parfaitement gérés. Les invités ont adoré la simplicité de la liste."
            },
            "postedAt": new Date("2025-02-02T18:30:00.000Z")
        },
        {
            "id": "rev-3",
            "name": "Tom D.",
            "rating": 5,
            "jobTitle": {
                "en": "Student",
                "fr": "Étudiant"
            },
            "content": {
                "en": "I keep one wishlist all year, so my family always knows what I really need.",
                "fr": "Je garde une wishlist toute l'année, comme ça ma famille sait toujours ce dont j'ai vraiment besoin."
            },
            "postedAt": new Date("2025-03-12T14:05:00.000Z")
        },
        {
            "id": "rev-4",
            "name": "Emma P.",
            "rating": 4,
            "jobTitle": {
                "en": "New parent",
                "fr": "Jeune parent"
            },
            "content": {
                "en": "Perfect for our baby registry, even with gifts from different shops and second-hand items.",
                "fr": "Parfait pour notre liste de naissance, même avec des cadeaux de différents sites et d'occasion."
            },
            "postedAt": new Date("2025-03-28T11:20:00.000Z")
        },
        {
            "id": "rev-5",
            "name": "Lucas R.",
            "rating": 5,
            "jobTitle": {
                "en": "Gift organiser",
                "fr": "Organisateur de cadeaux"
            },
            "content": {
                "en": "No one in the family buys the same gift anymore. Reservations make everything simple.",
                "fr": "Plus personne n'achète le même cadeau dans la famille. Les réservations simplifient tout."
            },
            "postedAt": new Date("2025-04-05T16:45:00.000Z")
        },
        {
            "id": "rev-6",
            "name": "Sofia M.",
            "rating": 5,
            "jobTitle": {
                "en": "Friend group planner",
                "fr": "Organisatrice de groupe d'amis"
            },
            "content": {
                "en": "We use WeWish for Secret Santa. Everyone adds ideas and the surprise stays intact.",
                "fr": "On utilise WeWish pour le Secret Santa. Chacun ajoute ses idées et la surprise reste intacte."
            },
            "postedAt": new Date("2025-04-20T20:10:00.000Z")
        },
        {
            "id": "rev-7",
            "name": "Nina K.",
            "rating": 5,
            "jobTitle": {
                "en": "Tech-savvy aunt",
                "fr": "Tata connectée"
            },
            "content": {
                "en": "Even my parents can open the link and reserve a gift without creating an account.",
                "fr": "Même mes parents ouvrent le lien et réservent un cadeau sans créer de compte."
            },
            "postedAt": new Date("2025-05-01T08:55:00.000Z")
        },
        {
            "id": "rev-8",
            "name": "Hugo V.",
            "rating": 4,
            "jobTitle": {
                "en": "Housewarming host",
                "fr": "Hôte de crémaillère"
            },
            "content": {
                "en": "Great for our housewarming. Guests picked exactly what we needed for the new home.",
                "fr": "Génial pour notre crémaillère. Les invités ont choisi exactement ce dont on avait besoin."
            },
            "postedAt": new Date("2025-05-14T19:25:00.000Z")
        },
        {
            "id": "rev-9",
            "name": "Claire B.",
            "rating": 5,
            "jobTitle": {
                "en": "HR manager",
                "fr": "Responsable RH"
            },
            "content": {
                "en": "We used WeWish for a team baby shower at work. It saved us a lot of time.",
                "fr": "On a utilisé WeWish pour une baby shower d'équipe au boulot. Ça nous a fait gagner du temps."
            },
            "postedAt": new Date("2025-06-03T13:40:00.000Z")
        },
        {
            "id": "rev-10",
            "name": "Jade C.",
            "rating": 5,
            "jobTitle": {
                "en": "Lifestyle blogger",
                "fr": "Blogueuse lifestyle"
            },
            "content": {
                "en": "The interface is clean and modern. I recommend it in all my gift guides.",
                "fr": "L'interface est claire et moderne. Je le recommande dans tous mes guides cadeaux."
            },
            "postedAt": new Date("2025-06-21T10:00:00.000Z")
        },
        {
            "id": "rev-11",
            "name": "Omar S.",
            "rating": 5,
            "jobTitle": {
                "en": "Godfather",
                "fr": "Parrain"
            },
            "content": {
                "en": "I finally know what to buy for my godchildren without asking their parents every time.",
                "fr": "Je sais enfin quoi acheter à mes filleuls sans demander aux parents à chaque fois."
            },
            "postedAt": new Date("2025-07-02T17:35:00.000Z")
        },
        {
            "id": "rev-12",
            "name": "Léa F.",
            "rating": 5,
            "jobTitle": {
                "en": "Young professional",
                "fr": "Jeune active"
            },
            "content": {
                "en": "I use one list for my own shopping and another for gifts. It keeps everything clear.",
                "fr": "J'utilise une liste pour mon shopping et une autre pour les cadeaux. Tout est plus clair."
            },
            "postedAt": new Date("2025-07-15T12:05:00.000Z")
        }
    ],
    "testimonialsTexts": {
        "titlePart1": {
            "en": "Loved by families,",
            "fr": "Adopté par les familles,"
        },
        "titlePart2": {
            "en": "friends and organisers",
            "fr": "les amis et les organisateurs"
        }
    },
    "plans": null
}
