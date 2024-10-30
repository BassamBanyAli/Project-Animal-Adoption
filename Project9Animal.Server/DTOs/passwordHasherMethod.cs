using System.Security.Cryptography;
using System.Text;

namespace Project9Animal.Server.DTOs
{
    public class passwordHasherMethod
    {
        // Method to create password hash and salt
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key; // Create the salt
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // Hash the password
            }
        }

        // Method to verify the password with hash and salt
        public static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new HMACSHA512(storedSalt)) // Use stored salt for hashing
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // Hash the provided password
                return computedHash.SequenceEqual(storedHash); // Compare the computed hash with the stored hash
            }
        }
    }
}
