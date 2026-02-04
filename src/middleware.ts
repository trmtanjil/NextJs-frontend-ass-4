import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ১. কুকি থেকে টোকেন চেক করো (তোমার টোকেনের নাম অনুযায়ী 'session-token' বদলে নাও)
  const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // ২. যদি ইউজার কার্ট বা চেকআউটে যেতে চায় এবং টোকেন না থাকে
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // লগইন করার পর যেন আবার কার্ট পেজে ফিরে আসতে পারে
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ৩. কোন কোন পেজ প্রটেক্ট করতে চাও তা এখানে লিখে দাও
export const config = {
  matcher: ['/cart'],
};