import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRt } from '~/auth/types';

export const GetCurrentUser = createParamDecorator(
  (_, ctx): JwtPayloadWithRt => {
    return (ctx as any).args[2].req.user;
  },
);
