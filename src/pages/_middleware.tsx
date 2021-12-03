import { NextRequest, NextResponse } from 'next/server';

const allowedParams = ['authorId', 'postId'];

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl;
  let changed = false;

  url.searchParams.forEach((_, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  });

  if (changed) {
    return NextResponse.redirect(url);
  }
};
