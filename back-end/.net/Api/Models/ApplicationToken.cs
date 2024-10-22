namespace Api.Models;

public class ApplicationToken
{
    public string Token
    {
        get;
        private set;
    }
    public string UserName
    {
        get;
        private set;
    }

    public Guid Id
    {
        get;
        private set;
    }
    public string Email
    {
        get;
        private set;
    }

    public DateTime ExpiredDate
    {
        get;
        private set;
    }

    public ApplicationToken(
        Guid id,
        string userName,
        string email,
        string token,
        DateTime expiredDate
    )
    {
        Id = id;
        UserName = userName;
        Email = email;
        Token = token;
        ExpiredDate = expiredDate;
    }

    public ApplicationToken(
        Guid id,
        string userName,
        string email
    ) : this(id, userName, email, string.Empty, DateTime.Now)
    {

    }
}