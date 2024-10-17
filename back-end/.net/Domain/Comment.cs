namespace Domain;

public class Comment : Entity
{
    public string Title { get; private set; }
    public string Body { get; private set; }
    
    public virtual Post Post { get; private set; }

    public Comment(string title, string body, string createdBy) : this(null, title, body, createdBy)
    {
    }
    public Comment( Post post, string title, string body, string createdBy) : base(Guid.NewGuid(), createdBy)
    {
        Post = post;
        Title = title;
        Body = body;
    }
}
