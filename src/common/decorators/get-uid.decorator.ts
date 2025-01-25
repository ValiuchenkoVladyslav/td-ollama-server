import { createParamDecorator } from '@nestjs/common';

export const GetUid = createParamDecorator((_, ctx): number => {
  return (ctx as any).args[2].req.user.sub;
});
