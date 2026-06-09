import PlayersCover from "../assets/images/players.png";
import TeamsCover from "../assets/images/clubs.png";
import GamesCover from "../assets/images/games2.png";
import CompCover from "../assets/images/competitions.png";

const home_cards_data = [
    {
        title: "Players",
        description: "Find information about your favorite players.",
        img: {src: PlayersCover, alt: "footballer"},
        link: {route: "/players", text: "View Players"}
    },
    {
        title: "Clubs",
        description: "Find information about your favorite clubs.",
        img: {src: TeamsCover, alt: "football_team"},
        link: {route: "/clubs", text: "View Clubs"}
    },
    {  
        title: "Games",
        description: "Find information about football games.",
        img: {src: GamesCover, alt: "two_footballers"},
        link: {route: "/games", text: "View Games"}
    },
    {  
        title: "Competitions",
        description: "Find information about football competitions.",
        img: {src: CompCover, alt: "football_cup"},
        link: {route: "/competitions", text: "View Competitions"}
    },
]

export default home_cards_data;