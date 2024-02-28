import { jwtVerify } from "jose";

export function getJwtSecretKey() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY; // Changed to a server-side environment variable
    
    if (!secret) {
        
        throw new Error("JWT Secret key is not found");
    }
    
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
  try {
      if (typeof token !== 'string') {
          throw new Error('Token must be a string');
      }
      

      const secretKey = getJwtSecretKey();
      

      const { payload } = await jwtVerify(token, secretKey);
      
      return payload;
  } catch (error) {
      console.error("Error verifying JWT token:", error);
      return null;
  }
}
