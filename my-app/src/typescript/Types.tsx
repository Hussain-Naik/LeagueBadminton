export type FixtureProps = {
    props: any;
    setGames?: () => void;
    games: number;
    leaderboard: any;
}

export type TableProps = {
  id: string;
  league?: string;
  seed?: number;
  session?: string;
  player: string;
  leaderboard: number;
}

export type LeaderboardType = {
  data?: TableProps[];
  name?: string;
}

export type CardListProp = {
    label: string;
    type: string;
    sessionCount?: number;
    playerCount?: number;
    progress?: number;
    max?: number;
    onClick?: () => void;
};

export type TeamType = {
    team1: {team: any[]},
    team2: {team: any[]},
}

export type MyButtonProps = {
    label?: string;
    icon?: string;
    onClick?: () => void;
}

export type WinProp = {
    result: number,
}

export type LeagueType = {
    id: string;
    name: string;
    count: number;
};

export type CreateProps = {
    visible: boolean;
    setVisible: () => void;
}

export type SessionsType = {
    id: string;
    league: string;
    count: number;
    date: string;
    game_type: string;
    player_count: number;
    player_type: string;
    progress: number;
};

export interface MatchType {
    id: string;
    name: number;
    player: string;
    session: string;
    team: number;
    win: number;
}

export type FixtureType = {
    fixture_api: string;
    game_index: number;
    game_type: string;
    id: string;
    player_count: number;
    player_type: string;
    team1_player1_index: number;
    team1_player2_index: number;
    team2_player1_index: number;
    team2_player2_index: number;
}