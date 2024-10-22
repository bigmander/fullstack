namespace Api.Models;
public class AuthenticatedUserModel
{
    public string AccessToken { get; private set; }

    public AuthenticatedUserModel(string token)
    {
        AccessToken = token;
    }
}

