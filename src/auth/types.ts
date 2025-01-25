export type JwtPayload = {
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
