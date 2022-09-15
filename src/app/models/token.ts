export interface Tokens {
  Login: Login;
}

export interface Login {
  AccessToken:      string;
  ExpiresIn:        number;
  RefreshExpiresIn: number;
  RefreshToken:     string;
  TokenType:        string;
  NotBeforePolicy:  number;
  SessionState:     string;
  Scope:            string;
}
