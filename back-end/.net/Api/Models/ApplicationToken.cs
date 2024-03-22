namespace Api.Models;

public class ApplicationToken
{
    public string Token
    {
        get;
        set;
    }
    public string UserName
    {
        get;
        set;
    }
    
    public Guid Id
    {
        get;
        set;
    }
    public string Email
    {
        get;
        set;
    }
  
    public DateTime ExpiredDate
    {
        get;
        set;
    }
}