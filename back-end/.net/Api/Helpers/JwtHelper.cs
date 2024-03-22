using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Models;
using Microsoft.IdentityModel.Tokens;

namespace Api.Helpers;

public static class JwtHelper
{
    public static IEnumerable<Claim> GetClaims(this ApplicationToken userAccount, Guid Id)
    {
        IEnumerable<Claim> claims = new Claim[] {
                new Claim("Id", userAccount.Id.ToString()),
                    new Claim(ClaimTypes.Name, userAccount.UserName),
                    new Claim(ClaimTypes.Email, userAccount.Email),
                    new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
                    new Claim(ClaimTypes.Expiration, DateTime.UtcNow.AddHours(1).ToString("MMM ddd dd yyyy HH:mm:ss tt"))
            };
        return claims;
    }
    public static IEnumerable<Claim> GetClaims(this ApplicationToken userAccount, out Guid Id)
    {
        Id = Guid.NewGuid();
        return GetClaims(userAccount, Id);
    }
    public static ApplicationToken GenerateToken(ApplicationToken model, JwtSettings jwtSettings)
    {
        try
        {
            var UserToken = new ApplicationToken();
            if (model == null) throw new ArgumentException(nameof(model));
            // Get secret key
            var key = Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey);
            Guid Id = Guid.Empty;
            DateTime expireTime = DateTime.UtcNow.AddHours(1);
            var JWToken = new JwtSecurityToken(
                issuer: jwtSettings.ValidIssuer, 
                audience: jwtSettings.ValidAudience, 
                claims: GetClaims(model, out Id), 
                notBefore: new DateTimeOffset(DateTime.Now).DateTime, 
                expires: new DateTimeOffset(expireTime).DateTime, 
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );
            UserToken.Token = new JwtSecurityTokenHandler().WriteToken(JWToken);
            UserToken.UserName = model.UserName;
            UserToken.Id = model.Id;
            UserToken.ExpiredDate = expireTime;
            
            return UserToken;
        }
        catch (Exception)
        {
            throw;
        }
    }
}

