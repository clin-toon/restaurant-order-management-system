import rateLimit from "express-rate-limit";

//  Login limiter
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});

// signup
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many accounts created. Try again later.",
});

// Order limiter
export const orderLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
});

//  General API limiter
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
