import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth.services";

const PUBLIC_ONLY_ROUTES = ["/login", "/register" ];
const CUSTOMER_ROUTES    = ["/home",  "/cart", "/orders"];
const ADMIN_ROUTES       = ["/dashboard", "/users"];


export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // 1. Public-only routes — redirect logged-in users away
  if (PUBLIC_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
    const user = await getUser(req);


    if (user) {
      const redirectTo = user.role === "admin" ? "/dashboard" : "/home";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }

    return NextResponse.next();
  }

  // 2. Customer-only routes
  if (CUSTOMER_ROUTES.some((r) => pathname.startsWith(r))) {
    const user = await getUser(req);

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (user.role !== "customer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // 3. Admin-only routes
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    const user = await getUser(req);

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};


export const config = {
  matcher: [
    "/login",
    "/register",
    "/home/:path*",
    "/menu/:path*",
    "/cart/:path*",
    "/orders/:path*",
    "/dashboard/:path*",
    "/users/:path*",
  ],
};