/** Refuse to sign or verify sessions with missing/weak server configuration. */
export function sessionSigningKey(secret: string): Uint8Array {
  const key = new TextEncoder().encode(secret);
  if (key.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 bytes");
  }
  return key;
}
