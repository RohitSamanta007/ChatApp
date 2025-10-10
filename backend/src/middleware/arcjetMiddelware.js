import aj from "../lib/arcject.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetPortection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ success: false, message: "Bot accessed denied" });
      } else {
        return res
          .status(403)
          .json({
            success: false,
            message: "Access denied by security policy",
          });
      }
    }

    // checked for spoofed bot
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        success: false,
        error: "Spoofed bot detected",
        message: "Malicious bot acivity detected",
      });
    }

    next();
  } catch (error) {
    console.log("Arcject Protection error : ", error);
    next();
  }
};
